import {
    CategoryItemTitle,
    CategoryItemWrapper,
    LandingsWrapperMobile,
    MenuWrapperMobile,
    RowItemMobile,
    NavigationDropDown,
    Pill,
    ProductWrapper,
    ProductsColumnContainer,
    ProductsWrapper,
    BackWrapper,
    QuizzContainer,
    ProductContainer,
    ProductsContainerMobile,
    CardImage,
    ImagesColumn,
    HeaderProducts,
    FooterProducts,
    ImageAndTitleContainerMobile,
    ProductsColumnContainerMobile,
    ProductsWrapperContainerMobile,
    ChildProducstWrapperMobile,
    WhiteDiv,
} from "./styled"
import Images from "@/components/Atoms/Images/Images";
import Text from "@/components/Atoms/Typography/Text"
import Margin from "@/components/Atoms/Spacing/Margin/Margin";
import { productURLRedirectionByEnv } from "@/utils/productURLRedirectionByEnv"
import { productURLRedirectionById } from '@/utils/productURLById';
import QuizzCard from "@/components/Molecules/QuizzCard/QuizzCard"
import { IPropsMenuDkestop } from "./types"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";
import { getMobileMenu } from "@/state/cart/cartSelector";
import { useEffect, useState } from "react";
import React from "react";
import SkeletonLoader from "@/components/Atoms/SkeletonLoader/SkeletonLoader";

