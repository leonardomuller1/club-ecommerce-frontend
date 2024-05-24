import { FunctionComponent, ReactNode, createContext, useState } from 'react'
import CartProduct from '../types/cart.types'

interface ICartContext {
  isVisible: boolean
  products: CartProduct[]
  toogleCart: () => void
}

const CartContext = createContext<ICartContext>({
  isVisible: false,
  products: [],
  toogleCart: () => {}
})

interface CartContextProviderProps {
  children: ReactNode
}

const CartContextProvider: FunctionComponent<CartContextProviderProps> = ({
  children
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [products, setProducts] = useState<CartProduct[]>([])

  const toogleCart = () => {
    setIsVisible((prevState) => !prevState)
  }

  return (
    <CartContext.Provider value={{ isVisible, products, toogleCart }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider
