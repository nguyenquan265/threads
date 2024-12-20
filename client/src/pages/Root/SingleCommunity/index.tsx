import { useGetCommunityDetails } from '@/apis/CommunityApi'
import { useGetUser } from '@/apis/UserApi'
import UserCard from '@/components/cards/UserCard'
import ProfileHeader from '@/components/shared/ProfileHeader'
import ThreadsTab from '@/components/shared/ThreadsTab'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { communityTabs } from '@/helpers/constants'
import { Navigate, useParams } from 'react-router-dom'

const SingleCommunityPage = () => {
  const { id } = useParams()
  const { data: userInfo, isLoading: isGetUserLoading } = useGetUser()
  const { data: communityDetails, isLoading: isCommunityDetailsLoading } = useGetCommunityDetails(id)

  if (isGetUserLoading) {
    return null
  }

  if (!userInfo?.onboarded) {
    return <Navigate to='/onboarding' />
  }

  if (isCommunityDetailsLoading) {
    return null
  }

  if (!communityDetails) {
    return (
      <section className='mt-9 flex flex-col gap-10'>
        <p className='no-result'>Community not found</p>
      </section>
    )
  }

  return (
    <section>
      <ProfileHeader
        accountId={communityDetails.createdBy.clerkId}
        currentUserId={userInfo.clerkId}
        name={communityDetails.name}
        username={communityDetails.username}
        imgUrl={communityDetails.image}
        bio={communityDetails.bio}
        type='Community'
      />

      <div className='mt-9'>
        <Tabs defaultValue='threads' className='w-full'>
          <TabsList className='tab'>
            {communityTabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.value} className='tab'>
                <img src={tab.icon} alt={tab.label} width={24} height={24} className='object-contain' loading='lazy' />
                <p className='max-sm:hidden'>{tab.label}</p>

                {tab.label === 'Threads' && (
                  <p className='ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2'>
                    {communityDetails.threads.length}
                  </p>
                )}

                {tab.label === 'Members' && (
                  <p className='ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2'>
                    {communityDetails.members.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value='threads' className='w-full text-light-1'>
            <ThreadsTab accountId={communityDetails.clerkId} currentUserId={userInfo.clerkId} accountType='Community' />
          </TabsContent>

          <TabsContent value='members' className='w-full text-light-1'>
            <section className='mt-9 flex flex-col gap-10'>
              {communityDetails.members.map((member) => (
                <UserCard
                  key={member._id}
                  id={member.clerkId}
                  imgUrl={member.image}
                  name={member.name}
                  username={member.username}
                  personType='User'
                />
              ))}
            </section>
          </TabsContent>

          <TabsContent value='requests' className='w-full text-light-1'>
            <p className='no-result'>Future feature</p>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

export default SingleCommunityPage
