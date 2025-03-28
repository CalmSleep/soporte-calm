import { ReactNode } from "react"
import { ThemeProvider } from "styled-components"
//Go to:
//https://colornamer.robertcooper.me/
//To get color names
export const theme = {
  colors: {
    transparentCalm: "transparent",
    yellowCalm: "#F5A203",
    decorYellow: "#FABD00",
    fulvous: "#e28303",
    white: "#FFFFFF",
    black: "#000000",
    offBlack: "#303030",
    dullViolet: "#823f90",
    explosiveGray: "#c4c4c4",
    coldMorning: "#e5e5e5",
    millionGray: "#999",
    carbon: "#333",
    blackOut: "#222",
    lynxWhite: "#f6f7f8",
    superSilver: "#eee",
    steam: "#ddd",
    thamarBlack: "#191919",
    fadingHorizon: "#8f4f9a",
    darkerFadingHorizon: "#764180",
    parkPicnic: "#40914D",
    mangoTango: "#FC8042",
    liberty: "#4F5098",
    darkerLiberty: "#3f4079",
    lead: "#202020",
    drWhite: "#FAFAFA",
    wildViolet: "#631f99",
    darkerWildViolet: "#4f187a",
    steel: "#7A7A7A",
    auberginePearl: "#5900AC",
    aswadBlack: "#19191C",
    viciousViolet: "#8F4F9A",
    rareRed: "#DE1135",
    kinglyCloud: "#DFDFDF",
    ZZBPearl: "#F8F8F8",
    illuminatiGreen: "#449569",
    northernBarrensDust: "#E0723B",
    weldedIron: "#6E6E6E",
    elegantPurpleGown: "#5a2263",
    electricIndigo: "#5700FF",
    darkerYellowCalm: "#E2982C",
    beluga: "#F1F1F1",
    argent: "#888",
    stoneCold: "#555",
    brilliance: "#FDFDFD",
    whiteSmoke: "#F5F5F5",
    edgeOfBlack: "#54595F",
    lightAswadBlack: "#19191C0D",
    bleuDeFrance: "#368cf0",
    lightOffBlack: "#303030D6",
    snowFlake: "#F0F0F0",
    onlineLime: "#40913d",
    perfumeHaze: "#F4ECF5",
    wildCaribbeanGreen: "#CBDFCE",
    antiqueIvory: "#F9ECD4",
    shadeOfViolet: "#7600b4",
    vividAmber: "#ce9a00",
    auberginePerl: "#5700aa",
    lightHouse: "#f4f4f4",
    marsh: "#5c5339",
    darkGrey: "#363636",
    tangledWeb: "#B2B2B2",
    madForMango: "#F5A203",
    zhenZhuBaiPearl: "#F8F8F8",
    vanadylBlue: "#009EE2",
    orochimaru: "#D9D9D9",
    harvestEveGold: "#dc9102",
    hawaiianTiLead: "#1F732C",
    whiteEdgar: "#EDEDED",
    christmasSilver: "#e0e0e0",
    garnish: "#1F9950",
    snowBank: "#E9E9E9",
    auberginnePerl: "#5906AC",
    blazeOrange: "#FA6400",
    brilliantLiquorice: "#545454",
    orangePop: "#FFBC3A",
    workoutRoutine: "#FFD78B",
    starshipTrooper : "#1F9966",
    paternoster: "#C7C7C7",
    icedAlmond: "#FEF3DE",
    greenGrass: "#398245",
    violaSororia: "#B7A7BA",
    childOfTheMoon: "#C98B36",
    marshyGreen: "#8C712D",
    chiliConCarne: "#9B5A2D",
    slickMud: "#A56F47",
    crstalCut: "#FAF5ED"

  },
  fonts: {
    regular: 'var(--font-vietnam-pro); font-weight: 400;',
    medium: 'var(--font-vietnam-pro); font-weight: 500;',
    miniBold: 'var(--font-vietnam-pro); font-weight: 600;',
    bold: 'var(--font-vietnam-pro); font-weight: 700;',
    extraBold: 'var(--font-vietnam-pro); font-weight: 800;',
    light: 'var(--font-vietnam-pro); font-weight: 300;',
  },
  devices: {
    smallMobile: "(max-width: 360px)",
    smallTablet: "(max-width: 520px)",
    mobile: "(max-width: 768px)",
    bigTablet: "(max-width: 800px)",
    biggerMobile: "(max-width: 1024px)",
    middleResolutionDesktop: "(min-width: 1350px)",
    bigMiddleDesktop: "(min-width: 1600px)",
    bigResolutionDesktop: "(min-width: 1900px)"
  }
}

export const deviceSizes = {
  smallMobile: 360,
  smallTablet: 520,
  mobile: 768,
  bigTablet: 800,
  biggerMobile: 1024,
  middleResolutionDesktop: 1350,
  bigResolutionDesktop: 1900
}

const Theme = ({ children }: { children: ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)

export default Theme

/* fonts: {
  regular: "Gilroy-Regular",
  medium: "Gilroy-Medium",
  bold: "Gilroy-Bold",
  extraBold: "Gilroy-ExtraBold",
  light: "Gilroy-Light"
}, */
