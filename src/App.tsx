import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'

//Pages
import HomePage from './pages/home/home.page'
import LoginPage from './pages/login/login.page'
import SingUpPage from './pages/sign-up/sign-up.page'

//Utilities
import { auth } from './config/firebase.config'

const App = () => {
  onAuthStateChanged(auth, (user) => {
    console.log(user)
  })

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
