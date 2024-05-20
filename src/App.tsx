import { FunctionComponent } from 'react'

interface Appprops {
  message?: string
}

const App: FunctionComponent<Appprops> = ({ message }) => {
  return <h1>{message}</h1>
}

export default App
