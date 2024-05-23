import { FunctionComponent, useContext, useEffect } from 'react'

//components
import CategoryOverview from '../category-overview/category-overview.component'

//styles
import { Container } from './categories-overview.styles'

//utilits
import { CategoryContext } from '../../contexts/category.context'

const CategoriesOverview: FunctionComponent = () => {
  const { categories, fetchCategories } = useContext(CategoryContext)

  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories()
    }
  }, [])

  return (
    <Container>
      {categories.map((category) => (
        <CategoryOverview category={category} key={category.id} />
      ))}
    </Container>
  )
}

export default CategoriesOverview
