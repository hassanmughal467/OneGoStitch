import { describe, expect, it, vi } from "vitest";
import { resolveMailer, resolveSmtpOptions, smtpMailer, type SmtpTransportOptions } from "@/lib/server/mailer";

const env = (values: Record<string, string>): NodeJS.ProcessEnv => ({ NODE_ENV: "test", ...values });

describe("resolveSmtpOptions", () => {
  it("resolves Gmail defaults from EMAIL_USER and EMAIL_APP_PASSWORD", () => {
    const opts = resolveSmtpOptions(env({ EMAIL_USER: "info@onegostitch.com", EMAIL_APP_PASSWORD: "app-pass" }));
    expect(opts).toMatchObject({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      user: "info@onegostitch.com",
      pass: "app-pass",
      from: "info@onegostitch.com",
      inbox: "info@onegostitch.com",
    });
  });

  it("prefers explicit SMTP_* and QUOTE_INBOX_EMAIL", () => {
    const opts = resolveSmtpOptions(
      env({
        EMAIL_USER: "ignored@example.com",
        EMAIL_APP_PASSWORD: "ignored",
        SMTP_USER: "smtp@example.com",
        SMTP_PASS: "secret",
        SMTP_HOST: "mail.example.com",
        SMTP_PORT: "587",
        SMTP_SECURE: "false",
        SMTP_FROM: "quotes@example.com",
        QUOTE_INBOX_EMAIL: "inbox@example.com",
      }),
    );
    expect(opts).toMatchObject({
      host: "mail.example.com",
      port: 587,
      secure: false,
      user: "smtp@example.com",
      pass: "secret",
      from: "quotes@example.com",
      inbox: "inbox@example.com",
    });
  });

  it("returns null when credentials are incomplete", () => {
    expect(resolveSmtpOptions(env({ EMAIL_USER: "a@b.c" }))).toBeNull();
    expect(resolveSmtpOptions(env({ EMAIL_APP_PASSWORD: "x" }))).toBeNull();
  });
});

describe("resolveMailer", () => {
  it("selects smtp when EMAIL_PROVIDER=smtp", () => {
    const config = resolveMailer(
      env({
        EMAIL_PROVIDER: "smtp",
        EMAIL_USER: "info@onegostitch.com",
        EMAIL_APP_PASSWORD: "app-pass",
        QUOTE_INBOX_EMAIL: "info@onegostitch.com",
      }),
    );
    expect(config?.mailer.name).toBe("smtp");
    expect(config?.inbox).toBe("info@onegostitch.com");
    expect(config?.from).toBe("info@onegostitch.com");
  });

  it("auto-selects smtp when provider unset and SMTP credentials exist", () => {
    const config = resolveMailer(env({ EMAIL_USER: "info@onegostitch.com", EMAIL_APP_PASSWORD: "app-pass" }));
    expect(config?.mailer.name).toBe("smtp");
  });

  it("prefers smtp over resend when provider is unset", () => {
    const config = resolveMailer(
      env({
        EMAIL_USER: "info@onegostitch.com",
        EMAIL_APP_PASSWORD: "app-pass",
        RESEND_API_KEY: "re_test",
        RESEND_FROM_EMAIL: "from@example.com",
        QUOTE_INBOX_EMAIL: "inbox@example.com",
      }),
    );
    expect(config?.mailer.name).toBe("smtp");
  });

  it("uses resend when explicitly requested", () => {
    const config = resolveMailer(
      env({
        EMAIL_PROVIDER: "resend",
        RESEND_API_KEY: "re_test",
        RESEND_FROM_EMAIL: "from@example.com",
        QUOTE_INBOX_EMAIL: "inbox@example.com",
        EMAIL_USER: "info@onegostitch.com",
        EMAIL_APP_PASSWORD: "app-pass",
      }),
    );
    expect(config?.mailer.name).toBe("resend");
  });

  it("returns null for smtp provider without credentials", () => {
    expect(resolveMailer(env({ EMAIL_PROVIDER: "smtp" }))).toBeNull();
  });
});

describe("smtpMailer", () => {
  it("sends via the injected transport and rejects on rejected recipients", async () => {
    const sendMail = vi.fn().mockResolvedValue({ rejected: [] });
    const create = vi.fn((_opts: SmtpTransportOptions) => ({ sendMail }));
    const mailer = smtpMailer(
      { host: "smtp.gmail.com", port: 465, secure: true, user: "info@onegostitch.com", pass: "x" },
      "info@onegostitch.com",
      create as never,
    );

    await mailer.send({
      to: "staff@onegostitch.com",
      subject: "Quote",
      text: "body",
      replyTo: "buyer@example.com",
      attachments: [{ filename: "a.png", content: new Uint8Array([1, 2]), contentType: "image/png" }],
    });

    expect(create).toHaveBeenCalledOnce();
    expect(sendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        from: "info@onegostitch.com",
        to: "staff@onegostitch.com",
        replyTo: "buyer@example.com",
        attachments: [expect.objectContaining({ filename: "a.png" })],
      }),
    );

    sendMail.mockResolvedValueOnce({ rejected: ["bad@example.com"] });
    await expect(mailer.send({ to: "bad@example.com", subject: "x", text: "y" })).rejects.toThrow(/rejected/i);
  });
});
