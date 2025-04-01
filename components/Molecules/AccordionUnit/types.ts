export interface IUnitProps {
    onClick: () => void
    itemName: string
    itemContent: string
    itemSubtitle?: string
    isActive?: boolean
    isLastUnit?: boolean
    isProductSS?: boolean
    isOrange?: boolean
    isFromCapas?: boolean
    IconComponent?: "" | (() => JSX.Element) | undefined
    hasModal?: boolean
    onClickModal?: () => void
    imageSpecsCamaOla?: string
    descriptionCamaOla?: boolean
}