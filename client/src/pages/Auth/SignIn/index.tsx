import { SignIn } from '@clerk/clerk-react'

const SignInPage = () => {
  return (
    <div className='h-screen w-full flex items-center justify-center bg-dark-1'>
      <SignIn />
    </div>
  )
}

export default SignInPage
