import { useEffect, useState } from 'react'
import { getDocs, collection } from 'firebase/firestore'

//components
import CategoryItem from '../category-item/category-item.component'

//styles
import { CategoriesContainer, CategoriesContent } from './categories.styles'

//utilities
import Category from '../../types/category.types'
import { db } from '../../config/firebase.config'
import { categoryConvert } from '../../converts/firestore.converters'

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([])

  const fetchCategories = async () => {
    try {
      const categoriesFromFirestore: Category[] = []

      const querySnapshot = await getDocs(
        collection(db, 'categories').withConverter(categoryConvert)
      )
      querySnapshot.forEach((doc) => {
        categoriesFromFirestore.push(doc.data())
      })

      setCategories(categoriesFromFirestore)
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
