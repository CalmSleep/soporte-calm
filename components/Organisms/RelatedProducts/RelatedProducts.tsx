import { productURLRedirectionById } from "@/utils/productURLById"
import {
  DivRest,
  DivRestMobile,
  DivAlwaysScroll,
  DivScroll,
  DivTitle,
  DivCategoriesMobile,
  DivCategories,
  DivTitleAndCards
} from "./styled"
import { RelatedProductsProps } from "./types"
import RelatedCard from "@/components/Molecules/RelatedCard/RelatedCard"
import Text from "@/components/Atoms/Typography/Text"
import Titles from "@/components/Atoms/Typography/Titles"
import Margin from "@/components/Atoms/Spacing/Margin/Margin"
import { SkeletonLoader } from "@/components/Molecules/SkeletonLoader/SkeletonLoader"

const RelatedProducts = ({
  relatedItems,
  title = "",
  boldTitle = "",
  isYellowTitle,
  isMobile,
  fromCart,
  fromProduct,
  isForLCP,
  render,
  isHome
}: RelatedProductsProps) => {

  return (
    <>
        <DivRestMobile $isMobile={isMobile}>
          {title !== "" && (
            <DivTitle>
              <Margin margin="0 0 0 0.4rem" />
              <Titles
                titleTag={isHome ? "h2" : "h3"}
                fontSize="1.5em"
                font="bold"
                align="left"
                hasStrong
                color={isYellowTitle ? "yellowCalm" : "offBlack"}
              >
                {title} <b>{boldTitle}</b>
              </Titles>
            </DivTitle>
          )}

          <DivAlwaysScroll>
            <DivCategoriesMobile $fromCart={fromCart}>
              {relatedItems && (isForLCP ? render : true) ?
                relatedItems.map((Item) => (
                  fromCart ? (
                   ((Item.stock ? Item.stock > 0 : true) || Item.backorder) &&
                  <RelatedCard
                    key={Item.name}
                    id_item={Item.id_prod}
                    fromCart={fromCart}
                    img={Item.image}
                    name={fromCart ? Item.name_parent : Item.name}
                    price={Item.price ? Item.price : 0}
                    regular_price={Item.regular_price ? Item.regular_price : 0}
                    variations={Item.attributes}
                    link={productURLRedirectionById(
                      fromCart ? Item.id_parent : Item.id_prod
                    )}
                    category={Item.category}
                  />)
                  : <RelatedCard
                    key={Item.name}
                    id_item={Item.id_prod}
                    fromCart={fromCart}
                    img={Item.image}
                    name={fromCart ? Item.name_parent : Item.name}
                    price={Item.price ? Item.price : 0}
                    regular_price={Item.regular_price ? Item.regular_price : 0}
                    variations={Item.attributes}
                    link={productURLRedirectionById(
                      fromCart ? Item.id_parent : Item.id_prod
                    )}
                    category={Item.category}
                  /> )) : <>
                    <Margin margin="0.4rem">
                      <SkeletonLoader  width="270px" height="250px" borderRadius="10px"/>
                    </Margin>
                    <Margin margin="0.4rem">
                      <SkeletonLoader  width="270px" height="250px" borderRadius="10px"/>
                    </Margin>
                    <Margin margin="0.4rem">
                      <SkeletonLoader  width="270px" height="250px" borderRadius="10px"/>
                    </Margin>
                    <Margin margin="0.4rem">
                      <SkeletonLoader  width="270px" height="250px" borderRadius="10px"/>
                    </Margin>
                  </>
                }
            </DivCategoriesMobile>
          </DivAlwaysScroll>
        </DivRestMobile>

        <DivRest $fromProduct={fromProduct} $isMobile={isMobile}>
          <DivTitleAndCards>
            <DivTitle>
              <Margin margin="0 0 0 0.4rem" />
              <Titles
                titleTag={isHome ? "h2" : "h3"}
                fontSize="1.5em"
                font="bold"
                align="left"
                hasStrong
                color={isYellowTitle ? "yellowCalm" : "offBlack"}
              >
                {title} <b>{boldTitle}</b>
              </Titles>
            </DivTitle>
            <DivScroll>
              <DivCategories>
                {relatedItems && (isForLCP ? render : true) ? 
                  relatedItems.map((Item) => (
                    fromCart ? (
                    ((Item.stock ? Item.stock > 0 : true) || Item.backorder) && /* probar */
                    <RelatedCard
                      key={Item.name}
                      fromCart={fromCart}
                      img={Item.image}
                      name={Item.name}
                      price={Item.price ? Item.price : 0}
                      regular_price={
                        Item.regular_price ? Item.regular_price : 0
                      }
                      variations={Item.attributes}
                      link={productURLRedirectionById(Item.id_prod)}
                      category={Item.category}
                    />
                  ) : <RelatedCard
                        key={Item.name}
                        fromCart={fromCart}
                        img={Item.image}
                        name={Item.name}
                        price={Item.price ? Item.price : 0}
                        regular_price={
                          Item.regular_price ? Item.regular_price : 0
                        }
                        variations={Item.attributes}
                        link={productURLRedirectionById(Item.id_prod)}
                        category={Item.category}
                      />
                    )) : <>
                      <Margin margin="0.4rem">
                        <SkeletonLoader  width="270px" height="250px" borderRadius="10px" responsiveMobile={{ height:"600px"}}/>
                      </Margin>
                      <Margin margin="0.4rem">
                        <SkeletonLoader  width="270px" height="250px" borderRadius="10px" responsiveMobile={{ height:"600px"}}/>
                      </Margin>
                      <Margin margin="0.4rem">
                        <SkeletonLoader  width="270px" height="250px" borderRadius="10px" responsiveMobile={{ height:"600px"}}/>
                      </Margin>
                      <Margin margin="0.4rem">
                        <SkeletonLoader  width="270px" height="250px" borderRadius="10px" responsiveMobile={{ height:"600px"}}/>
                      </Margin> 
                </>
                }
              </DivCategories>
            </DivScroll>
          </DivTitleAndCards>
        </DivRest>
    </>
  )
}

export default RelatedProducts
