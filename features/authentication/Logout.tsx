import { useRouter } from 'next/router'

export const Logout = () => {
  const router = useRouter()

  const logout = () => {
    localStorage.clear()
    router.push('/login')
  }

  return <button onClick={logout}>Logout</button>
}
