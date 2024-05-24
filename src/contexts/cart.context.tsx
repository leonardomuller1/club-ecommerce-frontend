import { FunctionComponent, ReactNode, createContext, useState } from 'react'

//utilities
import CartProduct from '../types/cart.types'
import Product from '../types/product.types'

interface ICartContext {
  isVisible: boolean
  products: CartProduct[]
  toggleCart: () => void
  addProductToCart: (product: Product) => void
}

export const CartContext = createContext<ICartContext>({
  isVisible: false,
  products: [],
  toggleCart: () => {},
  addProductToCart: () => {}
})

interface CartContextProviderProps {
  children: ReactNode
}

const CartContextProvider: FunctionComponent<CartContextProviderProps> = ({
  children
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [products, setProducts] = useState<CartProduct[]>([])

  const toggleCart = () => {
    setIsVisible((prevState) => !prevState)
  }

  const addProductToCart = (procuct: Product) => {
    setProducts((prevState) => [...prevState, { ...procuct, quantity: 1 }])
  }

  return (
    <CartContext.Provider
      value={{ isVisible, products, toggleCart, addProductToCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider
