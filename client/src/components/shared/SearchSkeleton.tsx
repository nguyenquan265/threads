import { Skeleton } from '../ui/skeleton'

const SearchSkeleton = () => {
  return (
    <article className='user-card'>
      <Skeleton className='h-12 w-12 rounded-full' />

      <div className='space-y-3 flex-1'>
        <Skeleton className='h-5 w-[20%]' />

        <div className='space-y-2'>
          <Skeleton className='h-4 w-[10%]' />
        </div>
      </div>
    </article>
  )
}

export default SearchSkeleton
