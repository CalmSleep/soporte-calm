/* import { getOpenSideCart } from "@/state/cart/cartSelector";
import { IStore } from "@/state/types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getShowFixedCart, getATCVisible } from "@/state/cart/cartSelector"
import { getMobileMenu } from "@/state/cart/cartSelector"

const ReamazeChat = () => {
  const sideCartOpened = useSelector((state: IStore) => getOpenSideCart(state))
  const showFixedCart = useSelector(getShowFixedCart)
  const ATCVisible = useSelector(getATCVisible)
  const isMobileMenuOpen = useSelector(getMobileMenu);
  const [render, setRender] = useState(false)
  
  useEffect(() => {
    const hideChat = document.getElementById("reamaze-widget-container")
    const UpperChat = document.getElementById("reamaze-widget")

    if (hideChat && UpperChat) {
      if (sideCartOpened || isMobileMenuOpen) {
        hideChat.style.display = `none`
      } else if (!showFixedCart && !ATCVisible) {
        UpperChat.style.bottom = `20px`
        hideChat.style.display = `block`
        UpperChat.style.transition = 'bottom 0.4s ease';
      } else {
        UpperChat.style.bottom = `140px`
        hideChat.style.display = `block`
      }
    }

  }, [sideCartOpened, showFixedCart, ATCVisible, isMobileMenuOpen])

  useEffect(() => {
    function loadScript() {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://cdn.reamaze.com/assets/reamaze.js";
        script.defer = true;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    }

    loadScript()
      .then(() => {
        const scriptColchones = document.createElement("script");
        scriptColchones.innerHTML = `
        var _support = _support || { 'ui': {}, 'user': {} };
        _support['account'] = 'calm-es-simple';
        _support['ui']['contactMode'] = 'mixed';
        _support['ui']['enableKb'] = 'false';
        _support['ui']['styles'] = {
          widgetColor: 'rgba(250, 189, 0, 0.99)',
          gradient: true,
        };
        _support['ui']['shoutboxFacesMode'] = 'default';
        _support['ui']['shoutboxHeaderLogo'] = true;
        _support['ui']['widget'] = {
          img: 'https://imagedelivery.net/7yveHullsFjmXtPLdJPFsg/118a5d15-4598-4e9f-4853-e5aed236a100/fit=cover',
          displayOn: 'all',
          fontSize: 'default',
          allowBotProcessing: true,
          label: {
            text: 'Sacate todas las dudas antes de comprar y aprovecha todos nuestros descuentos &#128293; &#191;Cuotas? Obvio, hasta 12 sin inter&#233;s &#128526;',
            mode: "notification",
            delay: 15,
            duration: 30,
            primary: 'Quiero que me ayuden!',
            secondary: 'No, gracias.',
            sound: true,
          },
          position: 'bottom-right',
          mobilePosition: 'bottom-right'
        };
        _support['apps'] = {
          faq: {"enabled":false},
          recentConversations: {"header":"Tus consultas recientes 😊"},
          orders: {"enabled":false,"header":"","find_order_button_text":"Busquemos tu orden"}
        };

          if(document.getElementById("reamaze-widget") && document.getElementById("reamaze-widget") != null) {
            document.getElementById("reamaze-widget").addEventListener("click", function(){  hj('trigger', 'csatpoll'); });          }
        `;
        document.body.appendChild(scriptColchones);
      })
      .catch((error) => {
        console.error("Error al cargar el script:", error);
      });

    return () => {
      const scriptColchones = document.querySelector(
        'script[data-widget="reamaze-widget"]'
      );
      if (scriptColchones) {
        document.body.removeChild(scriptColchones);
      }
    };
  }, []);
  
  if (!render) return null

  return (
      <div></div>
  );
};

export default ReamazeChat;
 */