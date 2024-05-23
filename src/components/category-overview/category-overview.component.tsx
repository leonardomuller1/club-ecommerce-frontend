import { FunctionComponent } from 'react'
import Category from '../../types/category.types'
import { CategoriesContainer } from '../categories/categories.styles'
import { CategoryTitle, ProductsContainer } from './category-overview.styles'

interface CategoryOverviewProps {
  category: Category
}
const CategoryOverview: FunctionComponent<CategoryOverviewProps> = ({
  category
}) => {
  return (
    <CategoriesContainer>
      <CategoryTitle>{category.displayName}</CategoryTitle>
      <ProductsContainer></ProductsContainer>
    </CategoriesContainer>
  )
}

export default CategoryOverview
