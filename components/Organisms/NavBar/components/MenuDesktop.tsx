import {
    CategoryItemTitle,
    CategoryItemWrapper,
    MenuWrapperDesktop,
    NavigationDropDown,
    DropdownContainer,
    Pill,
    ProductWrapper,
    ProductsColumnContainer,
    ProductsWrapper,
    ProductContainer,
    SelectedProductWrapper,
    CartAndLandingsWrapper,
    CartNumber,
    CartWrapper,
    LandingsWrapperDesktop,
    ImagesColumn,
    CardImage,
    QuizzContainer,
    HeaderProducts,
    FooterProducts,
    CategoryItemContainer,
    ProductsColumn
} from "./styled"
import Images from "@/components/Atoms/Images/Images";
import Text from "@/components/Atoms/Typography/Text"
import Margin from "@/components/Atoms/Spacing/Margin/Margin";
import { productURLRedirectionByEnv } from "@/utils/productURLRedirectionByEnv"
import { productURLRedirectionById } from '@/utils/productURLById';
import QuizzCard from "@/components/Molecules/QuizzCard/QuizzCard"
import { IPropsMenuDkestop } from "./types"
import { useSelector } from "react-redux";
import { getLoadingAddOrUpdateCart, getLoadingGetCart } from "@/state/loading/loadingSelector";
import Spinner from "@/components/Atoms/Spinner/Spinner";
import { getCartItemsCount } from "@/state/cart/cartSelector";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Cart = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" height="28" viewBox="0 0 32 32" width="20">
            <rect height="16.331" rx="1.1665" stroke="#818A91" strokeWidth="1.3998" width="16.331" x="7.33467" y="11.2324"/>
            <path d="M11.3008 14.2652V8.56231C11.3008 6.04261 13.1809 4 15.5002 4C17.8194 4 19.6996 6.04261 19.6996 8.56231V14.2652" stroke="#818A91" strokeLinecap="round" strokeWidth="1.3998"/>
        </svg>
    )
}

