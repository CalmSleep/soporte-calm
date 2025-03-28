import Text from "@/components/Atoms/Typography/Text"
import { IProps } from "./types"
import { Container } from "./styled"

const Countdown = ({ text, number, isBannerPromos }: IProps) => {

  return (
    <Container $isBannerPromos={isBannerPromos} >
      <Text 
      textTag="span" 
      font={isBannerPromos ? "miniBold" : "extraBold"}  
      fontSize={isBannerPromos ? "19px" : "1em"} 
      color={isBannerPromos ? "brilliantLiquorice" : "white"}
      align="center" 
      letterSpacing={isBannerPromos ? "-0.72px" : "1px"}
      responsiveMobile={{ 
        fontSize:isBannerPromos ? "16px" : ".8em"
      }}
      >
        {number}
      </Text>
      <Text 
      textTag="span" 
      font={isBannerPromos ? "miniBold" : "light"} 
      fontSize={isBannerPromos ? "17px" : "1em"} 
      color={isBannerPromos ? "brilliantLiquorice" : "white"}
      align="center"  
      responsiveMobile={{ 
        fontSize:isBannerPromos ? "14px" : ".8em"
      }}
      >
        {text}
      </Text>
    </Container>

  );
};

export default Countdown;
