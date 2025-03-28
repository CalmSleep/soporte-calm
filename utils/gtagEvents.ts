export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

declare global {
  interface Window {
    gtag: any;
  }
}

export const pageview = (url: string) => {
  if(typeof window !== "undefined" && window.gtag && typeof window.gtag === "function") {
    window.gtag("config", GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

export const event = (action: string, values: object) => {
  if(typeof window !== "undefined" && window.gtag && typeof window.gtag === "function") {
    window.gtag("event", action, values);
  }
    
};