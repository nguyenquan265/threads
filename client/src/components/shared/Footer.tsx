import { sidebarLinks } from '@/helpers/constants'
import { Link, useLocation } from 'react-router-dom'

// Use as mobile navigation
const Footer = () => {
  const location = useLocation()

  return (
    <footer className='bottombar'>
      <div className='bottombar_container'>
        {sidebarLinks.map((link, index) => {
          const isActive =
            (location.pathname.includes(link.route) && link.route.length > 1) || location.pathname == link.route

          return (
            <Link to={link.route} key={index} className={`bottombar_link ${isActive && 'bg-primary-500'}`}>
              <img src={link.imgURL} alt='link' width={16} height={16} className='object-contain' loading='lazy' />
              <p className='text-subtle-medium text-light-1 max-sm:hidden'>{link.label.split(/\s+/)[0]}</p>
            </Link>
          )
        })}
      </div>
    </footer>
  )
}

export default Footer
