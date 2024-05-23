import { FunctionComponent } from 'react'

//Components
import Header from '../../components/header/header.component'
import CategoriesOverview from '../../components/categories-overwview/categories-overview.component'

const ExplorePage: FunctionComponent = () => {
  return (
    <>
      <Header />
      <CategoriesOverview />
    </>
  )
}

export default ExplorePage
