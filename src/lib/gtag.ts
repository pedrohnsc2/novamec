export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

type GtagEvent = {
  action: string;
  category: string;
  label?: string;
  value?: number;
};

export function trackEvent({ action, category, label, value }: GtagEvent) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
}

export function trackWhatsAppClick(location: string) {
  trackEvent({
    action: "whatsapp_click",
    category: "engagement",
    label: location,
  });
}

export function trackPhoneClick(location: string) {
  trackEvent({
    action: "phone_click",
    category: "engagement",
    label: location,
  });
}

export function trackFormSubmit() {
  trackEvent({
    action: "generate_lead",
    category: "conversion",
    label: "contact_form",
    value: 1,
  });
}
