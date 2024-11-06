import Footer from '@/components/shared/Footer'
import Header from '@/components/shared/Header'
import LeftSidebar from '@/components/shared/LeftSidebar'
import RightSidebar from '@/components/shared/RightSidebar'
import { ClerkProvider } from '@clerk/clerk-react'
import { Outlet } from 'react-router-dom'
import { dark } from '@clerk/themes'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

const RootLayout = () => {
  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      appearance={{ baseTheme: dark }}
      afterSignOutUrl='/sign-in'
      signInUrl='/sign-in'
      signUpUrl='/sign-up'
      signInFallbackRedirectUrl='/onboarding'
      signUpFallbackRedirectUrl='/sign-in'
    >
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
    </ClerkProvider>
  )
}

export default RootLayout
