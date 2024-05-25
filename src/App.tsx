import { useContext, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { collection, getDocs, query, where } from 'firebase/firestore'

//Pages
import HomePage from './pages/home/home.page'
import ExplorePage from './pages/explore/explore.page'
import CategoryDetailsPage from './pages/category-details/category-details.page'
import CheckoutPage from './pages/checkout/checkout.page'
import LoginPage from './pages/login/login.page'
import SingUpPage from './pages/sign-up/sign-up.page'

//Utilities
import { auth, db } from './config/firebase.config'
import { UserContext } from './contexts/user.context'
import { userConvert } from './converts/firestore.converters'

//Components
import Loading from './components/loading/loading.component'
import Cart from './components/cart/cart.component'
import Authentication from './components/authentication/authentication.component'

const App = () => {
  const [isInitializing, setIsInitializing] = useState(true)

  const { isAuthenticated, loginUser, logoutUser } = useContext(UserContext)

  onAuthStateChanged(auth, async (user) => {
    // se esta fazendo logout
    const isSigningOut = isAuthenticated && !user
    if (isSigningOut) {
      logoutUser()
      return setIsInitializing(false)
    }

    // se esta fazendo login
    const isSigninIn = !isAuthenticated && user
    if (isSigninIn) {
      const querySnapchot = await getDocs(
        query(
          collection(db, 'users').withConverter(userConvert),
          where('id', '==', user.uid)
        )
      )

      const userFromFirestore = querySnapchot.docs[0]?.data()

      loginUser(userFromFirestore)
      return setIsInitializing(false)
    }
    return setIsInitializing(false)
  })

  if (isInitializing) return <Loading />

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/explore' element={<ExplorePage />} />
        <Route path='/category/:id' element={<CategoryDetailsPage />} />
        <Route
          path='/checkout'
          element={
            <Authentication>
              <CheckoutPage />
            </Authentication>
          }
        />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/singup' element={<SingUpPage />} />
      </Routes>

      <Cart />
    </BrowserRouter>
  )
}

export default App
