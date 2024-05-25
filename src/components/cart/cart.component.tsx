import { FunctionComponent, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { BsCartCheck } from 'react-icons/bs'

//component
import CustomButton from '../custom-button/custom-button.component'
import CartItem from '../cart-item/cart-item.component'

//styles
import {
  CartContainer,
  CartContent,
  CartEscapeArea,
  CartTitle,
  CartTotal
} from './cart.styles'

//utilities
import { CartContext } from '../../contexts/cart.context'

const Cart: FunctionComponent = () => {
  const { isVisible, products, toggleCart, productsCount, productsTotalPrice } =
    useContext(CartContext)

  const navigate = useNavigate()
  const handleGoToCheckoutClick = () => {
    toggleCart()
    navigate('/checkout')
  }
  return (
    <CartContainer isVisible={isVisible}>
      <CartEscapeArea onClick={toggleCart} />
      <CartContent>
        <CartTitle>Seu Carrinho</CartTitle>

        {products.map((product) => (
          <CartItem key={product.id} product={product} />
        ))}

        {productsCount > 0 && (
          <CartTotal>Total: R${productsTotalPrice}</CartTotal>
        )}

        {productsCount > 0 && (
          <CustomButton
            startIcon={<BsCartCheck />}
            onClick={handleGoToCheckoutClick}
          >
            Ir para o Checkout
          </CustomButton>
        )}

        {productsCount == 0 && <p>Seu carrinho está vazio :(</p>}
      </CartContent>
    </CartContainer>
  )
}

export default Cart
