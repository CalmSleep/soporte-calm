import {

    LogoWrapper,
    NavBarWrapper,
    MobileMenuIconWrapper,
} from "./styled"
import { useEffect, useState } from "react";
import { IProps } from './types';
import Text from "@/components/Atoms/Typography/Text"
import { productURLRedirectionByEnv } from "@/utils/productURLRedirectionByEnv"
import { Turn as MobileMenuIcon } from 'hamburger-react';
import { useDispatch, useSelector } from "react-redux"
import { onMobileMenuOpen, onMobileMenuClose } from "@/state/cart/cartActions"
import { getMobileMenu, getShowFixedCart } from "@/state/cart/cartSelector";
import { onShowCart, onCloseCart } from "@/state/cart/cartActions"
import MenuDesktop from "./MenuDesktop"
import MenuMobile from "./MenuMobile"
import { menuData, staticLandings } from "../utils";
import Icons from "@/components/Atoms/Icons/Icons";

const CalmLogo = () => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" height="50" viewBox="0 0 599 306" width="599">
        <path d="M0 55.022C0 24.853 24.4568 0.39621 54.6258 0.39621H544.374C574.543 0.39621 599 24.853 599 55.022V250.921C599 281.09 574.543 305.547 544.374 305.547H54.6258C24.4568 305.547 0 281.09 0 250.921V55.022Z" fill="#F5A203"/>
        <path d="M146.181 213.049C131.538 213.049 119.336 208.163 109.574 198.392C99.9407 188.62 95.124 176.535 95.124 162.135C95.124 147.735 99.9407 135.649 109.574 125.878C119.336 116.106 131.538 111.221 146.181 111.221C155.429 111.221 163.907 113.471 171.614 117.971C178.999 122.212 184.787 127.768 188.977 134.637C189.402 135.333 189.156 136.236 188.45 136.646L165.874 149.756C165.125 150.192 164.168 149.893 163.737 149.141C160.154 142.889 154.174 139.763 145.796 139.763C139.502 139.763 134.3 141.885 130.19 146.128C126.079 150.242 124.024 155.578 124.024 162.135C124.024 168.692 126.079 174.092 130.19 178.335C134.3 182.449 139.502 184.506 145.796 184.506C154.284 184.506 160.268 181.388 163.749 175.151C164.174 174.39 165.135 174.079 165.891 174.512L188.448 187.439C189.155 187.844 189.406 188.744 188.988 189.444C184.804 196.435 179.077 202.053 171.806 206.299C164.099 210.799 155.558 213.049 146.181 213.049Z" fill="#FAFAFA"/>
        <path d="M264.108 115.366C264.108 114.545 264.774 113.879 265.595 113.879H291.521C292.342 113.879 293.008 114.545 293.008 115.366V208.82C293.008 209.641 292.342 210.307 291.521 210.307H265.595C264.774 210.307 264.108 209.641 264.108 208.82V205.225C264.108 203.849 262.346 203.165 261.327 204.09C254.778 210.035 246.136 213.007 235.4 213.007C222.684 213.007 211.83 208.121 202.839 198.35C193.848 188.45 189.352 176.364 189.352 162.093C189.352 147.822 193.848 135.8 202.839 126.029C211.83 116.129 222.684 111.179 235.4 111.179C246.136 111.179 254.778 114.151 261.327 120.096C262.346 121.021 264.108 120.337 264.108 118.961V115.366ZM224.611 179.257C228.85 183.5 234.373 185.621 241.18 185.621C247.988 185.621 253.511 183.5 257.75 179.257C261.989 175.014 264.108 169.293 264.108 162.093C264.108 154.893 261.989 149.172 257.75 144.929C253.511 140.686 247.988 138.564 241.18 138.564C234.373 138.564 228.85 140.686 224.611 144.929C220.372 149.172 218.253 154.893 218.253 162.093C218.253 169.293 220.372 175.014 224.611 179.257Z" fill="#FAFAFA"/>
        <path d="M306.02 210.304C305.198 210.306 304.53 209.64 304.53 208.817V86.646C304.53 85.8247 305.196 85.1589 306.018 85.1589L332.055 85.1589C332.877 85.1589 333.542 85.8247 333.542 86.646V208.77C333.542 209.591 332.878 210.256 332.058 210.258L306.02 210.304Z" fill="#FAFAFA"/>
        <path d="M454.083 111.127C465.129 111.127 473.992 114.791 480.671 122.12C487.35 129.32 490.69 138.962 490.69 151.048V208.768C490.69 209.589 490.024 210.255 489.203 210.255H463.277C462.456 210.255 461.79 209.589 461.79 208.768V153.555C461.79 148.669 460.57 144.812 458.129 141.984C455.817 139.155 452.413 137.741 447.918 137.741C443.165 137.741 439.44 139.348 436.743 142.562C434.174 145.777 432.889 150.212 432.889 155.869V208.768C432.889 209.589 432.224 210.255 431.402 210.255H405.476C404.655 210.255 403.989 209.589 403.989 208.768V153.555C403.989 148.669 402.769 144.812 400.328 141.984C398.016 139.155 394.613 137.741 390.117 137.741C385.364 137.741 381.64 139.348 378.942 142.562C376.373 145.777 375.089 150.212 375.089 155.869V208.768C375.089 209.589 374.423 210.255 373.602 210.255H347.676C346.854 210.255 346.189 209.589 346.189 208.768V115.314C346.189 114.493 346.854 113.827 347.676 113.827H373.602C374.423 113.827 375.089 114.493 375.089 115.314V117.882C375.089 119.345 377.123 120.029 378.163 119C383.472 113.751 391.053 111.127 400.906 111.127C411.272 111.127 419.262 114.777 424.875 122.079C425.514 122.91 426.798 122.924 427.458 122.11C433.396 114.788 442.271 111.127 454.083 111.127Z" fill="#FAFAFA"/>
      </svg>
    )
  }

