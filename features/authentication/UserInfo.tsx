import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export const UserInfo = () => {
  const [username, setUsername] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const usernameInLocalStorage = localStorage.getItem('username')
    setUsername(usernameInLocalStorage)
    // If not logged in, redirect to the login page.
    if (!usernameInLocalStorage) {
      router.push('/login')
    }
  }, [router, username])

  return (
    <span>
      Your username is <strong>{username}</strong>.
    </span>
  )
}
