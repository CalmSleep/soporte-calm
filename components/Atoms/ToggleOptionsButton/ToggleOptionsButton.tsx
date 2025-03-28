import { ReactNode } from 'react'
import { StyledButton } from './styled'
import Text from "@/components/Atoms/Typography/Text"
import { theme } from "@/utils/Theme";

type ThemeColors = keyof typeof theme.colors;

interface IProps {
  children: ReactNode
  activeCondition: boolean
  innerText: string
  chevron?: boolean
  action: () => void
  disabled?: boolean
  borderColor?:ThemeColors
}
export default function ToggleOptionsButton({
  children,
  activeCondition,
  innerText,
  action,
  chevron = true,
  disabled,
  borderColor
}: IProps) {
  return (
    <StyledButton
      $borderColor={borderColor}
      $active={activeCondition}
      onClick={action}
      role="select"
      type="button"
      disabled={disabled}
    >
      {children}
      <Text fontSize='0.9rem'>{innerText}</Text>
      {chevron && (
        <svg
          width="10"
          height="10"
          viewBox="0 0 18 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.99997 7.25342L15.8936 0.358879L15.8936 0.358874C16.0544 0.19805 16.2725 0.107701 16.5 0.107701C16.7274 0.107701 16.9455 0.19805 17.1064 0.358874C17.2672 0.519698 17.3575 0.737822 17.3575 0.965261C17.3575 1.1927 17.2672 1.41082 17.1064 1.57165L9.60639 9.07161C9.60638 9.07162 9.60637 9.07163 9.60635 9.07165C9.52676 9.15132 9.43224 9.21453 9.3282 9.25766C9.22414 9.30079 9.11261 9.32299 8.99997 9.32299C8.88732 9.32299 8.77579 9.30079 8.67173 9.25766C8.56769 9.21453 8.47317 9.15132 8.39358 9.07165C8.39356 9.07163 8.39355 9.07162 8.39354 9.07161L0.893576 1.57165C0.813946 1.49202 0.750778 1.39748 0.707682 1.29344C0.664585 1.18939 0.642403 1.07788 0.642403 0.965262C0.642403 0.852645 0.664585 0.741131 0.707682 0.637088C0.750778 0.533044 0.813946 0.438508 0.893576 0.358876C0.973209 0.279243 1.06775 0.216076 1.17179 0.17298C1.27583 0.129883 1.38735 0.107702 1.49996 0.107702C1.61258 0.107702 1.72409 0.129883 1.82814 0.17298C1.93218 0.216076 2.02672 0.279243 2.10635 0.358875L2.10636 0.35888L8.99997 7.25342Z"
            fill="#303030"
            stroke="#303030"
            strokeWidth="0.214286"
          />
        </svg>
      )}
    </StyledButton>
  )
}
