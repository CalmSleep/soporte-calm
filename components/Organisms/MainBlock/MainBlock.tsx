import ProductTitleMainBlock from "@/components/Molecules/ProductTitleMainBlock/ProductTitleMainBlock"
import { ATCEvent, IChildWithSize, IProps } from "./types"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  LandingContent,
  Wrapper,
  Breadcrumbs,
  LeftColumn,
  GalleryWrapper,
  RightColumn,
  SpanColumns,
  DivTitlePills,
  ImagePromo,
  ButtonInfo,
  ContainerPaymentMethod,
  MiniBannerMobile,
  Adopt,
  AdoptButton,
  ATCButton,
  AtcQuantity,
  Arrow,
  DropdownContainer,
  DropdownHeader,
  DropdownListContainer,
  DropdownList,
  ListItem,
  DivShowText,
  Chat
} from "./styled"
import { onAddItemToCart, onUpdateItemFromCart } from "@/state/cart/cartActions"
import NuggetReview from "@/components/Molecules/Reviews/NuggetReviews/NuggetReview"
import { getCartData, getHasEDE, getShowFixedCart } from "@/state/cart/cartSelector"
import getIDBySKU from "@/utils/idBySKU"
import FormStockOut from "@/components/Molecules/FormStockOut/FormStockOut"
import tags from "../../../jsons/tags_mailchimp.json"
import { topPage } from "@/utils/topPage"
import Text from "@/components/Atoms/Typography/Text"
import Carrousel from "@/components/Molecules/Carousel/Carousel"
import Margin from "@/components/Atoms/Spacing/Margin/Margin"
import PricesVisor from "@/components/Molecules/PricesVisor/PricesVisor"
import Pills from "@/components/Atoms/Pills/Pills"
import Modal from "../Modals/Modal"
import InformationShipping from "../../Molecules/InformationShipping/InformationShipping"
import Spinner from "@/components/Atoms/Spinner/Spinner"
import Button from "@/components/Atoms/Buttons/Button"
import { Dog, ArrowQuantity, Purchase } from "./mainBlockicons"
/* import * as fbq from "@/lib/fpixel"; */
import { formatNumber } from "@/utils/formatPrices"
import PaymentCards from "@/components/Molecules/PaymentCards/PaymentCards";
import { ATCFixed } from "@/components/Molecules/ATCFixed/ATCFixed";
import variations_sizes from "@/utils/variations_sizes"
import { BannerAndCucarda } from "@/components/Molecules/BannerAndCucarda/BannerAndCucarda"
import { productURLRedirectionByEnv } from "@/utils/productURLRedirectionByEnv"
import { getLoadingRedirect } from "@/state/loading/loadingSelector"
import { IStore } from '@/state/types';
import { MainBlockPreviewLoaders , MainBlockLoaders } from "./Loaders"
import ProductProps from "@/components/Organisms/ProductProps/ProductProps"
import { childrenVariationWithoutStock, atrrToRender } from "@/utils/productsFunctios"
import SkeletonLoader from "@/components/Atoms/SkeletonLoader/SkeletonLoader"
import { sendEvent } from '@/utils/dataLayerEvents';
import RelatedProductsATC from "@/components/Organisms/RelatedProductsATC/RelatedProductsATC"
import { IChildrenProd } from "@/state/products/types"
import NewModal from "@/components/Organisms/NewModals/NewModals"
import { PaymentModalInfo } from "../PaymentModalInfo/PaymentModalInfo"
import { useRouter } from "next/router";
import { klaviyoViewedProduct, klaviyoAddToCart } from "@/lib/klaviyo"
import { getChatLoaded } from "@/state/user/userSelector"
import ShelfConfigurator from "../ShelfConfigurator/ShelfConfigurator"
import { getEdeId } from "@/utils/EdeId"

interface Data {
  [key: string]: string
}

const tagsData: Data = tags

