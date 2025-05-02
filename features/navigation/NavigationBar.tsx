import Link from 'next/link'
import { UserInfo } from '../authentication/UserInfo'
import { Logout } from '../authentication/Logout'

export const NavigationBar = () => {
  return (
    <div className='flex gap-x-12 items-center py-4'>
      <div className='flex gap-x-4 items-center'>
        <Link href='/'>Home page</Link>
        <Link href='/team'>Team page</Link>
      </div>
      <UserInfo />
      <Logout />
    </div>
  )
}
