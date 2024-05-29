import CartProduct from '../../../types/cart.types'
import Product from '../../../types/product.types'
import CartActionTypes from './cart.action-types'

export const toggleCart = () => {
  return { type: CartActionTypes.toggleCart }
}

export const addProductToCart = (payload: Product) => {
  return { type: CartActionTypes.addProductToCart, payload }
}
