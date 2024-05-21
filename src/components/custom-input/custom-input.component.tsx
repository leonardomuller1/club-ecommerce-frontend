import React, { forwardRef, InputHTMLAttributes } from 'react'

// Styles
import { CustomInputContainer } from './custom-input.styles'

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ hasError, ...props }, ref) => {
    return <CustomInputContainer {...props} ref={ref} hasError={hasError} />
  }
)

CustomInput.displayName = 'CustomInput'

export default CustomInput
