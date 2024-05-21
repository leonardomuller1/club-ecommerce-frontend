import { BsGoogle } from 'react-icons/bs'
import { FiLogIn } from 'react-icons/fi'

//components
import Header from '../../components/header/header.component'
import CustomButton from '../../components/custom-button/custom-button.component'
import CustomInput from '../../components/custom-input/custom-input.component'

//styles
import {
  LoginContainer,
  LoginContent,
  LoginHeadline,
  LoginInputContainer,
  LoginSubtitle
} from './login.styles'

const LoginPage = () => {
  return (
    <>
      <Header />

      <LoginContainer>
        <LoginContent>
          <LoginHeadline>Entre com a sua conta</LoginHeadline>
          <CustomButton startIcon={<BsGoogle size={18} />}>
            Entrar com o google
          </CustomButton>
          <LoginSubtitle>ou entre com o seu e-mail</LoginSubtitle>
          <LoginInputContainer>
            <p>E-mail</p>
            <CustomInput placeholder='Digite seu e-mail' type='email' />
          </LoginInputContainer>
          <LoginInputContainer>
            <p>Senha</p>
            <CustomInput placeholder='Digite sua senha' type='password' />
          </LoginInputContainer>

          <CustomButton startIcon={<FiLogIn size={18} />}>Entrar</CustomButton>
        </LoginContent>
      </LoginContainer>
    </>
  )
}

export default LoginPage