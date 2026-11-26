type ConversionKind = "appointment" | "call" | "whatsapp" | "package";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const conversionId = import.meta.env["VITE_GOOGLE_ADS_CONVERSION_ID"]?.trim();

const conversionLabels: Record<ConversionKind, string | undefined> = {
  appointment: import.meta.env["VITE_GOOGLE_ADS_LABEL_APPOINTMENT"]?.trim(),
  call: import.meta.env["VITE_GOOGLE_ADS_LABEL_CALL"]?.trim(),
  whatsapp: import.meta.env["VITE_GOOGLE_ADS_LABEL_WHATSAPP"]?.trim(),
  package: import.meta.env["VITE_GOOGLE_ADS_LABEL_PACKAGE"]?.trim(),
};

export function initializeGoogleAds() {
  if (!conversionId || typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = window.gtag ?? ((...args: unknown[]) => { window.dataLayer?.push(args); });
  window.gtag("config", conversionId);
}

export function trackAdsConversion(kind: ConversionKind) {
  const label = conversionLabels[kind];
  if (!conversionId || !label || typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "conversion", { send_to: `${conversionId}/${label}` });
}
