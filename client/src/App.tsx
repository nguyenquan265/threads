import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './pages/Root'
import Home from './pages/Root/Home'
import SignInPage from './pages/Auth/SignIn'
import SignUpPage from './pages/Auth/SignUp'
import OnboardingPage from './pages/Auth/Onboarding'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      }
    ]
  },
  {
    path: '/sign-in',
    element: <SignInPage />
  },
  {
    path: '/sign-up',
    element: <SignUpPage />
  },
  {
    path: '/onboarding',
    element: <OnboardingPage />
  }
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
