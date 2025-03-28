import Text from "@/components/Atoms/Typography/Text"
import Images from "@/components/Atoms/Images/Images"
import Button from "@/components/Atoms/Buttons/Button"
import { DivCoupon, LiCoupon } from "./styled"
import { ListCouponsProps } from "./types"
import { onRemoveCouponFromCart } from "@/state/cart/cartActions"
import { formatNumber } from "@/utils/formatPrices"
import { useDispatch } from "react-redux"

const ListCoupons = ({
  couponsArray,
  disabled,
  checkoutOnlyToPay,
  deleteCuponIcon
}: ListCouponsProps) => {
  const dispatch = useDispatch()

  const removeCoupon = (code: string) => {
    dispatch(onRemoveCouponFromCart(code))
  }

  return !couponsArray.coupons
    ? null
    : couponsArray.coupons.map((coupon) => (
        <LiCoupon key={coupon.code}>
          <DivCoupon>
            <Text textTag="span" color="white" fontSize="0.8rem" align="center">
              {coupon.code.toUpperCase()}
            </Text>

            {
            coupon.totals.total_discount !== "0" && !checkoutOnlyToPay && (
              <Button
                size="none"
                disabled={disabled}
                title={`Borrar cupón ${coupon.code}`}
                aria-label={`Borrar cupón ${coupon.code}`}
                onClick={() => removeCoupon(coupon.code)}
              >
                <Images
                  src={deleteCuponIcon}
                  alt="Borrar cupón"
                  width="0.75rem"
                  height="0.75rem"
                  responsiveMobile={{
                    width: "0.75rem",
                    height: "0.75rem"
                  }}
                  isLazy
                />
              </Button>
            )}
          </DivCoupon>

          {coupon.totals.total_discount !== "0" && (
            <Text fontSize="1.1rem" color="parkPicnic" font="bold">
              - ${formatNumber(parseFloat(coupon.totals.total_discount))}
            </Text>
          )}
        </LiCoupon>
      ))
}

export default ListCoupons
