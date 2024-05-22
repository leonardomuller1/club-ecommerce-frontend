import { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { BsGoogle } from 'react-icons/bs'
import { FiLogIn } from 'react-icons/fi'
import { isEmail } from 'validator'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import {
  AuthError,
  AuthErrorCodes,
  signInWithEmailAndPassword,
  signInWithPopup
} from 'firebase/auth'

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

//utilits
import { auth, db, googleProvider } from '../../config/firebase.config'
import { UserContext } from '../../contexts/user.context'

interface LoginForm {
  email: string
  password: string
}

const LoginPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError
  } = useForm<LoginForm>()

  const { isAutheticated } = useContext(UserContext)

  const navigate = useNavigate()
  useEffect(() => {
    if (isAutheticated) {
      navigate('/')
    }
  }, [isAutheticated])

  const handleSubmitPress = async (data: LoginForm) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )

      console.log({ userCredentials })
    } catch (error) {
      const _error = error as AuthError

      if (_error.code === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS) {
        return setError('password', { type: 'mismatch' })
      }
    }
  }

  const handleSignInWithGooglePress = async () => {
    try {
      const userCredencials = await signInWithPopup(auth, googleProvider)

      const querySnapshpt = await getDocs(
        query(
          collection(db, 'users'),
          where('id', '==', userCredencials.user.uid)
        )
      )

      const user = querySnapshpt.docs[0]?.data()

      if (!user) {
        const firstName = userCredencials.user.displayName?.split(' ')[0]
        const lastName = userCredencials.user.displayName?.split(' ')[1]

        await addDoc(collection(db, 'users'), {
          id: userCredencials.user.uid,
          email: userCredencials.user.email,
          firstName: firstName,
          lastName: lastName,
          provider: 'google'
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Header />

      <LoginContainer>
        <LoginContent>
          <LoginHeadline>Entre com a sua conta</LoginHeadline>
          <CustomButton
            onClick={handleSignInWithGooglePress}
            startIcon={<BsGoogle size={18} />}
          >
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
            {errors?.password?.type === 'mismatch' && (
              <InputErrorMessage>Senha ou e-mail invalido</InputErrorMessage>
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
