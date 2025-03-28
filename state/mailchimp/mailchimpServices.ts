import axios from "axios";

interface RequestBody {
    email: string;
    tag?: string;
}

export const onAddEmailToMailchimp = async (email: string, tag?: string) => {
    const requestBody: RequestBody = {
        email,
    };

    if (tag) {
        requestBody['tag'] = tag;
    }

    const response = await fetch('/api/mailchimpSubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
    });

    return await response.json();
};


export const saveAbandonedCartCheckout = async (email: string) => {
    const requestConfig = {
        withCredentials: true,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_ENDPOINT_URL_BASE}/mailchimp/save_abandoned_cart_checkout.php`,
        {email},
        requestConfig
      );
      return await response.data;
};

export const getAbandonedCartCheckout = async (mc_cart_hash: string) => {
    const requestConfig = {
        withCredentials: true,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_ENDPOINT_URL_BASE}/mailchimp/get_abandoned_cart_checkout.php`,
        {mc_cart_hash},
        requestConfig
      );
      return await response.data;
};


export const getKlaviyoSuscribers = async (email: string, listId: string) => {
    const response = await fetch('/api/klaviyo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        listId: listId
      })
    });
    
    const data = await response.json();
    return data;
};
