import { FunctionComponent } from 'react'

//components
import ProductItem from '../product-item/product-item.component'

//styles
import {
  CategoryContainer,
  CategoryTitle,
  ProductsContainer
} from './category-overview.styles'

//utilities
import Category from '../../types/category.types'

interface CategoryOverviewProps {
  category: Category
}
const CategoryOverview: FunctionComponent<CategoryOverviewProps> = ({
  category
}) => {
  return (
    <CategoryContainer>
      <CategoryTitle>{category.displayName}</CategoryTitle>
      <ProductsContainer>
        {category.products.slice(0, 4).map((product) => (
          <ProductItem product={product} key={product.id} />
        ))}
      </ProductsContainer>
    </CategoryContainer>
  )
}

export default CategoryOverview
