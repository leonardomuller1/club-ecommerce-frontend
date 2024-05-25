import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import {
  AuthError,
  createUserWithEmailAndPassword,
  AuthErrorCodes
} from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore'

//components
import CustomButton from '../../components/custom-button/custom-button.component'
import CustomInput from '../../components/custom-input/custom-input.component'
import Header from '../../components/header/header.component'
import InputErrorMessage from '../../components/input-error-message/input-error-message.component'
import Loading from '../../components/loading/loading.component'

//styles
import {
  SignUpContainer,
  SignUpContent,
  SignUpHeadline,
  SignUpInputContainer
} from './sign-up.styles'

//utilits
import { auth, db } from '../../config/firebase.config'
import { UserContext } from '../../contexts/user.context'
import isEmail from 'validator/lib/isEmail'

interface SingUpForm {
  firstName: string
  lastName: string
  email: string
  password: string
  passwordConfirmation: string
}

const SingUpPage = () => {
  const {
    register,
    formState: { errors },
    watch,
    setError,
    handleSubmit
  } = useForm<SingUpForm>()

  const [isLoading, setIsLoading] = useState(false)

  const watchPassword = watch('password')

  const { isAuthenticated } = useContext(UserContext)

  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated])

  const handleSubmitPress = async (data: SingUpForm) => {
    try {
      setIsLoading(true)
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )

      await addDoc(collection(db, 'users'), {
        id: userCredentials.user.uid,
        email: userCredentials.user.email,
        firstName: data.firstName,
        lastName: data.lastName,
        provider: 'firebase'
      })
    } catch (error) {
      const _error = error as AuthError

      if (_error.code === AuthErrorCodes.EMAIL_EXISTS) {
        return setError('email', { type: 'alreadyInUse' })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Header />
      {isLoading && <Loading />}
      <SignUpContainer>
        <SignUpContent>
          <SignUpHeadline> Crie sua conta</SignUpHeadline>

          <SignUpInputContainer>
            <p>Nome</p>
            <CustomInput
              hasError={!!errors?.firstName}
              placeholder='Digite seu nome'
              {...register('firstName', { required: true })}
            />

            {errors?.firstName?.type === 'required' && (
              <InputErrorMessage>Nome é obrigatório</InputErrorMessage>
            )}
          </SignUpInputContainer>
          <SignUpInputContainer>
            <p>Sobrenome</p>
            <CustomInput
              hasError={!!errors?.lastName}
              placeholder='Digite seu sobrenome'
              {...register('lastName', { required: true })}
            />

            {errors?.lastName?.type === 'required' && (
              <InputErrorMessage>Sobrenome é obrigatório</InputErrorMessage>
            )}
          </SignUpInputContainer>
          <SignUpInputContainer>
            <p>E-mail</p>
            <CustomInput
              hasError={!!errors?.email}
              placeholder='Digite seu e-mail'
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

            {errors?.email?.type === 'alreadyInUse' && (
              <InputErrorMessage>Este e-mail já foi usado</InputErrorMessage>
            )}

            {errors?.email?.type === 'validate' && (
              <InputErrorMessage>Precisa ser e-mail valido</InputErrorMessage>
            )}
          </SignUpInputContainer>
          <SignUpInputContainer>
            <p>Senha</p>
            <CustomInput
              hasError={!!errors?.password}
              placeholder='Digite sua senha'
              type='password'
              {...register('password', { required: true, minLength: 6 })}
            />

            {errors?.password?.type === 'required' && (
              <InputErrorMessage>Senha é obrigatória</InputErrorMessage>
            )}

            {errors?.password?.type === 'minLength' && (
              <InputErrorMessage>
                A senha deve ter no minimo 6 caracteres
              </InputErrorMessage>
            )}
          </SignUpInputContainer>
          <SignUpInputContainer>
            <p>Confirme sua senha</p>
            <CustomInput
              hasError={!!errors?.passwordConfirmation}
              placeholder='Digite confirme sua senha'
              type='password'
              {...register('passwordConfirmation', {
                required: true,
                minLength: 6,
                validate: (value) => {
                  return value === watchPassword
                }
              })}
            />

            {errors?.passwordConfirmation?.type === 'minLength' && (
              <InputErrorMessage>
                A senha deve ter no minimo 6 caracteres
              </InputErrorMessage>
            )}
            {errors?.passwordConfirmation?.type === 'required' && (
              <InputErrorMessage>Confirme a sua senha</InputErrorMessage>
            )}

            {errors?.passwordConfirmation?.type === 'validate' && (
              <InputErrorMessage>
                As senhas precisam ser iguais
              </InputErrorMessage>
            )}
          </SignUpInputContainer>
          <CustomButton
            startIcon={<FiLogIn size={18} />}
            onClick={handleSubmit(handleSubmitPress)}
          >
            Criar conta
          </CustomButton>
        </SignUpContent>
      </SignUpContainer>
    </>
  )
}

export default SingUpPage
