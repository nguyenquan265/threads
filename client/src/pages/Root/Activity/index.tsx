import { useGetUser, useGetUserActivities } from '@/apis/UserApi'
import ActivitySkeleton from '@/components/shared/ActivitySkeleton'
import { Link, Navigate } from 'react-router-dom'

const ActivityPage = () => {
  const { data: userInfo, isLoading: isGetUserLoading } = useGetUser()
  const { data: activities, isLoading: isGetActivitiesLoading } = useGetUserActivities(userInfo?._id)

  if (isGetUserLoading) {
    return null
  }

  if (!userInfo?.onboarded) {
    return <Navigate to='/onboarding' />
  }

  return (
    <section>
      <h1 className='head-text mb-10'>Activity</h1>

      <section className='mt-10 flex flex-col gap-5'>
        {isGetActivitiesLoading && <ActivitySkeleton />}

        {activities && activities?.length > 0 ? (
          activities?.map((activity) => (
            <Link key={activity._id} to={`/thread/${activity.parentId}`}>
              <article className='activity-card'>
                <img
                  src={activity.author.image}
                  alt='profile picture'
                  width={20}
                  height={20}
                  className='rounded-full object-cover'
                  loading='lazy'
                />

                <p className='!text-small-regular text-light-1'>
                  <span className='mr-1 text-primary-500'>{activity.author.name}</span> replied to your thread
                </p>
              </article>
            </Link>
          ))
        ) : (
          <p className='!text-base-regular text-light-3'>No activities yet</p>
        )}
      </section>
    </section>
  )
}

export default ActivityPage
