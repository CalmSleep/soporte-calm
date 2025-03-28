import dynamic from 'next/dynamic';
import { useEffect, useState } from "react";
import NavBarMenu from "./components/NavBarMenu";
import { useDispatch, useSelector } from "react-redux";
/* import HeadBanner from "@/components/Molecules/HeadBanner/HeadBanner"; */
import { HeadBannerContent, MenuWrapper, NavBarWrapper, ScrolNavBar } from "./styled";
import { useModal } from "@/hooks/useModal";
import { onCloseSideCart, onGetCart, onOpenSideCart } from "@/state/cart/cartActions";
import { getOpenSideCart } from "@/state/cart/cartSelector";
import { getLoadingGetCart } from "@/state/loading/loadingSelector";
import { useRouter } from "next/router";
import { getHygraphId } from "@/utils/hygraphIds";
import BenefitsBanner from "../BenefitsBanner/BenefitsBanner";
import { onMobileMenuClose } from "@/state/cart/cartActions"
import { getMobileMenu } from "@/state/cart/cartSelector"
import { onGetHideNavbar, onGetShowNavbar } from "@/state/products/productsActions";
import { onGetHeadBannersData, onGetHeadBannersDataSucceeded } from '@/state/hygraph/hygraphActions';
import { getHideNavbarByATC } from '@/state/user/userSelector';
/* import Cart from '@/components/Organisms/Cart/Cart'; */
const Cart = dynamic(() => import('@/components/Organisms/Cart/Cart'), {
    ssr: false,
  });
  const HeadBanner = dynamic(() => import('@/components/Molecules/HeadBanner/HeadBanner'), {
    ssr: false,
  });
const Quizz = dynamic(() => import('@/components/Molecules/Quizz/Quizz'), {
    ssr: false,
  });

