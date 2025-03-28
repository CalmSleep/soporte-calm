import { theme } from "@/utils/Theme"
import { Dispatch, SetStateAction } from "react"

type ThemeColors = keyof typeof theme.colors

export type PillsProps = {
  children?: React.ReactNode
  textNew?: boolean
  isRelatedProducts?: boolean
  isCategoriesSection?: boolean
  isFeatureProduct?: boolean
  categoryPill?: string
  isOfferProduct?: boolean
  backgroundColor?: ThemeColors
  color?: ThemeColors
  isAbsolute?: boolean
  isTab?: boolean
  isFeria?: boolean
  notAbsolute?: boolean
  isProduct?: boolean
  fromCart?: boolean
  isCategoryComparition?: boolean
  pillsLoaded?: Dispatch<SetStateAction<boolean>>
  borderRadius?: string
}

export type PillStyledProps = {
  $textNew?: boolean
  $isCategoryComparition?: boolean
  $isRelatedProducts?: boolean
  $isCategoriesSection?: boolean
  $isFeatureProduct?: boolean
  $backgroundColor?: ThemeColors
  $isAbsolute?: boolean
  $isTab?: boolean
  $notAbsolute?: boolean
  $fromCart?: boolean
  $borderRadius?: string
}

export type IPillData = {
  texto: string;
  categoria?: string;
  colorFondo: {
    hex: string
  }
}
