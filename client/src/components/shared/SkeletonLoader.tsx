import { Skeleton } from '../ui/skeleton'

const SkeletonLoader = () => {
  return (
    <div className='flex items-start space-x-4 rounded-lg bg-dark-2 p-7'>
      {/* Avatar skeleton */}
      <Skeleton className='h-12 w-12 rounded-full' />

      <div className='space-y-3 flex-1'>
        {/* Username skeleton */}
        <Skeleton className='h-5 w-[120px]' />

        {/* Content skeleton - two lines */}
        <div className='space-y-2'>
          <Skeleton className='h-4 w-[90%]' />
        </div>

        {/* Action buttons skeleton */}
        <div className='flex space-x-4 pt-2'>
          <Skeleton className='h-8 w-8 rounded-full' />
          <Skeleton className='h-8 w-8 rounded-full' />
          <Skeleton className='h-8 w-8 rounded-full' />
          <Skeleton className='h-8 w-8 rounded-full' />
        </div>
      </div>
    </div>
  )
}

export default SkeletonLoader
