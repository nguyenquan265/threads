import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import RootLayout from './pages/Root/layout'
import AuthLayout from './pages/Auth/layout'
import Home from './pages/Root/Home'
import SignInPage from './pages/Auth/SignIn'
import SignUpPage from './pages/Auth/SignUp'
import OnboardingPage from './pages/Auth/Onboarding'
import CreateThreadPage from './pages/Root/CreateThread'
import ThreadPage from './pages/Root/Thread'
import ProfilePage from './pages/Root/Profile'
import SearchPage from './pages/Root/Search'
import ActivityPage from './pages/Root/Activity'
import CommunitiesPage from './pages/Root/Communities'
import SingleCommunityPage from './pages/Root/SingleCommunity'

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
      },
      {
        path: '/thread/:id',
        element: <ThreadPage />
      },
      {
        path: '/profile',
        element: <ProfilePage />
      },
      {
        path: '/profile/edit'
      },
      {
        path: '/profile/:id',
        element: <ProfilePage />
      },
      {
        path: '/search',
        element: <SearchPage />
      },
      {
        path: '/activity',
        element: <ActivityPage />
      },
      {
        path: '/communities',
        element: <CommunitiesPage />
      },
      {
        path: '/communities/:id',
        element: <SingleCommunityPage />
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