const MenuMobile = ({
    menuData,
    selectedLink,
    currentCategory,
    setCurrentCategory,
    handleRedirect,
    quizzHandle,
    staticLandings
}: IPropsMenuDkestop) => {
    const isMobileMenuOpen = useSelector(getMobileMenu);
    const [render, setRender] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setRender(true)
        }, 1000)
    }, [])

 /*    if (!render) return null */

    return (
        <MenuWrapperMobile id="menuWrapper" $isMenuOpen={isMobileMenuOpen}>
        <div>
            {menuData.map((categoryItem) => {
                return (
                    <RowItemMobile key={categoryItem.name}>
                        <CategoryItemWrapper $active={currentCategory != ""}>
                            <CategoryItemTitle onClick={() => setCurrentCategory(categoryItem.name)}>
                                <ProductsContainerMobile>
                                    <ImageAndTitleContainerMobile>
                                        {
                                            render ? 
                                            <Images src={categoryItem.imageCategory} alt="productImage" width="4em" height="4em" responsiveMobile={{borderRadius: "4px"}} isLazy/>
                                            : <SkeletonLoader width="4em" height="4em"/>
                                        }
                                        <Margin margin="15px 0">
                                            <Text
                                            fontSize="1em"
                                            color={(currentCategory == categoryItem.name || selectedLink == categoryItem.name) ? "wildViolet" : "black"}
                                            font="bold"
                                            >
                                                {categoryItem.name}
                                            </Text>
                                            <Text
                                            fontSize="0.85em"
                                            font="regular"
                                            color={(currentCategory == categoryItem.name || selectedLink == categoryItem.name) ? "wildViolet" : "brilliantLiquorice"}
                                            >
                                                {categoryItem.description}
                                            </Text>
                                        </Margin>
                                    </ImageAndTitleContainerMobile>
                                    <Margin margin="0">
                                        {
                                            render && 
                                                <IoIosArrowForward />
                                        }
                                    </Margin>
                                </ProductsContainerMobile>
                            </CategoryItemTitle>
                        </CategoryItemWrapper>
                        
                        <NavigationDropDown
                            $active={currentCategory == categoryItem.name}
                        >
                            <ProductsColumnContainer>
                                <BackWrapper onClick={() => setCurrentCategory("")}>
                                    <Margin margin="0.5em 0 0 20px">
                                        {
                                            render && 
                                                <IoIosArrowBack />
                                        }
                                    </Margin>
                                    <Text
                                    font="bold"
                                    fontSize="1em"
                                    color="millionGray"
                                    >
                                        volver
                                    </Text>
                                </BackWrapper>

                                <ProductsWrapperContainerMobile>
                                    <ChildProducstWrapperMobile>
                                { render && ((categoryItem.columns[0].products.length > 3 ? [categoryItem.columns[0]] : categoryItem.columns).map((item, index) => 
                                    <ProductsColumnContainerMobile key={index}>
                                        <HeaderProducts $isSofa={item.header == "Sofás"}>
                                            <Text color="black" font="bold" fontSize="16px">{item.header == "Sofás" ? "" : item.header}</Text>
                                        </HeaderProducts>
                                        <Margin margin="8px 0 8px 0">
                                        <ProductsWrapper>
                                            {item.products.map((item) => (
                                                <ProductWrapper key={item.id}>
                                                    { item.name == "Sofá Cama 24/7" && (
                                                        <HeaderProducts $isSofaMobile={true}>  
                                                            <Text color="black" font="bold" fontSize="20px">Sofás</Text>
                                                        </HeaderProducts>
                                                    )} 
                                                    <ProductContainer>
                                                        <Text 
                                                        textTag="a"
                                                        link={productURLRedirectionById(item.id)}
                                                        handleClick={handleRedirect}
                                                        isNextLink
                                                        >
                                                            <ImageAndTitleContainerMobile>
                                                                <Images 
                                                                src={item.image}
                                                                    alt="productImage" 
                                                                    width="4.5em" 
                                                                    height="4.5em" 
                                                                    responsiveMobile={{borderRadius: "4px"}}
                                                                    isLazy
                                                                />

                                                                <Margin margin="5px 8px">
                                                                    <Text 
                                                                    textTag="p"
                                                                    textDecoration="none"
                                                                    color="offBlack"
                                                                    font="bold"
                                                                    fontSize="16px"
                                                                    >
                                                                        {item.name}
                                                                    </Text>
                                                                    <Text 
                                                                    textTag="p"
                                                                    textDecoration="none"
                                                                    color="brilliantLiquorice"
                                                                    font="regular"
                                                                    fontSize="14px"
                                                                    >
                                                                        {item.description}
                                                                    </Text>
                                                                    {item.pillMessage && 
                                                                        <Margin margin="5px 0 0 0">  
                                                                            <Pill $isYellowPill={item.isYellowPill}>{item.pillMessage}</Pill>
                                                                        </Margin>
                                                                    }
                                                                </Margin>
                                                            </ImageAndTitleContainerMobile>
                                                            <Margin margin="0.5em 0 0 20px">
                                                                <IoIosArrowForward />
                                                            </Margin>
                                                        </Text>
                                                    </ProductContainer>
                                                </ProductWrapper>
                                            ))}
                                        </ProductsWrapper>
                                        </Margin>
                                    </ProductsColumnContainerMobile>
                                    ))}
                                    <Margin margin="0px 0 10px 20px">
                                            <Text 
                                            textTag="a" 
                                            link={productURLRedirectionByEnv(categoryItem.redirect)}
                                            fontSize="16px"
                                            font="regular"
                                            color="wildViolet"
                                            textDecoration="underline"
                                            handleClick={handleRedirect}
                                            isNextLink
                                            > 
                                                {categoryItem.seeMoreText}
                                            </Text>
                                    </Margin>
                                    <ImagesColumn>
                                        {categoryItem.selectedProducts.map((product) => (
                                            <CardImage key={product.id}> 
                                                <Text textTag="a" link={productURLRedirectionById(product.id)} isNextLink>
                                                    {
                                                        render ?
                                                        <Images 
                                                        src={product.image_url + "?tr=w-200"} 
                                                        alt="producto" 
                                                        width="175px" 
                                                        height="110px" 
                                                        borderRadius="10px" 
                                                        isLazy
                                                        />
                                                        : <SkeletonLoader width="175px" height="110px"/>
                                                    }
                                                    
                                                </Text>
                                                <Margin margin="5px 0 10px 0">
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
                                                <Text 
                                                textTag="p" 
                                                color="brilliantLiquorice"
                                                font="regular"
                                                fontSize="14px"
                                                textDecoration="none"
                                                >
                                                    {product.description}
                                                </Text>
                                                
                                                </Margin>
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
                                        <WhiteDiv>
                                        </WhiteDiv>
                                        </ChildProducstWrapperMobile>
                                </ProductsWrapperContainerMobile>
                            </ProductsColumnContainer>
                        </NavigationDropDown>
                    </RowItemMobile>
                )
            })}
            <LandingsWrapperMobile $active={currentCategory != ""}>
                {staticLandings.map((landingData) => {
                    return (
                        <Margin margin="10px 0" key={landingData.name}>
                            <Text
                            textTag="a"
                            link={landingData.redirect}
                            textDecoration="none"
                            color={landingData.name == "Promociones" ? 'rareRed' : 'offBlack'}
                            isNextLink
                            handleClick={handleRedirect}
                            fontSize="16px"
                            font="bold"
                            >
                                {landingData.name}
                            </Text>
                        </Margin>
                    )
                })}
            </LandingsWrapperMobile>

        </div>
    </MenuWrapperMobile>
    )
} 

export default MenuMobile