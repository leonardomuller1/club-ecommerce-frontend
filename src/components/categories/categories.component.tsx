import { useContext, useEffect } from 'react'

//components
import CategoryItem from '../category-item/category-item.component'
import Loading from '../loading/loading.component'

//styles
import { CategoriesContainer, CategoriesContent } from './categories.styles'

//utilities
import { CategoryContext } from '../../contexts/category.context'

const Categories = () => {
  const { categories, isLoading, fetchCategories } = useContext(CategoryContext)
  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <CategoriesContainer>
      {isLoading && <Loading />}
      <CategoriesContent>
        {categories.map((category) => (
          <div>
            <CategoryItem category={category} key={category.id} />
          </div>
        ))}
      </CategoriesContent>
    </CategoriesContainer>
  )
}

export default Categories
