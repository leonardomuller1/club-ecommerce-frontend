import { useContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { collection, getDocs, query, where } from 'firebase/firestore'

//Pages
import HomePage from './pages/home/home.page'
import LoginPage from './pages/login/login.page'
import SingUpPage from './pages/sign-up/sign-up.page'

//Utilities
import { auth, db } from './config/firebase.config'
import { UserContext } from './contexts/user.context'

const App = () => {
  const { isAutheticated, loginUser, logoutUser } = useContext(UserContext)

  onAuthStateChanged(auth, async (user) => {
    // se esta fazendo logout
    const isSigningOut = isAutheticated && !user
    if (isSigningOut) {
      return logoutUser()
    }

    // se esta fazendo login
    const isSigninIn = !isAutheticated && user
    if (isSigninIn) {
      const querySnapchot = await getDocs(
        query(collection(db, 'users'), where('id', '==', user.uid))
      )

      const userFromFirestore = querySnapchot.docs[0]?.data()

      return loginUser(userFromFirestore as any)
    }
  })

  console.log({ isAutheticated })
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/singup' element={<SingUpPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
