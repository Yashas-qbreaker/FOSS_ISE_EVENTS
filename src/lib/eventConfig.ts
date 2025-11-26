export interface EventConfig {
  eventName: string;
  eventDate: string;
  webAppUrl: string;
  apiKey: string;
  upiId: string;
  payeeName: string;
  regFeeInr: number;
  eventSlug: string;
}

export const PIXEL2PORTAL_CONFIG: EventConfig = {
  eventName: "Pixel2Portal",
  eventDate: "Dec 5, 2025 • PESCE Mandya",
  webAppUrl: "https://script.google.com/macros/s/AKfycbxWOxzdjBMMudvbK3knIeilbEGZ1mdCb0oaAIbskboZ_4l8FQhVgq8-hYN4iEjcSdaXig/exec",
  apiKey: "CHANGE_ME_TO_A_SECRET",
  upiId: "yashas.a.5960@ybl",
  payeeName: "Yashas Gowda A",
  regFeeInr: 100,
  eventSlug: "pixel2portal",
};

export const BLIND_CODE_GOLF_CONFIG: EventConfig = {
  eventName: "Blind Code Golf",
  eventDate: "Dec 5, 2025 • PESCE Mandya",
  webAppUrl: "https://script.google.com/macros/s/AKfycbxWOxzdjBMMudvbK3knIeilbEGZ1mdCb0oaAIbskboZ_4l8FQhVgq8-hYN4iEjcSdaXig/exec",
  apiKey: "CHANGE_ME_TO_A_SECRET",
  upiId: "yashas.a.5960@ybl",
  payeeName: "Yashas Gowda A",
  regFeeInr: 100,
  eventSlug: "blind-code-golf",
};
