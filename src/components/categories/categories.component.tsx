import { useEffect, useState } from 'react'
import axios from 'axios'

//components
import CategoryItem from '../category-item/category-item.component'

//styles
import { CategoriesContainer, CategoriesContent } from './categories.styles'

//utilities
import Category from '../../types/category.types'
import env from '../../config/env.config'

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([])

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`${env.apiUrl}/api/category`)

      setCategories(data)
    } catch (error) {
      console.log({ error })
    }
  }

  console.log({ categories })

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <CategoriesContainer>
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
