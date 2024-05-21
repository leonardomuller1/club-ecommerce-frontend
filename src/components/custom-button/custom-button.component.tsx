import { FunctionComponent, ButtonHTMLAttributes } from 'react'

import { CustomButtonContainer, IconContainer } from './custom-button.styles'

// Definir o tipo das props
interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string
  startIcon?: React.ReactNode
}

const CustomButton: FunctionComponent<CustomButtonProps> = ({
  children,
  startIcon,
  ...rest
}) => {
  return (
    <CustomButtonContainer {...rest}>
      {startIcon && <IconContainer>{startIcon}</IconContainer>}
      {children}
    </CustomButtonContainer>
  )
}

export default CustomButton
