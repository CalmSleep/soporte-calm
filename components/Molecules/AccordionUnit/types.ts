import { TypographyProps } from "@/components/Atoms/Typography/types";
import React, { RefObject } from "react";

export interface IUnitProps {
  onClick: () => void;
  itemName: string;
  itemContent?: string;
  itemsSelect?: React.ReactNode;
  itemSubtitle?: string;
  isActive?: boolean;
  isLastUnit?: boolean;
  isProductSS?: boolean;
  isOrange?: boolean;
  isFromCapas?: boolean;
  IconComponent?: "" | (() => JSX.Element) | undefined;
  hasModal?: boolean;
  onClickModal?: () => void;
  imageSpecsCamaOla?: string;
  descriptionCamaOla?: boolean;
  backgroundColor?: string;
  isCheckActive?: boolean;
  refContent?:
    | React.RefObject<HTMLDivElement>
    | ((el: HTMLDivElement | null) => void);
  contentHeight?: number;
  titleStyle?: TypographyProps;
}
