import { FunctionComponent, useContext, useEffect } from 'react'

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
        <p key={category.id}>{category.displayName}</p>
      ))}
    </Container>
  )
}

export default CategoriesOverview
