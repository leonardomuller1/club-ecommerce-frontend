import {
  FunctionComponent,
  ReactNode,
  createContext,
  useEffect,
  useMemo,
  useState
} from 'react'

//utilities
import CartProduct from '../types/cart.types'
import Product from '../types/product.types'

interface ICartContext {
  isVisible: boolean
  productsTotalPrice: number
  productsCount: number
  products: CartProduct[]
  toggleCart: () => void
  addProductToCart: (product: Product) => void
  removeProductFromCart: (productId: string) => void
  increaseProductQuantity: (Product: string) => void
  decreaseProductQuantity: (Product: string) => void
  clearProducts: () => void
}

export const CartContext = createContext<ICartContext>({
  isVisible: false,
  productsTotalPrice: 0,
  productsCount: 0,
  products: [],
  toggleCart: () => {},
  addProductToCart: () => {},
  removeProductFromCart: () => {},
  increaseProductQuantity: () => {},
  decreaseProductQuantity: () => {},
  clearProducts: () => {}
})

interface CartContextProviderProps {
  children: ReactNode
}

const CartContextProvider: FunctionComponent<CartContextProviderProps> = ({
  children
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [products, setProducts] = useState<CartProduct[]>([])

  let recuperado = 0 //controle se veio do localstorage ou não -  0 nao e 1 sim
  useEffect(() => {
    const productsFromLocalStorage = JSON.parse(
      localStorage.getItem('cartProducts')!
    )

    setProducts(productsFromLocalStorage)

    recuperado = 1
  }, [])

  useEffect(() => {
    if (recuperado == 0) {
      localStorage.setItem('cartProducts', JSON.stringify(products))
    }

    recuperado = 0
  }, [products])

  const productsCount = useMemo(() => {
    return products.reduce((acc, currentProduct) => {
      return acc + currentProduct.quantity
    }, 0)
  }, [products])

  const productsTotalPrice = useMemo(() => {
    return products.reduce((acc, currentProduct) => {
      return acc + currentProduct.price * currentProduct.quantity
    }, 0)
  }, [products])

  const toggleCart = () => {
    setIsVisible((prevState) => !prevState)
  }

  const addProductToCart = (product: Product) => {
    const productIsAlreadyInCart = products.some(
      (item) => item.id === product.id
    )

    if (productIsAlreadyInCart) {
      return setProducts((products) => [
        ...products.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      ])
    }

    setProducts((prevState) => [...prevState, { ...product, quantity: 1 }])
  }

  const removeProductFromCart = (productId: string) => {
    setProducts((products) =>
      products.filter((product) => product.id !== productId)
    )
  }

  const increaseProductQuantity = (productId: string) => {
    setProducts((products) =>
      products.map((product) =>
        product.id === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    )
  }

  const decreaseProductQuantity = (productId: string) => {
    setProducts((products) =>
      products
        .map((product) =>
          product.id === productId
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
        .filter((product) => product.quantity > 0)
    )
  }

  const clearProducts = () => {
    setProducts([])
  }

  return (
    <CartContext.Provider
      value={{
        isVisible,
        productsTotalPrice,
        productsCount,
        products,
        toggleCart,
        addProductToCart,
        removeProductFromCart,
        increaseProductQuantity,
        decreaseProductQuantity,
        clearProducts
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider
