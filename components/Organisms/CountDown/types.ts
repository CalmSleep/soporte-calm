export interface IProps {
    endPromotionDate:  Date
    isHeadbanner?: boolean
    isBannerPromos?: boolean
  }

export interface CountdownState {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
}

export interface CountdownStyles {
  $show?: boolean
  $isHeadbanner?: boolean
  $isBannerPromos?: boolean
}