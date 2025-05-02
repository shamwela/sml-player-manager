import { useUsername } from '@/features/authentication/username'
import { useRouter } from 'next/router'
import { type FormEvent } from 'react'

export const LoginForm = () => {
  const { setUsername } = useUsername()
  const router = useRouter()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    type Input = {
      username: {
        value: string
      }
    }
    // Should type the target with a type assertion.
    const target = event.target as typeof event.target & Input
    const username = target.username.value
    // Only change the context value only on form submit.
    setUsername(username)
    localStorage.setItem('username', username)
    router.push('/')
  }

  return (
    <main className='p-4 flex justify-center items-center'>
      <div className='flex flex-col gap-y-4'>
        <h1 className='text-center'>Login</h1>
        <p>
          This is not a real authentication. You can enter any username here.
        </p>
        <form onSubmit={handleSubmit} className='flex flex-col gap-y-4'>
          <input
            type='text'
            name='username'
            placeholder='Username'
            autoComplete='off'
            required
            aria-required
          />
          <button type='submit'>Login</button>
        </form>
      </div>
    </main>
  )
}
