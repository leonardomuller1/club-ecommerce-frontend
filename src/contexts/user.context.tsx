import { ReactNode } from 'react'
import { FunctionComponent, createContext, useState } from 'react'
import User from '../types/user.types'

interface IUserContext {
  currentUser: User | null
  isAutheticated: boolean
  loginUser: (user: User) => void
  logoutUser: () => void
}

export const UserContext = createContext<IUserContext>({
  currentUser: null,
  isAutheticated: false,
  loginUser: () => {},
  logoutUser: () => {}
})

interface UserContextProviderProps {
  children: ReactNode
}

const UserContextProvider: FunctionComponent<UserContextProviderProps> = ({
  children
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  const isAutheticated = currentUser !== null

  const loginUser = (user: User) => {
    setCurrentUser(user)
  }

  const logoutUser = () => {
    setCurrentUser(null)
  }
  return (
    <UserContext.Provider
      value={{ currentUser, isAutheticated, loginUser, logoutUser }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
