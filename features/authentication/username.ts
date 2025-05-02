import { createContext, useContext } from 'react'

type UsernameContextType = {
  username: string | null
  setUsername: (username: string | null) => void
}

export const UsernameContext = createContext<UsernameContextType>({
  username: '',
  setUsername: () => {},
})

export const useUsername = () => useContext(UsernameContext)