const MenuDesktop = ({
    menuData,
    selectedLink,
    currentCategory,
    setCurrentCategory,
    handleRedirect,
    quizzHandle,
    staticLandings,
    openCart,
    hasHeadBanner
}: IPropsMenuDkestop) => {
    const router = useRouter();
    const loadingAddOrUpdateCart = useSelector(getLoadingAddOrUpdateCart)
    const itemsCount = useSelector(getCartItemsCount)
    const loadingGetCart = useSelector(getLoadingGetCart)
    const [render, setRender] = useState(false)
    const [showNavbar, setShowNavbar] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setRender(true)
        }, 1000)
    }, [])

    useEffect(() => {
       if (!showNavbar) {
           setTimeout(() => {
               setShowNavbar(true)
           }, 1000)
       }
    }, [showNavbar])

    useEffect(() => {
        const handleRouteChange = () => {
            setShowNavbar(false)
        }

        router.events.on("routeChangeComplete", handleRouteChange)
        return () => {
        router.events.off("routeChangeComplete", handleRouteChange)
        }
    }, [router.events])

   /*  if (!render) return null */
    return (
        <>
            <MenuWrapperDesktop>
            {menuData.map((categoryItem) => {
                return (
                    <CategoryItemWrapper 
                        key={categoryItem.name}
                        onMouseEnter={() => setCurrentCategory(categoryItem.name)}
                        onMouseLeave={() => setCurrentCategory("")}
                    >
                        <Text 
                        textTag="a" 
                        textDecoration="none" 
                        link={productURLRedirectionByEnv(categoryItem.redirect)} 
                        handleClick={handleRedirect}
                        isNextLink>
                            <CategoryItemTitle
                                
                            >
                                <Text
                                fontSize=".9em"
                                font="medium"
                                color={(currentCategory == categoryItem.name || selectedLink == categoryItem.name) ? "wildViolet" : "blackOut"}
                                >
                                    {categoryItem.name}
                                </Text>
                            </CategoryItemTitle>
                        </Text>
                        <NavigationDropDown
                            $active={currentCategory == categoryItem.name && showNavbar}
                            $isFeria={!hasHeadBanner}
                            $hasThreeRows={categoryItem.name == "Colchones" || categoryItem.name == "Muebles"}
                            onMouseEnter={() => setCurrentCategory(categoryItem.name)}
                            onMouseLeave={() => setCurrentCategory("")}
                        >
                            
                            <ProductsColumn>  
                            <ProductsColumnContainer>
                                {categoryItem.columns.map((item, index) => 
                                <CategoryItemContainer key={index}>
                                    <HeaderProducts>  
                                        <Text color="black" font="bold" fontSize="20px">{item.header == "Sofás" ? "" : item.header}</Text>
                                    </HeaderProducts>
                                    <Margin margin="8px 0 8px 0">
                                    <ProductsWrapper>
                                    {render && (
                                        item.products.slice(0, (categoryItem.name == "Colchones" || categoryItem.name == "Muebles") ? 3 : 2).map((item) => (
                                            <ProductWrapper key={item.id}>
                                                {item.name == "Sofá Cama 24/7" && (
                                                    <HeaderProducts $isSofa>  
                                                        <Text color="black" font="bold" fontSize="20px">Sofás</Text>
                                                    </HeaderProducts>
                                                )} 
                                                <ProductContainer>
                                                <Text 
                                                textTag="a"
                                                link={productURLRedirectionById(item.id)}
                                                handleClick={() => {
                                                    handleRedirect(); 
                                                    setCurrentCategory("");
                                                }}
                                                isNextLink
                                                >
                                                <Images src={item.image} alt="productImage" width="5em" borderRadius="12px" isLazy/>

                                                    <Margin margin="5px 8px 5px 0">
                                                        <Text 
                                                        textTag="p"
                                                        textDecoration="none"
                                                        color="offBlack"
                                                        font="medium"
                                                        fontSize="1em"
                                                        >
                                                            {item.name} 
                                                        </Text>
                                                        <Text 
                                                        textTag="span"
                                                        textDecoration="none"
                                                        color="brilliantLiquorice"
                                                        font="light"
                                                        fontSize="0.9em"
                                                        >
                                                            {item.description}
                                                        </Text>
                                                        {item.pillMessage && 
                                                            <Margin margin="10px 0 0 0">  
                                                                <Pill $isYellowPill={item.isYellowPill}>{item.pillMessage}</Pill>
                                                            </Margin>
                                                        }
                                                    </Margin>
                                                    </Text>
                                                </ProductContainer>
                                            </ProductWrapper>
                                        )))}
                                    </ProductsWrapper>
                                    <FooterProducts>
                                    <Text 
                                        textTag="a" 
                                        link={productURLRedirectionByEnv(categoryItem.redirect)}
                                        fontSize="0.8em"
                                        font="medium"
                                        color="wildViolet"
                                        textDecoration="underline"
                                        handleClick={handleRedirect}
                                        isNextLink
                                    > 
                                        {item.footer}
                                    </Text>
                                    </FooterProducts>
                                    </Margin>
                                </CategoryItemContainer>
                                )}
                            </ProductsColumnContainer>
                            </ProductsColumn>
                            <ImagesColumn>
                            {categoryItem.selectedProducts.map((product) => (
                                <CardImage key={product.id}>
                                    <Text textTag="a" link={productURLRedirectionById(product.id)} isNextLink>
                                        {
                                            render &&
                                            <Images src={product.image_url + "?tr=w-200"} alt="producto" width="200px" height="125px" borderRadius="10px" isLazy/>
                                        }
                                    </Text>
                                    <Margin margin="0px 0 5px 0">
                                    <Text 
                                    textTag="a" 
                                    link={productURLRedirectionById(product.id)}
                                    color="offBlack"
                                    font="extraBold"
                                    fontSize="16px"
                                    textDecoration="none"
                                    handleClick={handleRedirect}
                                    isNextLink
                                    >
                                        {product.name}
                                    </Text>
                                    </Margin>
                                    <Text fontSize="14px" font="light" color="brilliantLiquorice">{product.description}</Text>
                                </CardImage>
                            ))}
                            {
                                categoryItem.quizz && 
                                  <QuizzContainer>
                                    {categoryItem.quizz.map((quizItem) => (
                                        <QuizzCard 
                                        key={quizItem.id} 
                                        quizzHandle={quizzHandle} 
                                        isfromNavBar
                                        src={quizItem.image_url} 
                                        text={quizItem.text} 
                                        id={quizItem.id} 
                                        />
                                    ))}
                                    </QuizzContainer>
                            }
                            </ImagesColumn>
                        </NavigationDropDown>
   
                    </CategoryItemWrapper>
                )
                
            })}
        </MenuWrapperDesktop>
        <CartAndLandingsWrapper>
            <LandingsWrapperDesktop>
                {staticLandings.map((landingData) => {
                    return (
                        <Margin margin="0 6px" key={landingData.name}>
                            <Text
                            textTag="a"
                            textDecoration="none"
                            fontSize=".8em"
                            color={landingData.name == "Promociones" ? "rareRed" : (selectedLink === landingData.name) ? "madForMango" : "offBlack"}
                            HoverColor="wildViolet"
                            link={landingData.redirect}
                            handleClick={handleRedirect}
                            isNextLink
                            >
                                {landingData.name}
                            </Text>
                        </Margin>
                        )
                    })}
            </LandingsWrapperDesktop>
                        
            <CartWrapper onClick={() => openCart && openCart()}>
                {Cart()}
                <CartNumber $disabled={itemsCount == ""}> 
                    {
                        loadingAddOrUpdateCart || loadingGetCart ?
                        <Spinner />
                        :
                        <Text
                        color="brilliance"
                        font="regular"
                        fontSize=".7em"
                        >
                            {itemsCount}
                        </Text>
                    }
                </CartNumber>
            </CartWrapper>
        </CartAndLandingsWrapper>
    </>
    )
} 

export default MenuDesktop