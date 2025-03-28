import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ChatImage } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import { onRedirectLoadingFinished, onRedirectLoadingStart } from "@/state/loading/loadingActions";
import { onOpenChat } from "@/state/cart/cartActions";
import { IStore } from "@/state/types";
import { getATCVisible, getMobileMenu, getOpenSideCart, getShowFixedCart } from "@/state/cart/cartSelector";
import { getOpenCheckoutChat } from "@/state/user/userSelector";
import Spinner from "@/components/Atoms/Spinner/Spinner";
const NotChatBot = dynamic(() => import('@/components/Molecules/Chat/NotChatBot/NotChatBot'), { ssr: false });

const chatIcon = () => {
  return (
      <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="32" 
      height="32" 
      viewBox="0 0 24 24" 
      fill="none" 
       stroke="white"
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className="lucide-icon lucide lucide-message-circle-more h-8 w-8 text-secondary"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
      <path d="M8 12h.01" />
      <path d="M12 12h.01" />
      <path d="M16 12h.01" />
    </svg>
  )
}

const ChatLoader = () => {
    const router = useRouter();
    const showFixedCart = useSelector(getShowFixedCart)
    const ATCVisible = useSelector(getATCVisible)
    const sideCartOpened = useSelector((state: IStore) => getOpenSideCart(state))
    const isMobileMenuOpen = useSelector(getMobileMenu);
    const [activateChat, setActivateChat] = useState(false);
    const [delayRenderChat, setDelayRenderChat] = useState(false);
    const [showReplicate, setShowReplicate] = useState(true);
    const [loading, setLoading] = useState(false);
    const [isProduct, setIsProduct] = useState<boolean>(false)
    const openCheckoutChat = useSelector(getOpenCheckoutChat)

    useEffect(() => {
        setTimeout(() => {
          if(!activateChat) {
            setDelayRenderChat(true)
            setTimeout(() => {
              setShowReplicate(false)
            }, 2500)
          }
        }, 10000)
      }, [])
    
    const handleOnClick = () => {
        setActivateChat(true);
        setLoading(true);

        setTimeout(() => {
            setLoading(false)
            setShowReplicate(false)
        }, 2500)
    }

    useEffect(() => {
      if (router.asPath.includes("producto")) {
        setIsProduct (true)
      } else {
        setIsProduct (false)
      }
    }, [router.asPath])

    return (
      <>
        { router && 
        !router.asPath.includes("mantenimiento") && 
        !router.asPath.includes("puntolocalm") && 
        (
          <>
            {
              (activateChat || delayRenderChat) && <NotChatBot activateChat={activateChat}/>
            }
            {
              showReplicate &&   
              <ChatImage 
              onClick={handleOnClick}
              $isMenuOpen={sideCartOpened || isMobileMenuOpen}
              $toBottom={!showFixedCart && !ATCVisible}
              $isProduct={isProduct}
              $isCheckout={router.asPath.includes("checkout-pago")}
              $openCheckoutChat={openCheckoutChat}
              >
                {loading ? <Spinner /> : chatIcon()}
              </ChatImage>
            }
          </>
          )
        }
      </>
    );
};

export default ChatLoader;