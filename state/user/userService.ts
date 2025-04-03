/* import { IPropsToSend } from '@/components/Organisms/B2bForm/types'; */
import axios from 'axios';
import { IKlaviyoEventBodyParams } from './types';

export const getUserIsLogged = async () => {
  const requestConfig = {
    withCredentials: true,
    headers: {
      "Content-Type": "json/application",
    },
  };
  const response = await axios.get(`${process.env.NEXT_PUBLIC_ENDPOINT_URL_BASE}/user/logged_user.php`, requestConfig);
  return await response.data;
}

export const getDataToNotion = async (data: any) => {
  const requestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.post(
      `/api/notion`,
      {
        message: JSON.stringify(data)
      },
      requestConfig
    );
    return response.data;
  } catch (error) {
    console.error("Error al enviar datos a Notion:", error);
    throw error;
  }
};

export const getB2bDataToSlack = async (data: /* IPropsToSend */any) => {
  const requestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.post(
      `/api/slackMessagge`,
      {
        message: JSON.stringify(data),
      },
      requestConfig
    );
    return response.data;
  } catch (error) {
    console.error("Error al enviar mensaje a Slack:", error);
    throw error;
  }
};

export const createClientEvent = async (data: IKlaviyoEventBodyParams) => {
  const requestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.post(
      `/api/createKlaviyoClientEvent`,
      {data},
      requestConfig
    );
    return response.data;
  } catch (error) {
  }
}

export const sendSlackMessage = async (
  channel: string,
  username: string,
  icon_emoji: string,
  text: string,
  buttons?:{
    text: string,
    url: string
  }[]
) => {
  const response = fetch(
    `/api/sendSlackMessage`,
    { 
      cache: "no-store",
      method: "POST",
      body: JSON.stringify({
        channel,
        username,
        icon_emoji,
        text,
        buttons
      })
    }
  );

  return (await response).json();
}