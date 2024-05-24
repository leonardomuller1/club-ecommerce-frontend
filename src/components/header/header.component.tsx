//components
import { useContext } from 'react'
import { BsCart3 } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'

//styles
import {
  HeaderContainer,
  HeaderTitle,
  HeaderItems,
  HeaderItem
} from './header.styles'

//utilities
import { auth } from '../../config/firebase.config'
import { UserContext } from '../../contexts/user.context'
import { CartContext } from '../../contexts/cart.context'

const Header = () => {
  const navigate = useNavigate()
  const { isAutheticated } = useContext(UserContext)
  const { toggleCart } = useContext(CartContext)

  const handleLogiClick = () => {
    navigate('/')
  }

  const handleExploreClick = () => {
    navigate('/explore')
  }

  const handleLoginClick = () => {
    navigate('/login')
  }

  const handleSingUpClick = () => {
    navigate('/singup')
  }

  return (
    <HeaderContainer>
      <HeaderTitle onClick={handleLogiClick}>CLUB CLOTHING</HeaderTitle>
      <HeaderItems>
        <HeaderItem onClick={handleExploreClick}>Explorar</HeaderItem>
        {!isAutheticated && (
          <>
            <HeaderItem onClick={handleLoginClick}>Login</HeaderItem>
            <HeaderItem onClick={handleSingUpClick}>Criar conta</HeaderItem>
          </>
        )}
        {isAutheticated && (
          <HeaderItem onClick={() => signOut(auth)}>Sair</HeaderItem>
        )}
        <HeaderItem onClick={toggleCart}>
          <BsCart3 size={25} />
          <p style={{ marginLeft: 5 }}>5</p>
        </HeaderItem>
      </HeaderItems>
    </HeaderContainer>
  )
}

export default Header
