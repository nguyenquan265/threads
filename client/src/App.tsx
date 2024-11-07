import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import RootLayout from './pages/Root'
import AuthLayout from './pages/Auth'
import Home from './pages/Root/Home'
import SignInPage from './pages/Auth/SignIn'
import SignUpPage from './pages/Auth/SignUp'
import OnboardingPage from './pages/Auth/Onboarding'
import CreateThreadPage from './pages/Root/CreateThread'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/create-thread',
        element: <CreateThreadPage />
      }
    ]
  },
  {
    path: '/sign-in',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <SignInPage />
      }
    ]
  },
  {
    path: '/sign-up',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <SignUpPage />
      }
    ]
  },
  {
    path: '/onboarding',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <OnboardingPage />
      }
    ]
  }
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
