import Spinner from "../../../Atoms/Spinner/Spinner"
import { ButtonContainer, DivQuantity } from "./styled"
import { IProps } from "./types"
import { getHasEDE } from "@/state/cart/cartSelector"
import { useSelector } from "react-redux"
import { getLoadingPay } from "@/state/loading/loadingSelector"
import { getCheckoutOnlyToPay } from "@/state/order/orderSelector"
import { IStore } from "@/state/types"
import Text from "@/components/Atoms/Typography/Text"
import Button from "@/components/Atoms/Buttons/Button"

const CounterQty = ({
  qtyMax,
  quantity,
  backorder,
  updateItem,
  isChange,
  isDelete,
  isCpCalc,
  isAddCoupon,
  fromCheckout
}: IProps) => {
  const checkoutOnlyToPay = useSelector((state: IStore) =>
    getCheckoutOnlyToPay(state)
  )
  const hasEDE = useSelector(getHasEDE)
  const loadingPay = useSelector(getLoadingPay)

  const addOne = () => {
    if (backorder) {
      const newCounter = quantity + 1
      updateItem(newCounter)
    } else {
      if (quantity < qtyMax && qtyMax > 0) {
        const newCounter = quantity + 1
        updateItem(newCounter)
      }
    }
  }

  const subtractOne = () => {
    if (quantity > 0 && qtyMax > 0) {
      const newCounter = quantity - 1
      updateItem(newCounter)
    }
  }

  const disabledSum = (): boolean => {
    if (backorder) {
      return false
    }

    return quantity === qtyMax || qtyMax <= 0 ? true : false
  }

  return (
    <>
      {!checkoutOnlyToPay ? (
        isCpCalc || isDelete || isChange || isAddCoupon ? (
          <ButtonContainer>
            <Button aria-label="Eliminar una unidad del producto" disabled>
              <Text font="medium" fontSize="1rem">
                -
              </Text>
            </Button>
            <Spinner isBlack />
            <Button aria-label="Agregar una unidad del producto" disabled>
              <Text font="medium" fontSize="1rem">
                +
              </Text>
            </Button>
          </ButtonContainer>
        ) : (
          <ButtonContainer>
            {!fromCheckout && (
              <Button
                aria-label="Eliminar una unidad del producto"
                onClick={subtractOne}
                disabled={
                  quantity > qtyMax ||
                  qtyMax <= 0 ||
                  quantity <= 0 ||
                  loadingPay
                }
              >
                <Text font="medium" fontSize="1rem">
                  -
                </Text>
              </Button>
            )}
            <DivQuantity>
              <Text font="medium" fontSize="1rem" align="center">
                {quantity}
              </Text>
            </DivQuantity>

            {!fromCheckout && (
              <Button
                aria-label="Agregar una unidad del producto"
                onClick={addOne}
                disabled={disabledSum() || hasEDE || loadingPay}
              >
                <Text font="medium" fontSize="1rem">
                  +
                </Text>
              </Button>
            )}
          </ButtonContainer>
        )
      ) : (
        <DivQuantity>
          <Text>{quantity}</Text>
        </DivQuantity>
      )}
    </>
  )
}

export default CounterQty
