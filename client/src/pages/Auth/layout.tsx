import { ClerkProvider } from '@clerk/clerk-react'
import { Outlet } from 'react-router-dom'
import { dark } from '@clerk/themes'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

const AuthLayout = () => {
  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      appearance={{ baseTheme: dark }}
      afterSignOutUrl='/sign-in'
      signInUrl='/sign-in'
      signUpUrl='/sign-up'
    >
      <Outlet />
    </ClerkProvider>
  )
}

export default AuthLayout
