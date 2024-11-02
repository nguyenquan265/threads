import AccountProfileForm from '@/components/forms/AccountProfileForm'
import Loader from '@/components/shared/Loader'
import { useUser } from '@clerk/clerk-react'

const OnboardingPage = () => {
  const { isSignedIn, user, isLoaded } = useUser()
  const userInfo = {}

  if (!isLoaded) {
    return (
      <div className='bg-dark-1 min-h-screen w-full flex items-center justify-center'>
        <Loader />
      </div>
    )
  }

  if (!isSignedIn || !user) {
    window.location.href = '/sign-in'
    return null
  }

  const userData = {
    id: user.id,
    objectId: userInfo?._id,
    username: userInfo?.username || user.username,
    name: userInfo?.name || user.firstName || '',
    bio: userInfo?.bio || '',
    image: userInfo?.image || user.imageUrl
  }

  return (
    <div className='bg-dark-1 min-h-screen w-full'>
      <main className='mx-auto flex max-w-3xl flex-col justify-start px-10 py-20'>
        <h1 className='head-text'>Onboarding</h1>
        <p className='mt-3 text-base-regular text-light-2'>Complete your profile now, to use Threads.</p>

        <section className='mt-9 bg-dark-2 p-10'>
          <AccountProfileForm user={userData} btnTitle='continue' />
        </section>
      </main>
    </div>
  )
}

export default OnboardingPage
