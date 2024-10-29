import { Link, useLocation } from 'react-router-dom'
import { sidebarLinks } from '@/utils/constants'
import { SignOutButton, SignedIn } from '@clerk/clerk-react'
import LogOut from '@/assets/logout.svg'

const LeftSidebar = () => {
  const location = useLocation()

  return (
    <section className='custom-scrollbar leftsidebar'>
      <div className='flex w-full flex-1 flex-col gap-6 px-6'>
        {sidebarLinks.map((link, index) => {
          const isActive =
            (location.pathname.includes(link.route) && link.route.length > 1) || location.pathname == link.route

          return (
            <Link to={link.route} key={index} className={`leftsidebar_link ${isActive && 'bg-primary-500'}`}>
              <img src={link.imgURL} alt='link' width={24} height={24} />
              <p className='text-light-1 max-lg:hidden'>{link.label}</p>
            </Link>
          )
        })}
      </div>

      <div className='mt-10 px-6'>
        <SignedIn>
          <SignOutButton>
            <div className='flex cursor-pointer gap-4 p-4'>
              <img src={LogOut} alt='logout' width={24} height={24} />
              <p className='text-light-2 max-lg:hidden'>Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  )
}

export default LeftSidebar
