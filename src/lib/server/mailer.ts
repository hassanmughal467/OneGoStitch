/**
 * Transactional email providers.
 *
 *   EMAIL_PROVIDER=smtp    Nodemailer SMTP (Gmail / Google Workspace app password, or any SMTP)
 *   EMAIL_PROVIDER=resend  HTTPS API; needs RESEND_API_KEY, RESEND_FROM_EMAIL, QUOTE_INBOX_EMAIL
 *   EMAIL_PROVIDER=log     development only: prints the message to the server console
 *
 * If EMAIL_PROVIDER is unset:
 *   - SMTP credentials present → smtp
 *   - else Resend variables present → resend
 *
 * SMTP credentials (any of):
 *   SMTP_USER + SMTP_PASS, or EMAIL_USER + EMAIL_APP_PASSWORD
 * Optional: SMTP_HOST (default smtp.gmail.com), SMTP_PORT (default 465),
 * SMTP_SECURE, SMTP_FROM, QUOTE_INBOX_EMAIL (defaults to the SMTP user).
 *
 * Artwork is never required as an attachment; staff usually receive expiring links instead.
 */
import nodemailer, { type Transporter } from "nodemailer";

export type MailAttachment = { filename: string; content: Uint8Array; contentType: string };
export type MailMessage = { to: string; subject: string; text: string; replyTo?: string; attachments?: MailAttachment[] };

export interface Mailer {
  readonly name: string;
  /** Status recorded on the quote: "sent" for real delivery, "logged" for the development sink. */
  readonly resultStatus: "sent" | "logged";
  send(message: MailMessage): Promise<void>;
}

export type MailConfig = { mailer: Mailer; from: string; inbox: string };

export type SmtpTransportOptions = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
};

export function resendMailer(key: string, from: string, fetchImpl: typeof fetch = fetch): Mailer {
  return {
    name: "resend",
    resultStatus: "sent",
    async send(message) {
      const response = await fetchImpl("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from,
          to: [message.to],
          subject: message.subject,
          text: message.text,
          ...(message.replyTo ? { reply_to: message.replyTo } : {}),
          ...(message.attachments?.length
            ? {
                attachments: message.attachments.map((file) => ({
                  filename: file.filename,
                  content: Buffer.from(file.content).toString("base64"),
                  content_type: file.contentType,
                })),
              }
            : {}),
        }),
      });
      if (!response.ok) throw new Error(`Resend responded ${response.status}`);
    },
  };
}

export function logMailer(): Mailer {
  return {
    name: "log",
    resultStatus: "logged",
    async send(message) {
      const files = message.attachments?.map((file) => file.filename).join(", ");
      console.info(`\n[mail:log] To: ${message.to}\n[mail:log] Subject: ${message.subject}${files ? `\n[mail:log] Attachments: ${files}` : ""}\n${message.text}\n`);
    },
  };
}

/** Builds a Nodemailer transport. Injected in tests; created lazily in production. */
export type CreateSmtpTransport = (options: SmtpTransportOptions) => Transporter;

function defaultCreateSmtpTransport(options: SmtpTransportOptions): Transporter {
  return nodemailer.createTransport({
    host: options.host,
    port: options.port,
    secure: options.secure,
    auth: { user: options.user, pass: options.pass },
  });
}

export function smtpMailer(
  options: SmtpTransportOptions,
  from: string,
  createTransport: CreateSmtpTransport = defaultCreateSmtpTransport,
): Mailer {
  let transport: Transporter | null = null;
  const getTransport = () => (transport ??= createTransport(options));
  return {
    name: "smtp",
    resultStatus: "sent",
    async send(message) {
      const info = await getTransport().sendMail({
        from,
        to: message.to,
        subject: message.subject,
        text: message.text,
        ...(message.replyTo ? { replyTo: message.replyTo } : {}),
        ...(message.attachments?.length
          ? {
              attachments: message.attachments.map((file) => ({
                filename: file.filename,
                content: Buffer.from(file.content),
                contentType: file.contentType,
              })),
            }
          : {}),
      });
      if (info.rejected?.length) {
        throw new Error(`SMTP rejected: ${info.rejected.join(", ")}`);
      }
    },
  };
}

/** Gmail / Google Workspace defaults when only EMAIL_USER + EMAIL_APP_PASSWORD are set. */
export function resolveSmtpOptions(env: NodeJS.ProcessEnv): (SmtpTransportOptions & { from: string; inbox: string }) | null {
  const user = env.SMTP_USER?.trim() || env.EMAIL_USER?.trim();
  const pass = env.SMTP_PASS?.trim() || env.EMAIL_APP_PASSWORD?.trim();
  const inbox = env.QUOTE_INBOX_EMAIL?.trim() || user;
  if (!user || !pass || !inbox) return null;

  const host = env.SMTP_HOST?.trim() || "smtp.gmail.com";
  const portRaw = env.SMTP_PORT?.trim();
  const port = portRaw ? Number(portRaw) : 465;
  if (!Number.isFinite(port) || port <= 0) return null;

  const secureEnv = env.SMTP_SECURE?.trim().toLowerCase();
  const secure =
    secureEnv === "true" || secureEnv === "1"
      ? true
      : secureEnv === "false" || secureEnv === "0"
        ? false
        : port === 465;

  const from = env.SMTP_FROM?.trim() || env.RESEND_FROM_EMAIL?.trim() || user;
  return { host, port, secure, user, pass, from, inbox };
}

export function hasSmtpMailer(env: NodeJS.ProcessEnv = process.env) {
  return resolveSmtpOptions(env) !== null;
}

export function resolveMailer(env: NodeJS.ProcessEnv = process.env, createSmtpTransport?: CreateSmtpTransport): MailConfig | null {
  const provider = env.EMAIL_PROVIDER?.trim().toLowerCase();
  const key = env.RESEND_API_KEY?.trim();
  const resendFrom = env.RESEND_FROM_EMAIL?.trim();
  const resendInbox = env.QUOTE_INBOX_EMAIL?.trim();
  const smtp = resolveSmtpOptions(env);

  if (provider === "log") {
    if (env.NODE_ENV === "production") return null;
    return { mailer: logMailer(), from: resendFrom || smtp?.from || "dev@localhost", inbox: resendInbox || smtp?.inbox || "staff@localhost" };
  }

  if (provider === "smtp") {
    if (!smtp) return null;
    return {
      mailer: smtpMailer({ host: smtp.host, port: smtp.port, secure: smtp.secure, user: smtp.user, pass: smtp.pass }, smtp.from, createSmtpTransport),
      from: smtp.from,
      inbox: smtp.inbox,
    };
  }

  if (provider === "resend") {
    if (!key || !resendFrom || !resendInbox) return null;
    return { mailer: resendMailer(key, resendFrom), from: resendFrom, inbox: resendInbox };
  }

  // Unset provider: prefer SMTP (no paid API), then Resend.
  if (smtp) {
    return {
      mailer: smtpMailer({ host: smtp.host, port: smtp.port, secure: smtp.secure, user: smtp.user, pass: smtp.pass }, smtp.from, createSmtpTransport),
      from: smtp.from,
      inbox: smtp.inbox,
    };
  }
  if (key && resendFrom && resendInbox) {
    return { mailer: resendMailer(key, resendFrom), from: resendFrom, inbox: resendInbox };
  }
  return null;
}
