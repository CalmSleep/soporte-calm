export interface IProps {
    qtyMax: number;
    quantity: number;
    backorder: boolean;
    updateItem: (quantity: number) => void;
    isChange: boolean | undefined;
    isDelete: boolean | undefined;
    isCpCalc: boolean | undefined;
    isAddCoupon: boolean | undefined;
    fromCheckout?: boolean;
}