export const sendPageview = (url) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'pageview',
        page: {
          url,
          title: document.title,
        },
      });
    }
  };
  
  export const sendEvent = (eventName, eventData, email) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: eventName,
        ecommerce: {
          ...eventData
        },
        ...(email ? { user: { email } } : null),
      });
    }
  };
  