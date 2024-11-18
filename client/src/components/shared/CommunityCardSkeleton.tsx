import { Skeleton } from '../ui/skeleton'

const CommunityCardSkeleton = () => {
  return (
    <article className='community-card'>
      <div className='flex flex-wrap items-center gap-3'>
        <Skeleton className='h-12 w-12 rounded-full' />

        <div className='w-[50%]'>
          <Skeleton className='h-3 w-[40%]' />
          <Skeleton className='mt-2 h-3 w-[30%]' />
        </div>
      </div>

      <Skeleton className='mt-4 h-3 w-[20%]' />
    </article>
  )
}

export default CommunityCardSkeleton
