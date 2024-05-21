import React from 'react'
import { BsGoogle } from 'react-icons/bs'
import { FiLogIn } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import { isEmail } from 'validator'

// components
import Header from '../../components/header/header.component'
import CustomButton from '../../components/custom-button/custom-button.component'
import CustomInput from '../../components/custom-input/custom-input.component'
import InputErrorMessage from '../../components/input-error-message/input-error-message.component'

// styles
import {
  LoginContainer,
  LoginContent,
  LoginHeadline,
  LoginInputContainer,
  LoginSubtitle
} from './login.styles'

interface LoginForm {
  email: string
  password: string
}

const LoginPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<LoginForm>()

  const handleSubmitPress = (data: any) => {
    console.log({ data })
  }

  return (
    <>
      <Header />

      <LoginContainer>
        <LoginContent>
          <LoginHeadline>Entre com a sua conta</LoginHeadline>
          <CustomButton startIcon={<BsGoogle size={18} />}>
            Entrar com o Google
          </CustomButton>
          <LoginSubtitle>ou entre com o seu e-mail</LoginSubtitle>
          <LoginInputContainer>
            <p>E-mail</p>
            <CustomInput
              hasError={errors.email ? true : false}
              placeholder='Digite seu e-mail'
              type='email'
              {...register('email', {
                required: true,
                validate: (value) => {
                  return isEmail(value)
                }
              })}
            />

            {errors?.email?.type === 'required' && (
              <InputErrorMessage>E-mail é obrigatório</InputErrorMessage>
            )}

            {errors?.email?.type === 'validate' && (
              <InputErrorMessage>
                Precisa ser um e-mail valido
              </InputErrorMessage>
            )}
          </LoginInputContainer>
          <LoginInputContainer>
            <p>Senha</p>
            <CustomInput
              hasError={errors.password ? true : false}
              placeholder='Digite sua senha'
              type='password'
              {...register('password', {
                required: true
              })}
            />
            {errors?.password?.type === 'required' && (
              <InputErrorMessage>Senha é obrigatória</InputErrorMessage>
            )}
          </LoginInputContainer>

          <CustomButton
            startIcon={<FiLogIn size={18} />}
            onClick={handleSubmit(handleSubmitPress)}
          >
            Entrar
          </CustomButton>
        </LoginContent>
      </LoginContainer>
    </>
  )
}

export default LoginPage
