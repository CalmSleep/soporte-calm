export type CartProps = {
  isOpen: boolean | (() => void)
  openCart: () => void
  closeCart: () => void
  puntoLocalm?: boolean
}
