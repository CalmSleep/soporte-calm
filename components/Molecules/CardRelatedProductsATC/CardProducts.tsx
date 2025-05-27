import {
  Container,
  InfoContainer,
  StyledImageContainer,
  Wrapper,
} from "./styled";
import Images from "@/components/Atoms/Images/Images";
import Margin from "@/components/Atoms/Spacing/Margin/Margin";
import Text from "@/components/Atoms/Typography/Text";
import { atrrToRender, searchAttribute } from "@/utils/productsFunctios";
import { useEffect, useState } from "react";
import { IProps } from "./types";
import { formatNumber } from "@/utils/formatPrices";
import SelectorColor from "../SelectorAttributes/SelectorColor";
import variations_sizes from "@/utils/variations_sizes";
import SkeletonLoader from "@/components/Atoms/SkeletonLoader/SkeletonLoader";
import ShelfBuilder from "../ShelfBuilder/ShelfBuilder";

const CardProducts = ({
  image,
  name,
  description,
  shelfConfigurations,
  propsNames,
  idProduct,
}: IProps) => {
  return (
    <>
      <Container>
        <Wrapper>
          <StyledImageContainer>
            {idProduct === 2411459 ? (
              <ShelfBuilder
                shelfConfigurations={shelfConfigurations}
                maxRows={1}
                maxColumns={1}
                propsNames={propsNames}
              />
            ) : (
              <Images
                src={image || ""}
                alt={image + "producto relacionado"}
                borderRadius="12.583px"
                width="100%"
                height="100%"
                objectFit="contain"
              />
            )}
          </StyledImageContainer>

          <InfoContainer>
            <Text
              font="bold"
              color="lead"
              fontSize="17px"
              letterSpacing="-0.6px"
              lineHeight="130%"
              responsiveMobile={{
                fontSize: "14px",
              }}
            >
              {name}
            </Text>
            <Margin margin=".3rem" />
            <Text
              //color="brilliantLiquorice"
              font="regular"
              fontSize="14px"
              lineHeight="130%"
              letterSpacing="-0.48px"
              responsiveMobile={{
                fontSize: "12px",
              }}
            >
              {description}
            </Text>
          </InfoContainer>
        </Wrapper>
      </Container>
    </>
  );
};

export default CardProducts;
