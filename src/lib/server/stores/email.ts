import { MemoryQuoteStore } from "@/lib/server/stores/memory";

/**
 * Inbox-backed store for serverless hosts that have Resend but no object store.
 *
 * Records live in memory only for idempotency inside one function instance.
 * Durability comes from the staff notification email (record + artwork attached),
 * which `processQuoteIntake` treats as the save when this store is selected.
 */
export class EmailQuoteStore extends MemoryQuoteStore {
  override readonly name = "email";
}

export function hasResendMailer(env: NodeJS.ProcessEnv) {
  const provider = env.EMAIL_PROVIDER?.trim().toLowerCase();
  if (provider === "log") return false;
  return Boolean(env.RESEND_API_KEY?.trim() && env.RESEND_FROM_EMAIL?.trim() && env.QUOTE_INBOX_EMAIL?.trim());
}
