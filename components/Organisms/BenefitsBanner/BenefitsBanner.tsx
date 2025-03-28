import BenefitsBannerCarousel from "../BenefitsBannerCarousel/BenefitsBannerCarousel"
import { Wrapper } from "./styled"
import { useRouter } from "next/router"

const BenefitsBanner = () => {
  const router = useRouter()
  const { asPath } = router;
  const isSixCuotas = /bb|perros|almohada|edredon|tusor|sabanas|protector|habito|mueble/i.test(asPath);

  const items = [
    {
      icon:"NavbarMoon",
      text:"30 noches de prueba"
    },
    {
      icon:"NavbarCamion",
      text:"Envío gratis"
    },
    {
      icon:"NavbarHand",
      text: isSixCuotas ? "6 cuotas sin interés" : "12 cuotas sin interés"
    },
    {
      icon:"NavbarMoney",
      text: isSixCuotas ? "10% Off extra con transferencia" : "25% Off extra con transferencia"
    },
  ]
  
  return (
    <Wrapper>
      <BenefitsBannerCarousel
        items={items}
      />
    </Wrapper>
  )
}

export default BenefitsBanner
