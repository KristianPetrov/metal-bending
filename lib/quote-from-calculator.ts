export type CalculatorQuoteDraft = {
  radius: string;
  notes: string;
};

export const CALCULATOR_QUOTE_EVENT = "mbc:calculator-quote";
const STORAGE_KEY = "mbc-calculator-quote-draft";

function isDraft(value: unknown): value is CalculatorQuoteDraft {
  if (!value || typeof value !== "object") return false;
  const draft = value as CalculatorQuoteDraft;
  return typeof draft.radius === "string" && typeof draft.notes === "string";
}

export function publishCalculatorQuote(draft: CalculatorQuoteDraft) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  } catch {
    // Ignore quota or private-mode failures; the live event still delivers the draft.
  }

  window.dispatchEvent(new CustomEvent<CalculatorQuoteDraft>(CALCULATOR_QUOTE_EVENT, { detail: draft }));
}

export function readCalculatorQuote(): CalculatorQuoteDraft | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    return isDraft(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function clearCalculatorQuote() {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage failures.
  }
}
