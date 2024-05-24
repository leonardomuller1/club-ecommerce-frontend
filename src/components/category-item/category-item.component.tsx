import { FunctionComponent } from 'react'

//Styles
import { CategoryItemContainer, CategoryName } from './category-item.styles'

// Utilities
import Category from '../../types/category.types'
import { useNavigate } from 'react-router-dom'

interface CategoryItemProps {
  category: Category
}

const CategoryItem: FunctionComponent<CategoryItemProps> = ({ category }) => {
  const navigate = useNavigate()
  const haldleExploreClick = () => {
    navigate(`/category/${category.id}`)
  }
  return (
    <CategoryItemContainer backgroundImage={category.imageUrl}>
      <CategoryName onClick={haldleExploreClick}>
        <p>{category.displayName}</p>
        <p>Explorar</p>
      </CategoryName>
    </CategoryItemContainer>
  )
}

export default CategoryItem