const MainBlock = ({
  galleryImages,
  category,
  title,
  dreamDelivery,
  description,
  children,
  discount,
  renders,
  installments,
  skus,
  tranferDiscount,
  stateLoading,
  defaultProds,
  isCombo,
  idProd,
  pillIdSpecialOffer,
  stockAndPrices,
  atcImage,
  feriaATCEnabled,
  headPills,
  SecondheadPills,
  relatedItems,
  relatedProductsATC,
  lcpImage,
  isDesktop,
  render,
  isComponentes,
  idCPValidator
}: IProps) => {
  const router = useRouter();
  const dispatch = useDispatch()
  const cartData = useSelector(getCartData)
  const hasEDE = useSelector(getHasEDE)
  const showATCButton = useSelector(getShowFixedCart)
  const loadingRedirect = useSelector((state: IStore) => getLoadingRedirect(state))
  const [galleryLoaded, setGalleryLoaded] = useState(false)
  const [RPDouble, setRPDouble] = useState(relatedProductsATC?.slice(0, 2))
  const chatLoaded = useSelector(getChatLoaded);

  let propsNames = atrrToRender(children)

  let hasQuantity = idProd == "1831947" || 
  idProd == "1855350" ||
  idProd == "724708" ||
  idProd == "537" || 
  idProd == "1851772" || 
  idProd == "1835935" || 
  idProd == "1851178" || 
  idProd == "1851405" 

  const options = ["1", "2", "3", "4", "5", "6"];

  const [addToCartEnabled, setAddToCartEnabled] = useState(false)

  const [selectedChild, setSelectedChild] = useState(
    children ? children[0] : undefined
  )

  const [rPToATC, setRPToATC] = useState<IChildrenProd[]>([])
  const [checkboxEnsueno, setCheckboxEnsueno] = useState<boolean>(false)
  const [modalPostal, setModalPostal] = useState(false)
  const [isRenderSelected, setIsRenderSelected] = useState(false)
  const [isSizechange, setIsSizeChange] = useState(false)
  const [isColorchange,  setIsColorChange] = useState(false)
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState<number>(selectedChild ? selectedChild.regular_price : 0);
  const [ATCprice, setATCPrice] = useState<number>(price);
  const [adjustedRegularPrice, setAdjustedRegularPrice] = useState<number>(selectedChild ? selectedChild.regular_price : 0 );
  const relatedId = relatedItems && relatedItems?.map(item => item.id_prod).join(', ');
  const relatedName = relatedItems && relatedItems?.map(item => item.name).join(', ');
  const [isQuantityOpen, setIsQuantityOpen] = useState(false);
  const [hasSendATC, setHasSendATC] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);  

  useEffect(() => {
    if(selectedChild) {
      if(quantity !== 1) {
        if(idProd == '2249180' || idProd == "2249006"){
          setAdjustedRegularPrice(selectedChild.price * 2);
          setPrice((selectedChild.price*2)*0.90)
        } else {
          setAdjustedRegularPrice(selectedChild.regular_price * quantity);
          setPrice((selectedChild.price*quantity))
        }
      } else if((quantity === 1)) {
        setPrice(selectedChild.price)
        setAdjustedRegularPrice(selectedChild.regular_price);
      }
    }
  }, [quantity, selectedChild])

  useEffect(() => {
    if (rPToATC.length > 0) {
      let atcPice: number = 0
      rPToATC.map(item => 
        atcPice += item.price
      )
      setATCPrice(price + atcPice);
    } else {
      setATCPrice(price)
    }
  }, [price, rPToATC])

  const displayFormStockout = () => {
    return childrenVariationWithoutStock(selectedChild) 
  }

  useEffect(() => {
    if (selectedChild) {
      setAddToCartEnabled(selectedChild.stock > 0 || selectedChild.backorder)
    }
  }, [selectedChild])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsQuantityOpen(false);
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleQuantityChange = (option: string) => {
    setQuantity(Number(option)); 
    setIsQuantityOpen(false);
  };

  const handleQuantityChangeMuebles = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  const AddToCart = async (hasEDE: boolean = false) => {
    if (selectedChild) {
      if (parseInt(selectedChild.id) !== -1 && addToCartEnabled) {
        if (isCombo) {
          const skus = selectedChild.sku.split(";")
          await Promise.all(
            skus.map(async (sku) => {
              const id = getIDBySKU(sku)
              const itemInCart = cartData?.items.find(
                (item) => item.id.toString() === id
              )
              if (itemInCart) {
                const key = itemInCart.key
                const qty = itemInCart.quantity + quantity
                await dispatch(onUpdateItemFromCart(key, qty, itemInCart.name))
              } else {
                await dispatch(onAddItemToCart(parseInt(id), quantity, hasEDE))
              }
            })
          )
        } else {
          const { id } = selectedChild

          const itemInCart = cartData?.items.find(
            (item) => item.id.toString() === id
          )
          if (itemInCart) {
            const key = itemInCart.key
            const qty = itemInCart.quantity + quantity
            await dispatch(onUpdateItemFromCart(key, qty, itemInCart.name))
          } else {
            await dispatch(onAddItemToCart(parseInt(id), quantity, hasEDE))
          }

          const rpToDispatch: number[] = rPToATC.map((item) => Number(item.id));

          if (rpToDispatch.length > 0) {
            for (const itemId of rpToDispatch) {
              const itemInCart = cartData?.items.find(
                (item) => item.id === itemId
              );
              if (itemInCart) {
                const key = itemInCart.key;
                const qty = itemInCart.quantity + 1;
                await dispatch(onUpdateItemFromCart(key, qty, itemInCart.name));
              } else {
                await dispatch(onAddItemToCart(itemId, 1));
              }
            }
          }
        }
      }

      const ATC: ATCEvent = {
        currency: "ARS",
        value: selectedChild.price,
        items: [
        {
          item_id: `${selectedChild.sku}`,
          variant_id: `${selectedChild.id}`,
          item_name: title,
          item_list_id: relatedId,
          item_category: category,
          item_list_name: relatedName,
          item_variant: `${selectedChild.attributes[propsNames.tamano] || ''} / ${selectedChild.attributes[propsNames.alto] || ''} / ${selectedChild.attributes[propsNames.color] || ''}`.replace(/ \/  \/ /g, ' / ').replace(/ \/ $/, ''),
          price: selectedChild.price,
          quantity: 1
        }
        ]
      }

      const klaviyoATC = {
        $value: selectedChild.price,
        AddedItemProductName: title,
        AddedItemProductID: `${selectedChild.id}`,
        AddedItemSKU: `${selectedChild.sku}`,
        AddedItemCategories: [category],
        AddedItemImageURL: galleryImages && galleryImages[0],
        AddedItemURL: `https://calmessimple.com.ar${router.asPath}`,
        AddedItemPrice: selectedChild.price,
        AddedItemQuantity: quantity,
        ItemNames: [title],
        Items: [{
            ProductID: `${selectedChild.id}`,
            SKU: `${selectedChild.sku}`,
            ProductName: title,
            Quantity: quantity,
            ItemPrice: selectedChild.price,
            RowTotal: selectedChild.price,
            ProductURL: `https://calmessimple.com.ar${router.asPath}`,
            ImageURL: galleryImages && galleryImages[0],
            ProductCategories: [category]
          }
        ]
      }

      if (rPToATC.length > 0) {
        ATC.relatedItems = rPToATC;
      }

      klaviyoAddToCart(klaviyoATC)
      sendEvent("add_to_cart", ATC)
    }

    topPage()
    setRPToATC([])
    setHasSendATC(true)
    setTimeout(() => {
      setHasSendATC(false)
    }, 3000)
  }

  useEffect(() => {
      if (!stateLoading && modalPostal) {
          setModalPostal(false)
      }
  }, [stateLoading])

  const modalHandle = () => {
    setModalPostal((prevState) => !prevState)
  }

  const checkEDE = () => {
    if(idCPValidator && !feriaATCEnabled) {
      const element = document.getElementById('cpFeria');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: "end" });
      }
    } else {
      const hasEDE = cartData?.items.some((item) => item.id == getEdeId());
      if (dreamDelivery && checkboxEnsueno && !hasEDE) {
        modalHandle()
      } else if (!dreamDelivery || (dreamDelivery && !checkboxEnsueno) || hasEDE) {
        AddToCart()
      }
    }
  }

  useEffect(() => {
    if (selectedChild) {
      const viewItem = {
        currency: "ARS",
        value: selectedChild.price,
        items: [
        {
          item_id: `${selectedChild.sku}`,
          variant_id: `${selectedChild.id}`,
          item_name: title,
          item_list_id: relatedId,
          item_category: category,
          item_list_name: relatedName,
          item_variant: `${selectedChild.attributes[propsNames.tamano] || ''} / ${selectedChild.attributes[propsNames.alto] || ''} / ${selectedChild.attributes[propsNames.color] || ''}`.replace(/ \/  \/ /g, ' / ').replace(/ \/ $/, ''),
          price: selectedChild.price,
          quantity: 1
        }
        ]
      }

      const productKlaviyo= {
        ProductName: title,
        ProductID: `${selectedChild.id}`,
        SKU: `${selectedChild.sku}`,
        Categories: category,
        ImageURL: galleryImages && galleryImages[0],
        URL: `https://calmessimple.com.ar${router.asPath}`,
        Price: selectedChild.price,
      }

      sendEvent("view_item", viewItem)
      klaviyoViewedProduct(productKlaviyo)
    }
  }, [selectedChild])

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModal = (): void => {
    setIsModalOpen(prevState => !prevState);
  };

  return (
    <LandingContent>
        <Wrapper>
          <Breadcrumbs>
            <Text
              textTag="a"
              link={productURLRedirectionByEnv(`/${category
                .split(" ")
                .join("-")}`)}
              color="millionGray"
              font="extraBold"
            >
              {category}
            </Text>
            <Text textTag="span" color="millionGray">
              / {title}
            </Text>
          </Breadcrumbs>
        <SpanColumns>
          <LeftColumn>
            <GalleryWrapper>
              {galleryImages && (
                <>
                    <Carrousel
                      galleryCarrousel={{
                        images: galleryImages,
                        category: category,
                      }}
                      isSizechange={isSizechange}
                      isRenderSelected= {isRenderSelected}
                      color={selectedChild?.attributes[
                        propsNames.color as keyof typeof selectedChild.attributes
                      ]} 
                      isColorchange={isColorchange}
                      setIsSizeChange={setIsSizeChange}
                      hasRenders={ renders ? true : false}
                      renders={renders}
                      fatherLoader={setGalleryLoaded}
                      selectedChild={selectedChild}
                      idProd={idProd}
                      lcpImage={lcpImage}
                      render={render}
                      title={title}
                    />
                </>
              )}
            </GalleryWrapper>
       
            {
              isDesktop &&
              <>
                <div style={{ display: chatLoaded ? "block" : "none"}}>
                  <Chat id="notchatbot">
                    <div id="embedchatDesktop"></div>
                    <small id="notchatbot-disclaimer">*La información proporcionada tiene fines informativos y educativos únicamente. En ningún caso debe interpretarse como un sustituto de asesoramiento, diagnóstico o tratamiento médico profesional.</small>
                  </Chat>
                </div>
                
                <div style={{ height:"200px", display: chatLoaded ? "none" : "block"}}></div>

                <BannerAndCucarda 
                  isBanner 
                  category={category}
                  idProd={idProd}
                  isDesktop
                />
              </>
            }
          </LeftColumn>

          {
            (loadingRedirect) ? (
              <MainBlockLoaders />
             ) : (
            <RightColumn>
            {
              headPills &&
              <DivTitlePills>
                  <Pills
                    isCategoriesSection
                    color={headPills == "LANZAMIENTO" ||  headPills =="PREVENTA EXCLUSIVA" ? "yellowCalm" : "parkPicnic"}
                    backgroundColor={headPills == "LANZAMIENTO" ||  headPills =="PREVENTA EXCLUSIVA" ? "icedAlmond" : "wildCaribbeanGreen"}
                  >
                    {headPills}
                  </Pills>
                
                <Margin margin="0 3px" />
                {
                  SecondheadPills &&
                  <Pills
                    isCategoriesSection
                    color="yellowCalm"
                    backgroundColor="antiqueIvory"
                  >
                    {SecondheadPills}
                  </Pills>
                }
              </DivTitlePills>
            }

            <ProductTitleMainBlock
              title={title}
              description={description}
              isCombo={isCombo}
            />

            { render ? (
              skus &&
                <NuggetReview skus={skus} />
              ) : <SkeletonLoader width="200px" height="30px"/> 
            }

            {(selectedChild && discount && installments) && (
              <PricesVisor
                publishedPrice={price ?? 0}
                regularPrice={adjustedRegularPrice ?? 0}
                nrFees={category != "feria" ? installments : 1}
                isFeria={category == "feria"}
                category={category}
                tranferDiscount={tranferDiscount}
                pillIdSpecialOffer={pillIdSpecialOffer}
                idProd={idProd}
              />
            ) }

             <ProductProps
              children={children}
              setSelectedChild={setSelectedChild}
              stockAndPrices={stockAndPrices}
              selectedChild={selectedChild}
              hasRenders={renders ? true : false}
              setIsSizeChange={setIsSizeChange}
              category={category}
              defaultProds={defaultProds}
              setIsColorChange={setIsColorChange}
              idProd={idProd}
              onQuantityChange={handleQuantityChangeMuebles} 
            />
            
            {idProd != "1952731" ? (
              <Margin margin="10px 0 10px 0">
                <InformationShipping product={selectedChild}/>
              </Margin>
            ) : (
              <Margin margin="1rem 0">
                <Text color="millionGray" font="medium" fontSize="0.9em">
                  Hasta agotar stock
                </Text>
                <Text color="millionGray" font="medium" fontSize="0.9em">
                  Entrega a partir de 5 días hábiles
                </Text>
              </Margin>
            )}

          {selectedChild && (
              <>
                {displayFormStockout() && idProd && (
                  <FormStockOut tag={tagsData[idProd]} />
                )}
              </>
            )}

            {
              RPDouble && RPDouble?.length > 0 &&
                <RelatedProductsATC 
                relatedProductsATC={RPDouble}
                selectedChild={selectedChild}
                setRPToATC={setRPToATC}
                hasSendATC={hasSendATC}
                isDesktop={isDesktop}
                render={render}
                />
            }

            {
              hasQuantity &&
              <Margin margin="10px 0 0 0">
                <Text
                color="lead"
                font="medium"
                fontSize="14px"
                lineHeight="130%"
                letterSpacing="0.42px"
                >
                  Cantidad
                </Text>
              </Margin>
            }

             <AtcQuantity>
            {
              hasQuantity &&
              <DropdownContainer onClick={() => setIsQuantityOpen(prevState => !prevState)}  ref={dropdownRef}>
                <DropdownHeader>{quantity}</DropdownHeader>

                <Arrow $isOpen={isQuantityOpen}>
                  {ArrowQuantity()}
                </Arrow>

                {isQuantityOpen && (
                  <DropdownListContainer>
                    <DropdownList>
                      {options.map((option, index) => (
                        <ListItem 
                        key={option} 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuantityChange(option);
                        }}
                      
                        $isLast={index === 5}
                        $isFirst={index === 0}
                        >
                          {option}
                        </ListItem>
                      ))}
                    </DropdownList>
                  </DropdownListContainer>
                )}
              </DropdownContainer>
            }
              
           <ATCButton 
            id="atcButton"
            $hasQuantity={hasQuantity}
            > 
              <Button
                backgroundColor={idCPValidator
                ? (feriaATCEnabled && addToCartEnabled) ? "lead" : "stoneCold"
                : addToCartEnabled ? "lead" : "stoneCold"}
                backgroundColorHover={category === "feria"
                ? (feriaATCEnabled && addToCartEnabled) ? "offBlack" : "edgeOfBlack"
                : addToCartEnabled ? "offBlack" : "edgeOfBlack"}
                width="100%"
                borderRadius="641.649px"
                font="bold"
                height="60px"
                size="none"
                fontSize="1rem"
                textColor="white"
                disabled={!addToCartEnabled}
                onClick={checkEDE}
              >
                { (idCPValidator && !feriaATCEnabled) ?
                  "Ingresar CP" :(
                  addToCartEnabled && selectedChild ? (
                    stateLoading ?
                      <Spinner />
                    :
                    <ButtonInfo>
                      {!hasQuantity && Purchase()}
                      <Text
                      responsiveMobile={{
                        fontSize:".8rem"
                      }}
                      >
                        Añadir al carrito 
                      </Text>
                      <Text 
                      font="bold"
                      responsiveMobile={{
                        fontSize:".8rem"
                      }}
                      >
                        ${formatNumber(ATCprice)}
                      </Text>
                    </ButtonInfo>
                    ) : "Agotado")
                  }
                </Button>
              </ATCButton>
            </AtcQuantity>

            {
              galleryImages && selectedChild && !isComponentes && (
                <ATCFixed
                imageSrc={atcImage ?? galleryImages[0]}
                title={title}
                size={
                  variations_sizes[
                    selectedChild.attributes[
                      propsNames.tamano as keyof typeof selectedChild.attributes
                    ] as keyof typeof variations_sizes
                  ]
                }
                heightText={
                    selectedChild.attributes[
                      propsNames.alto as keyof typeof selectedChild.attributes
                    ]
                }
                colorText={
                  selectedChild.attributes[
                    propsNames.color as keyof typeof selectedChild.attributes
                  ]
                }
                publishedPrice={price ?? 0}
                regularPrice={adjustedRegularPrice ?? 0}
                ATC={checkEDE}
                nrFees={category != "feria" ? installments : 1}
                addToCartEnabled={idCPValidator ? (!feriaATCEnabled || !addToCartEnabled) : !addToCartEnabled}
                showATCButton={showATCButton}
                stateLoading={stateLoading}
                selectedChild={selectedChild}
                idProd={idProd}
                quantity={quantity}
                category={category}
                render={render}
                />
              )
            }

            <ContainerPaymentMethod>
              <DivShowText onClick={handleModal}>
                <Text color="millionGray" textDecoration="underline" fontSize="0.85rem" font="medium" textTag="span">
                  Ver todos los medios de pago.
                </Text>
              </DivShowText>

              <NewModal 
              isOpen={isModalOpen}
              onClose={handleModal}
              title=""
              maxWidth="700px"
              hideCloseButton
              >
               <PaymentModalInfo handleModal={handleModal} isFeria={category === "feria"}/>
              </NewModal>
              
              <PaymentCards/>
            </ContainerPaymentMethod>

            <MiniBannerMobile >
                <div style={{ display: chatLoaded ? "block" : "none"}}>
                  <Chat id="notchatbot">
                    <div id="embedchatMobile"></div>
                    <small id="notchatbot-disclaimer">*La información proporcionada tiene fines informativos y educativos únicamente. En ningún caso debe interpretarse como un sustituto de asesoramiento, diagnóstico o tratamiento médico profesional.</small>
                  </Chat>
                </div>
                            
                <div style={{ height:"200px", display: chatLoaded ? "none" : "block"}}></div>
            </MiniBannerMobile>

            {
              idProd === "1835538" &&
              <Adopt>
                <Text
                font="miniBold"
                fontSize="1.2rem"
                align="center"
                >
                  ¿Estas pensando en tener una mascota?
                </Text>

                <AdoptButton href="https://www.instagram.com/pichichosalrescate/?hl=es" target="_black">
                  <ButtonInfo>
                      {Dog()} Adoptá un pichicho hoy
                  </ButtonInfo>
                </AdoptButton>
              </Adopt>
            }
          </RightColumn>
          )}

          {
            !isDesktop &&
              <BannerAndCucarda 
              isBanner 
              category={category}
              render={render}
              idProd={idProd}
          />
         }
        </SpanColumns> 
      </Wrapper>

      {/* <ShelfConfigurator
        images={{
          normal: {
            alta: 'https://imagedelivery.net/7yveHullsFjmXtPLdJPFsg/9c9262f5-ae17-46e2-ce22-6df0f5433300/fit=cover',
            media: 'https://imagedelivery.net/7yveHullsFjmXtPLdJPFsg/1ea0c8f8-bd5f-45fb-78f8-769183a4d000/fit=cover',
            baja: 'https://imagedelivery.net/7yveHullsFjmXtPLdJPFsg/fc5fc15a-c90b-4c35-a6c6-cef200227000/fit=cover'
          },
          cabene: {
            alta: 'https://imagedelivery.net/7yveHullsFjmXtPLdJPFsg/9574e6cd-3065-4ee3-5844-190164cb0100/fit=cover',
            media: 'https://imagedelivery.net/7yveHullsFjmXtPLdJPFsg/b76a4bc2-5ea7-4d1f-1aa6-be0806509e00/fit=cover',
            baja: 'https://imagedelivery.net/7yveHullsFjmXtPLdJPFsg/d09afe8e-fe07-4c01-e415-4f62e28eb500/fit=cover'
          },
          cabeneAbierta: {
            alta: 'https://imagedelivery.net/7yveHullsFjmXtPLdJPFsg/45279483-a5d6-4989-8a49-5c08bfb71100/fit=cover',
            media: 'https://imagedelivery.net/7yveHullsFjmXtPLdJPFsg/899c6d7b-4ce4-4892-95ca-178d0f216a00/fit=cover',
            baja: 'https://imagedelivery.net/7yveHullsFjmXtPLdJPFsg/b8bf07a5-553e-4c36-b127-ac1a8e262400/fit=cover'
          }
        }}
      /> */}
    </LandingContent>
  )
}

export default MainBlock;
