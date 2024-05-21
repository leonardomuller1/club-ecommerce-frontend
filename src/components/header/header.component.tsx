//components
import { BsCart3 } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

//styles
import {
  HeaderContainer,
  HeaderTitle,
  HeaderItems,
  HeaderItem
} from './header.styles'
import { signOut } from 'firebase/auth'
import { auth } from '../../config/firebase.config'

const Header = () => {
  const navigate = useNavigate()
  const handleLoginClick = () => {
    navigate('/login')
  }

  const handleSingUpClick = () => {
    navigate('/singup')
  }

  return (
    <HeaderContainer>
      <HeaderTitle>CLUB CLOTHING</HeaderTitle>
      <HeaderItems>
        <HeaderItem>Explorar</HeaderItem>
        <HeaderItem onClick={handleLoginClick}>Login</HeaderItem>
        <HeaderItem onClick={handleSingUpClick}>Criar conta</HeaderItem>
        <HeaderItem onClick={() => signOut(auth)}>Sair</HeaderItem>
        <HeaderItem>
          <BsCart3 size={25} />
          <p style={{ marginLeft: 5 }}>5</p>
        </HeaderItem>
      </HeaderItems>
    </HeaderContainer>
  )
}

export default Header
