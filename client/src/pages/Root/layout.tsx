import Footer from '@/components/shared/Footer'
import Header from '@/components/shared/Header'
import LeftSidebar from '@/components/shared/LeftSidebar'
import RightSidebar from '@/components/shared/RightSidebar'
import { ClerkProvider } from '@clerk/clerk-react'
import { Outlet } from 'react-router-dom'
import { dark } from '@clerk/themes'
import ClerkProtectedRoute from '@/components/shared/ClerkProtectedRoute'
import AuthProtectedRoute from '@/components/shared/AuthProtectedRoute'
import { SocketProvider } from '@/contexts/SocketContext'
import { UserProvider } from '@/contexts/UserContext'

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
    >
      <ClerkProtectedRoute>
        <AuthProtectedRoute>
          <SocketProvider>
            <UserProvider>
              <Header />

              <main className='flex flex-row'>
                <LeftSidebar />

                <section className='main-container'>
                  <div className='w-full max-w-4xl h-full'>
                    <Outlet />
                  </div>
                </section>

                <RightSidebar />
              </main>

              <Footer />
            </UserProvider>
          </SocketProvider>
        </AuthProtectedRoute>
      </ClerkProtectedRoute>
    </ClerkProvider>
  )
}

export default RootLayout
