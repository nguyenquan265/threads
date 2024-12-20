import { Link } from 'react-router-dom'
import Logo from '@/assets/logo.svg'
import LogOut from '@/assets/logout.svg'
import { OrganizationSwitcher, SignOutButton, SignedIn } from '@clerk/clerk-react'

const Header = () => {
  return (
    <nav className='topbar'>
      <Link to='/' className='flex items-center gap-4'>
        <img src={Logo} alt='logo' width={28} height={28} loading='lazy' />
        <p className='text-heading3-bold text-light-1 max-xs:hidden'>Threads</p>
      </Link>

      <div className='flex items-center gap-1'>
        <div className='block md:hidden'>
          <SignedIn>
            <SignOutButton redirectUrl='/sign-in'>
              <div className='flex cursor-pointer'>
                <img src={LogOut} alt='logout' width={24} height={24} loading='lazy' />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>

        <OrganizationSwitcher
          appearance={{
            elements: {
              organizationSwitcherTrigger: 'py-2 px-4'
            }
          }}
        />
      </div>
    </nav>
  )
}

export default Header