const NavBarMenu = ({selectedLink, openCart, quizzHandle, hasHeadBanner }: IProps) => {
    const dispatch = useDispatch()
    const [currentCategory, setCurrentCategory] = useState("");
    const isMobileMenuOpen = useSelector(getMobileMenu);
    const showATCButton = useSelector(getShowFixedCart)

    const onToggle = () => {
        setCurrentCategory("");
        if (isMobileMenuOpen) {
            dispatch(onMobileMenuClose())
        } else {
            dispatch(onMobileMenuOpen())
        }
        if (showATCButton) {
            dispatch(onCloseCart())
        } else if (!showATCButton) {
            dispatch(onShowCart())
        }
    }

    const handleRedirect = () => {
        setCurrentCategory("")

        if (isMobileMenuOpen) {
            dispatch(onMobileMenuClose())
        }
    }

    useEffect(() => {
        const loadData = () => {
            const menu = document.getElementById('menuWrapper');
        
            const handleScroll = (e: WheelEvent) => {
            e.preventDefault();
            if (menu) {
                menu.scrollTop += e.deltaY;
            }
            };
        
            if (menu) {
                menu.addEventListener('wheel', handleScroll);
            }
            if (!isMobileMenuOpen && menu) {
                menu.removeEventListener('wheel', handleScroll);
            }
        }

        if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
            requestIdleCallback(() => loadData());
        } else {
            setTimeout(loadData, 0);
        }
      }, [isMobileMenuOpen]);
      
    return (
        <>
            <NavBarWrapper>
                <MobileMenuIconWrapper>
                    <MobileMenuIcon
                        label="open menu"
                        toggled={isMobileMenuOpen}
                        toggle={onToggle}
                        size={20}
                    />
                </MobileMenuIconWrapper>
                
                 <LogoWrapper>
                    <Text textTag="a" textDecoration="none" link={productURLRedirectionByEnv('/')} isNextLink arialLabel="Home">
                        <Icons
                        width="75px"
                        responsiveMobile={{
                            width:"65px"
                        }}
                        >
                            {CalmLogo()}
                        </Icons>
                    </Text>
                </LogoWrapper>
            
            <MenuDesktop
                    menuData={menuData}
                    selectedLink={selectedLink}
                    currentCategory={currentCategory}
                    setCurrentCategory={setCurrentCategory}
                    handleRedirect={handleRedirect}
                    quizzHandle={quizzHandle}
                    staticLandings={staticLandings}
                    openCart={openCart}
                    hasHeadBanner={hasHeadBanner}
                />

            <MenuMobile
                    menuData={menuData}
                    selectedLink={selectedLink}
                    currentCategory={currentCategory}
                    setCurrentCategory={setCurrentCategory}
                    handleRedirect={handleRedirect}
                    quizzHandle={quizzHandle}
                    staticLandings={staticLandings}
                    hasHeadBanner={hasHeadBanner}
                />

            </NavBarWrapper>

        </>
    )
}

export default NavBarMenu;