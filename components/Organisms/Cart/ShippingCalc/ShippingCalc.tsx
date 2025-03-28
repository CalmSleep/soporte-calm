import {
  DeliverDate,
  DivCalcCP,
  DivError,
  DivShippingCalc,
  DivShippingText,
  Shipping
} from "./styled"
import { useState } from "react"
import { postCodeValid } from "@/utils/PostCodeValidator"
import { formatNumber } from "@/utils/formatPrices"
import { useDispatch, useSelector } from "react-redux"
import { onGetShippingTime } from "@/state/products/productsActions"
import { getSKUsCommaSeparated } from "@/state/cart/cartSelector"
import useCalculateShipping from "@/utils/calculateShipping"
import Spinner from "@/components/Atoms/Spinner/Spinner"
import Button from "@/components/Atoms/Buttons/Button"
import Input from "@/components/Atoms/Input/Input"
import Text from "@/components/Atoms/Typography/Text"
import Images from "@/components/Atoms/Images/Images"
import Margin from "@/components/Atoms/Spacing/Margin/Margin"

interface IProps {
  updateShipping: (postcode: string) => void
  totalShipping?: string | number
  isCpCalc?: boolean
}

export const ShippingCalc = ({
  updateShipping,
  totalShipping,
  isCpCalc
}: IProps) => {
  const dispatch = useDispatch()
  const [showShippingCalc, setShowShippingCalc] = useState(false)
  const [postcode, setPostcode] = useState("")
  const [err, setErr] = useState("")
  const skus = useSelector(getSKUsCommaSeparated)
  const [message, setMessage] = useCalculateShipping()

  const onClickShowShippingCalc = () => setShowShippingCalc(!showShippingCalc)

  const onUpdateShipping = () => {
    if (postCodeValid(postcode)) {
      updateShipping(postcode)
      if (skus) {
        dispatch(onGetShippingTime(postcode, skus))
      }
    } else {
      setErr("Ingresá un código postal válido")

      setTimeout(() => {
        setErr("")
      }, 3000)
    }
  }

  const showShippingCalcSection = () => {
    return (
      showShippingCalc && (
        <DivCalcCP>
          {isCpCalc ? (
            <>
              <Margin margin="0.5rem 0 0 0">
                <Input
                  type="number"
                  placeholder="cód. postal..."
                  aria-label="Escribí tu código postal"
                  disabled
                />
              </Margin>
              <Margin margin="0.5rem 0 0 0">
                <Button
                  size="xsmall"
                  borderRadius="6px"
                  borderColor="millionGray"
                  backgroundColor="millionGray"
                  title="Calcular costo de envío"
                  aria-label="Calcular costo de envío"
                  disabled
                >
                  <Spinner />
                </Button>
              </Margin>

              <DivError showErr={err ? true : false}>
                <Text fontSize="0.8rem" color="rareRed">
                  {err}
                </Text>
              </DivError>
            </>
          ) : (
            <>
              <Margin margin="0.5rem 0 0 0">
                <Input
                  type="number"
                  placeholder="cód. postal..."
                  aria-label="Escribí tu cóodigo postal"
                  onChange={(e) => setPostcode(e.target.value)}
                />
              </Margin>
              <Margin margin="0.5rem 0 0 0">
                <Button
                  size="xsmall"
                  borderRadius="6px"
                  borderColor="millionGray"
                  backgroundColor="millionGray"
                  title="Calcular costo de envío"
                  aria-label="Calcular costo de envío"
                  onClick={onUpdateShipping}
                >
                  <Text
                    fontSize="0.6rem"
                    font="extraBold"
                    letterSpacing="1.5px"
                    color="white"
                  >
                    Calcular
                  </Text>
                </Button>
              </Margin>

              {message.flag && (
                <DeliverDate>
                  <Text fontSize="0.8rem" color="parkPicnic" font="extraBold">
                    {message.response}
                  </Text>
                </DeliverDate>
              )}
              <DivError showErr={err ? true : false}>
                <Text fontSize="0.8rem" color="rareRed">
                  {err}
                </Text>
              </DivError>
            </>
          )}
        </DivCalcCP>
      )
    )
  }

  return (
    <Shipping>
      <DivShippingCalc>
        <Text font="bold">Envío</Text>
        <Button
          size="none"
          onClick={onClickShowShippingCalc}
          title="Calcular costo de envío"
          aria-label="Calcular costo de envío"
        >
          <Images
            src="https://imagedelivery.net/7yveHullsFjmXtPLdJPFsg/0763ec49-0769-4464-c1b9-8772bbb2fb00/fit=cover"
            alt="Icono lápiz"
            width="auto"
            isLazy
          />
        </Button>
      </DivShippingCalc>

      {showShippingCalcSection()}

      <DivShippingText>
        <Text font="bold">
          {totalShipping !== "0"
            ? "$" + formatNumber(totalShipping as number)
            : "GRATIS"}
        </Text>
      </DivShippingText>
    </Shipping>
  )
}

export default ShippingCalc
