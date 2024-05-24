import { FunctionComponent, useContext } from 'react'
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
  const { isVisible, products, toggleCart, productsTotalPrice } =
    useContext(CartContext)

  return (
    <CartContainer isVisible={isVisible}>
      <CartEscapeArea onClick={toggleCart} />
      <CartContent>
        <CartTitle>Seu Carrinho</CartTitle>

        {products.map((product) => (
          <CartItem key={product.id} product={product} />
        ))}

        <CartTotal>Total: R${productsTotalPrice}</CartTotal>

        <CustomButton startIcon={<BsCartCheck />}>
          Ir para o Checkout
        </CustomButton>
      </CartContent>
    </CartContainer>
  )
}

export default Cart
