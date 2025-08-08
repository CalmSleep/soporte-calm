import { useEffect, useState, } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getShowFixedCart, getATCVisible, getOpenChat } from "@/state/cart/cartSelector"
import { IStore } from '@/state/types'
import { getOpenSideCart } from "@/state/cart/cartSelector";
import { getMobileMenu } from "@/state/cart/cartSelector"
import { useRouter } from "next/router";
import { getOverlay } from "@/state/products/productsSelector";
import { getOpenCheckoutChat } from "@/state/user/userSelector";
import Script from 'next/script';
import { onCloseCart, onCloseChat, onOpenChat, onShowCart } from "@/state/cart/cartActions";
import { useWidth } from "@/hooks/useWidth";

const NotChatBot = ({activateChat}: {activateChat: boolean}) => {
  const dispatch = useDispatch()
  const router = useRouter();
  const width = useWidth();
  const breakpoint = 1024
  const showFixedCart = useSelector(getShowFixedCart)
  const ATCVisible = useSelector(getATCVisible)
  const openCheckoutChat = useSelector(getOpenCheckoutChat)
  const [chatLoaded, setChatLoaded] = useState(false)
  const [render, setRender] = useState(false)
  const sideCartOpened = useSelector((state: IStore) => getOpenSideCart(state))
  const isMobileMenuOpen = useSelector(getMobileMenu);
  const [isProduct, setIsProduct] = useState<boolean>(false)

  useEffect(() => {
    setTimeout(() => {
      setRender(true)
    }, 1500)
  },[]);

  function openChat() {
    var customEvent = new CustomEvent('openWebChatbot');
    window.dispatchEvent(customEvent);
  }

  useEffect(() => {
    if (activateChat && chatLoaded) {
      setTimeout(() => {
        openChat()
      }, 500)
    }
  },[chatLoaded, activateChat]);

  const scriptLoaded = () => {
    setChatLoaded(true)
   /*  const chatBot = document.getElementById("chatbot-iframe1");
    if (chatBot && isProduct) {
      chatBot.style.display = 'block';
      setTimeout(() => {
        sendMessageToIframe("130px")
      }, 100)
    } */
  }

  function sendMessageToIframe(space: string) {
    var eventData = {
        y: `${space}`
    };
    var customEvent = new CustomEvent('addCustomPadding', { detail: eventData });
    window.dispatchEvent(customEvent);
  }

  useEffect(() => {
    const handleMessageEvent = (event: MessageEvent) => {
      const { action, message } = event.data;

      switch (action) {
        case 'expand':
          dispatch(onOpenChat())
          break;
        case 'minimize':
          dispatch(onCloseChat())
          break;
      }
    };

    window.addEventListener('message', handleMessageEvent);

    return () => {
      window.removeEventListener('message', handleMessageEvent);
    };
  }, []); 
  
  useEffect(() => {
    if (router.asPath.includes("producto")) {
      setIsProduct (true)
    } else {
      setIsProduct (false)
    }
    
    if(chatLoaded) {
      const chatBot = document.getElementById("chatbot-iframe1");
      if (chatBot && width <= breakpoint) {
        if (router.asPath.includes("checkout-pago")) {
          if (!openCheckoutChat) {
            chatBot.style.display = 'none';
          } else {
            chatBot.style.bottom = '0';
            chatBot.style.transition = 'bottom 0.4s ease';
            chatBot.style.display = 'block';
          }
        } else {
          if (sideCartOpened || isMobileMenuOpen) {
            chatBot.style.display = 'none';
          } else if (!showFixedCart && !ATCVisible) {
            chatBot.style.bottom = '0';
            chatBot.style.transition = 'bottom 0.4s ease';
            chatBot.style.display = 'block';
          } else if (isProduct) {
            sendMessageToIframe("155px")
            chatBot.style.display = 'block';
          } else {
            chatBot.style.bottom = '0';
            chatBot.style.transition = 'bottom 0.4s ease';
            chatBot.style.display = 'block';
          }
        }
      } else if (width >= breakpoint) {
        sendMessageToIframe("5px")
      }
    }
  },[showFixedCart, chatLoaded, sideCartOpened, openCheckoutChat, router]);

  if (!render) return null

  return (
    <div>
      {
        render &&
        <Script
          src="https://app.notchatbot.com/iframeBody.js?apikey=78457365-24c0-4fc5-8d83-3324d6aa8ef5&showPopupMobile=false"
          strategy="lazyOnload"
          onLoad={() => scriptLoaded()}
          onError={() => console.error("Failed to load script")}
        />
      }
    </div>
  );
};
export default NotChatBot;