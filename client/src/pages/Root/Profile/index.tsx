import { useGetUser } from '@/apis/UserApi'
import ProfileHeader from '@/components/shared/ProfileHeader'
import ThreadsTab from '@/components/shared/ThreadsTab'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { profileTabs } from '@/helpers/constants'
import { useUser } from '@clerk/clerk-react'
import { Navigate, useParams } from 'react-router-dom'

const ProfilePage = () => {
  const { id } = useParams()
  const { data: userInfo, isLoading } = useGetUser(id)
  const { user } = useUser()

  if (isLoading || !user) {
    return null
  }

  if (!id) {
    if (!userInfo?.onboarded) {
      return <Navigate to='/onboarding' />
    }
  } else {
    if (!userInfo) {
      return (
        <section className='mt-9 flex flex-col gap-10'>
          <p className='no-result'>User not found</p>
        </section>
      )
    }

    if (id == user.id && !userInfo.onboarded) {
      return <Navigate to='/onboarding' />
    }

    if (!userInfo.onboarded) {
      return (
        <section className='mt-9 flex flex-col gap-10'>
          <p className='no-result'>This user has not completed onboarding yet.</p>
        </section>
      )
    }
  }

  return (
    <section>
      <ProfileHeader
        accountId={userInfo.clerkId}
        currentUserId={user.id}
        name={userInfo.name}
        username={userInfo.username}
        imgUrl={userInfo.image}
        bio={userInfo.bio}
      />

      <div className='mt-9'>
        <Tabs defaultValue='threads' className='w-full'>
          <TabsList className='tab'>
            {profileTabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.value} className='tab'>
                <img src={tab.icon} alt={tab.label} width={24} height={24} className='object-contain' loading='lazy' />
                <p className='max-sm:hidden'>{tab.label}</p>

                {tab.label === 'Threads' && (
                  <p className='ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2'>
                    {userInfo.threads.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value='threads' className='w-full text-light-1'>
            <ThreadsTab accountId={userInfo.clerkId} currentUserId={user.id} accountType='User' />
          </TabsContent>

          <TabsContent value='replies' className='w-full text-light-1'>
            <p className='no-result'>Future feature</p>
          </TabsContent>

          <TabsContent value='tagged' className='w-full text-light-1'>
            <p className='no-result'>Future feature</p>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

export default ProfilePage
