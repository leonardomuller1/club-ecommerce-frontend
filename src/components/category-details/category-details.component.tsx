import { FunctionComponent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BiChevronLeft } from 'react-icons/bi'
import { collection, getDocs, query, where } from 'firebase/firestore'

//components
import Loading from '../loading/loading.component'
import ProductItem from '../product-item/product-item.component'

//styles
import {
  Container,
  CategoryTitle,
  IconContainer,
  ProductsContainer
} from './category-details.styles'

//utilities
import { db } from '../../config/firebase.config'
import { categoryConvert } from '../../converts/firestore.converters'
import Category from '../../types/category.types'

interface CategoryDetailsProps {
  categoryId: string
}

const CategoryDetails: FunctionComponent<CategoryDetailsProps> = ({
  categoryId
}) => {
  const [category, setCategory] = useState<Category | null>(null)
  const [isLoading, SetIsLoading] = useState(false)

  const navigate = useNavigate()
  const handleBackClick = () => {
    navigate('/')
  }

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        SetIsLoading(true)
        const querySnapshot = await getDocs(
          query(
            collection(db, 'categories').withConverter(categoryConvert),
            where('id', '==', categoryId)
          )
        )
        const category = querySnapshot.docs[0]?.data()
        setCategory(category)
      } catch (error) {
        console.log(error)
      } finally {
        SetIsLoading(false)
      }
    }

    fetchCategory()
  }, [])

  if (isLoading) return <Loading />

  return (
    <Container>
      <CategoryTitle>
        <IconContainer onClick={handleBackClick}>
          <BiChevronLeft size={36} />
        </IconContainer>
        <p>Explorar {category?.displayName}</p>
      </CategoryTitle>

      <ProductsContainer>
        {category?.products.map((product) => (
          <ProductItem product={product} key={product.id} />
        ))}
      </ProductsContainer>
    </Container>
  )
}
export default CategoryDetails
