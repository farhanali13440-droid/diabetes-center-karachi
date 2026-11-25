type ConversionKind = "appointment" | "call" | "whatsapp" | "package";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const conversionId = import.meta.env.VITE_GOOGLE_ADS_CONVERSION_ID?.trim();

const conversionLabels: Record<ConversionKind, string | undefined> = {
  appointment: import.meta.env.VITE_GOOGLE_ADS_LABEL_APPOINTMENT?.trim(),
  call: import.meta.env.VITE_GOOGLE_ADS_LABEL_CALL?.trim(),
  whatsapp: import.meta.env.VITE_GOOGLE_ADS_LABEL_WHATSAPP?.trim(),
  package: import.meta.env.VITE_GOOGLE_ADS_LABEL_PACKAGE?.trim(),
};

export function initializeGoogleAds() {
  if (!conversionId || typeof window === "undefined" || window.gtag) return;
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = (...args: unknown[]) => { window.dataLayer?.push(args); };
  window.gtag("js", new Date());
  window.gtag("config", conversionId);
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(conversionId)}`;
  document.head.appendChild(script);
}

export function trackAdsConversion(kind: ConversionKind) {
  const label = conversionLabels[kind];
  if (!conversionId || !label || typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "conversion", { send_to: `${conversionId}/${label}` });
}
