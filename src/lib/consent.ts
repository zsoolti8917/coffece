"use client";

export type Consent = "accepted" | "declined" | null;

const STORAGE_KEY = "cookie-consent";
const EVENT_NAME = "cookie-consent-change";

export function getConsent(): Consent {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(STORAGE_KEY);
  return v === "accepted" || v === "declined" ? v : null;
}

export function setConsent(value: "accepted" | "declined") {
  window.localStorage.setItem(STORAGE_KEY, value);
  window.dispatchEvent(new CustomEvent<Consent>(EVENT_NAME, { detail: value }));
}

export function clearConsent() {
  window.localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent<Consent>(EVENT_NAME, { detail: null }));
}

export function subscribeConsent(listener: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(EVENT_NAME, listener);
  return () => window.removeEventListener(EVENT_NAME, listener);
}
