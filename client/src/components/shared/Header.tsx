import { Link } from 'react-router-dom'
import Logo from '@/assets/logo.svg'

const Header = () => {
  return (
    <nav className='topbar'>
      <Link to='/' className='flex items-center gap-4'>
        <img src={Logo} alt='logo' width={28} height={28} />
        <p className='text-heading3-bold text-light-1 max-xs:hidden'>Threads</p>
      </Link>
    </nav>
  )
}

export default Header
