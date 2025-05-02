import { LoginForm } from '@/features/authentication/LoginForm'
import Head from 'next/head'

const LoginPage = () => {
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name='description' content='Login' />
      </Head>
      <LoginForm />
    </>
  )
}

export default LoginPage
