import { useUser } from '@clerk/clerk-react'

const OnboardingPage = () => {
  const { isSignedIn, user, isLoaded } = useUser()

  if (!isSignedIn || !isLoaded) {
    return <div>Loading...</div>
  }

  if (!user) {
    return null
  }

  console.log(user)

  return (
    <div className='bg-dark-1'>
      <main className='mx-auto flex max-w-3xl flex-col justify-start px-10 py-20'>
        <h1 className='head-text'>Onboarding</h1>
        <p className='mt-3 text-base-regular text-light-2'>Complete your profile now, to use Threads.</p>
      </main>
    </div>
  )
}

export default OnboardingPage
