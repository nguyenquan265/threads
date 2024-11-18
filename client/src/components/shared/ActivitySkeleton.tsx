import { Skeleton } from '../ui/skeleton'

const ActivitySkeleton = () => {
  return (
    <article className='activity-card'>
      <Skeleton className='h-5 w-5 rounded-full' />
      <Skeleton className='h-5 w-[30%]' />
    </article>
  )
}

export default ActivitySkeleton
