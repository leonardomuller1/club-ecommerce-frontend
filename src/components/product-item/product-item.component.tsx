import { FunctionComponent } from 'react'

//styles
import {
  ProductContainer,
  ProductImage,
  ProductInfo
} from './product-item.styles'

//utilities
import Product from '../../types/product.types'

interface ProductItemProps {
  product: Product
}

const ProductItem: FunctionComponent<ProductItemProps> = ({ product }) => {
  return (
    <ProductContainer>
      <ProductImage imageUrl={product.imageUrl} />

      <ProductInfo>
        <p>{product.name}</p>
        <p>{product.price}</p>
      </ProductInfo>
    </ProductContainer>
  )
}

export default ProductItem