const NavBar = () => {
    const dispatch = useDispatch()
    const router = useRouter();
    const [isOpenModal, openModal, closeModal] = useModal(false)
    const sideCartOpened = useSelector(getOpenSideCart)
    const hideNavbarByATC = useSelector(getHideNavbarByATC)
    const isMobileMenuOpen = useSelector(getMobileMenu);
    const loadingGetCart = useSelector(getLoadingGetCart)
    const [quizzActive, setQuizzActive] = useState(false)
    const [showBannerAnimation, setShowBannerAnimation] = useState(false)
    const [selectedQuizz, setSelectedQuizz] = useState<undefined | string>()
    const [bannerId, setBannerId] = useState<string>()
    const [render, setRender] = useState(false)
    /*     const [showNavBar, setShowNavBar] = useState(true) */

    useEffect(() => {
        setTimeout(() => {
            setRender(true)
        }
        , 2000)
    }, [])

    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    const [selectedLink, setSelectedLink] = useState("")

    useEffect(() => {
        dispatch(onGetHeadBannersData());
      }, []);

    const openCart = () => {
        dispatch(onOpenSideCart())
        dispatch(onGetCart())
    }

    const closeCart = () => {
        dispatch(onCloseSideCart());
    };

  const setLandingSettings = (url: string) => {
    let selectedBannerId = ""
    if(url == "/promos-calm") {
        setSelectedLink("Promociones")
    } else if(url == "/quienes-somos") {
        setSelectedLink("Nosotrxs")
    } else if(url == "/locales-calm") {
        setSelectedLink("Locales")
    } else if(url.includes("colchon") && !url.includes("protector")) {
        setSelectedLink("Colchones")
        if(url.includes("perro")) {
            selectedBannerId = getHygraphId("mascotas-head-banner")
        }else if(url.includes("bb")) {
            selectedBannerId = getHygraphId("bb-head-banner")
        } else {
            selectedBannerId = getHygraphId("colchones-head-banner")
        }
    } else if(url.includes("base") || url.includes("sommier") || url.includes("cama-suavidad") || url.includes("cama-articulada-ola")) {
        setSelectedLink("Bases y sommiers")
        selectedBannerId = getHygraphId("bases-head-banner")
    } else if(url.includes("almohada")) {
        setSelectedLink("Almohadas")
        selectedBannerId = getHygraphId("almohadas-head-banner")
    } else if(url.includes("ropa-de-cama") || url.includes("edredon") || url.includes("funda") || url.includes("sabanas")) {
        setSelectedLink("Ropa de cama")
        selectedBannerId = getHygraphId("ropa-de-cama-head-banner")
    } else if(url.includes("marco-suavidad") || url.includes("respaldo-horizonte") || url.includes("protector-de-colchon") || url.includes("accesorios")) {
        setSelectedLink("Accesorios")
        selectedBannerId = getHygraphId("accesorios-head-banner")
    } else if(url.includes("mesa") ||  url.includes("sofa-cama-24-7") || url.includes("muebles")) {
        setSelectedLink("Muebles")
        selectedBannerId = getHygraphId("muebles-head-banner")
    }

    if((!selectedBannerId)) {
        selectedBannerId = getHygraphId("home-head-banner")
    }
    if(url.includes("feria")) {
        selectedBannerId = ""
    }
    return selectedBannerId
    }

    useEffect(() => {
       /*  const noNavBarRoutes = ["/pago", "/mantenimiento", "/checkout-pago", '/puntolocalm']; */
  
        const loadData = () => {
         /*    setShowNavBar(!noNavBarRoutes.some(route => router.asPath.includes(route))); */

            if(router) {
                dispatch(onMobileMenuClose())
                const selectedBannerId = setLandingSettings(router.asPath) 
                setBannerId(selectedBannerId)
            }
    
        }

        if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
            requestIdleCallback(() => loadData());
        } else {
            setTimeout(loadData, 0);
        }
    }, [router.asPath])

    useEffect(() => {
        const loadData = () => {
            const handleScroll = () => {
            const scrollY = document.documentElement.scrollTop;
            const currentScrollPos = window.scrollY;
            if (scrollY > 90 && !isMobileMenuOpen && typeof isOpenModal === "boolean" && !isOpenModal) {
                    setVisible(prevScrollPos > currentScrollPos || currentScrollPos === 0);
                    setPrevScrollPos(currentScrollPos);
                } else {
                    setVisible(true)
                }
            };

            window.addEventListener('scroll', handleScroll);

            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }

        if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
            requestIdleCallback(() => loadData());
        } else {
            setTimeout(loadData, 0);
        }
    }, [prevScrollPos, isMobileMenuOpen, isOpenModal]);

    useEffect(() => {
        if (visible) {
            dispatch(onGetShowNavbar())
        } else {
            dispatch(onGetHideNavbar())
        }
    }, [visible]);

    useEffect(() => {
        const loadData = () => {
            if (sideCartOpened && !isOpenModal && !loadingGetCart) {
                (openModal as () => void)() 
            } else if (!sideCartOpened && isOpenModal) {
                (closeModal as () => void)()
            }
       }
        
         if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
            requestIdleCallback(() => loadData());
        } else {
            setTimeout(loadData, 0);
        }
    }, [sideCartOpened, loadingGetCart])

    const quizzHandle = (quizzId?: string) => {
      setQuizzActive(!quizzActive)
      quizzId && setSelectedQuizz(quizzId)
    }

    useEffect(() => {
        if(hideNavbarByATC) {
            setShowBannerAnimation(true)
        }
    }, [hideNavbarByATC])

    const noNavBarRoutes = ["/pago", "/mantenimiento", "/checkout-pago", '/puntolocalm'];
    const showNavBar = !noNavBarRoutes.some(route => router.asPath.includes(route)) /* suma lcp */
    
    return (
    <>
        <NavBarWrapper  $show={showNavBar} $upper={bannerId === "" ? false : hideNavbarByATC}>
            <ScrolNavBar $visible={visible} >
                {bannerId != ""  &&
                    <HeadBannerContent $show={hideNavbarByATC} $showAnimation={showBannerAnimation}>
                        <HeadBanner
                            bannerId={bannerId}
                        />
                    </HeadBannerContent>
                }
                
                <MenuWrapper>
                    <NavBarMenu
                       openCart={openCart}
                        quizzHandle={quizzHandle}
                         selectedLink={selectedLink}
                        hasHeadBanner={bannerId != ""} 
                    />
                </MenuWrapper>

                {render && <Cart isOpen={isOpenModal} openCart={openCart} closeCart={closeCart} />}

                {bannerId != ""  &&
                    <BenefitsBanner />
                }
            </ScrolNavBar>
            {
                quizzActive && selectedQuizz &&
                    <Quizz quizzActive={quizzActive} closeHandle={quizzHandle} quizzKey={selectedQuizz}/>
            }
        </NavBarWrapper>
    </>

    )
}

export default NavBar