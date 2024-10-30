import Footer from '@/components/shared/Footer'
import Header from '@/components/shared/Header'
import LeftSidebar from '@/components/shared/LeftSidebar'
import RightSidebar from '@/components/shared/RightSidebar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
      <Header />

      <main className='flex flex-row'>
        <LeftSidebar />

        <section className='main-container'>
          <div className='w-full max-w-4xl'>
            <Outlet />
          </div>
        </section>

        <RightSidebar />
      </main>

      <Footer />
    </>
  )
}

export default Layout
