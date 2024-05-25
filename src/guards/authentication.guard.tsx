import { FunctionComponent, useContext, useEffect, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

//components
import Header from '../components//header/header.component'
import Loading from '../components/loading/loading.component'

//utilities
import { UserContext } from '../contexts/user.context'

interface AuthenticationGuardProps {
  children: ReactNode
}

const AuthenticationGuard: FunctionComponent<AuthenticationGuardProps> = ({
  children
}) => {
  const { isAuthenticated } = useContext(UserContext)

  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      setTimeout(() => {
        navigate('/login')
      }, 3000)
    }
  }, [isAuthenticated])

  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <Loading message='Você precisa estar logado para acessar esta página. Você será redirecionado para a página de login em instantes' />
      </>
    )
  }

  return <>{children}</>
}

export default AuthenticationGuard
