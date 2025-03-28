import { useEffect, useState, useRef} from "react";
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
import SkeletonLoader from "@/components/Atoms/SkeletonLoader/SkeletonLoader";
import { getChatNavigation } from "@/state/user/userSelector"
import { onGetChatAbandoned, onGetChatLoadedSucceeded, onGetChatLoadedFailed } from "@/state/user/userActions"

const Oli = ({isDesktop}) => {
  const router = useRouter();
  const dispatch = useDispatch()
  const [chatMobileLoaded, setChatMobileLoaded] = useState(false)
  const [chatDesktopLoaded, setChatDesktopLoaded] = useState(false)
  const hasBeenDesktopMounted = useRef(false);
  const hasBeenMobileMounted = useRef(false);
  const chatNavigation = useSelector(getChatNavigation);

  useEffect(() => {
    if (chatDesktopLoaded && isDesktop) {
      setTimeout(() => {
        if (!hasBeenDesktopMounted.current) {
          embedchatDesktop.mountEmbeddedChat()
          hasBeenDesktopMounted.current = true;
          dispatch(onGetChatAbandoned())
          dispatch(onGetChatLoadedSucceeded())
        }
      }, 1000)
    }

    if (chatMobileLoaded && !isDesktop) {
      setTimeout(() => {
        if (!hasBeenMobileMounted.current) {
          embedchatMobile.mountEmbeddedChat()
          hasBeenMobileMounted.current = true;
          dispatch(onGetChatAbandoned())
          dispatch(onGetChatLoadedSucceeded())
        }
      }, 1000)
    }
  }, [chatMobileLoaded, chatDesktopLoaded])

  useEffect(() => {
    const handleRouteChange = () => {
      embedchatDesktop.unmountEmbeddedChat()
      embedchatMobile.unmountEmbeddedChat()
      dispatch(onGetChatLoadedFailed())
    };

    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router]);

  useEffect(() => {
    if (chatNavigation) {
      setTimeout(() => {
        if (!hasBeenDesktopMounted.current && isDesktop) {
          embedchatDesktop.mountEmbeddedChat()
          hasBeenDesktopMounted.current = true;
          setTimeout(() => {
            dispatch(onGetChatLoadedSucceeded())
          }, 300)
        }
        if (!hasBeenMobileMounted.current && !isDesktop) {
          embedchatMobile.mountEmbeddedChat()
          hasBeenMobileMounted.current = true;
          setTimeout(() => {
            dispatch(onGetChatLoadedSucceeded())
          }, 300)
        }
      }, 1000) 
    }
  }, [isDesktop, chatNavigation]);
  
  return (
    <div>
      <Script
      src={`https://beta.notchatbot.com/api/embedchat?apikey=01936928-8413-7603-938c-7abdcf03b7b1&target=embedchatDesktop`}
      strategy="lazyOnload"
      onLoad={() => setChatDesktopLoaded(true)}
      onError={() => console.error("Failed to load script")}
      type="module"
      />
      <Script
      src={`https://beta.notchatbot.com/api/embedchat?apikey=01936928-8413-7603-938c-7abdcf03b7b1&target=embedchatMobile`}
      strategy="lazyOnload"
      onLoad={() => setChatMobileLoaded(true)}
      onError={() => console.error("Failed to load script")}
      type="module"
      />
    </div>
  );
};

export default Oli;