//components
import { BsCart3 } from 'react-icons/bs'

//styles
import {
  HeaderContainer,
  HeaderTitle,
  HeaderItems,
  HeaderItem
} from './header.styles'

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderTitle>CLUB CLOTHING</HeaderTitle>
      <HeaderItems>
        <HeaderItem>Explorar</HeaderItem>
        <HeaderItem>Login</HeaderItem>
        <HeaderItem>Criar conta</HeaderItem>
        <HeaderItem>
          <BsCart3 size={25} />
          <p style={{ marginLeft: 5 }}>5</p>
        </HeaderItem>
      </HeaderItems>
    </HeaderContainer>
  )
}

export default Header
