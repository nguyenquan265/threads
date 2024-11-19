import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'

type Props = {
  pageNumber: number
  isNext: boolean
  path: string
}

const Pagination = ({ pageNumber, isNext, path }: Props) => {
  const navigate = useNavigate()

  const handleNavigation = (type: 'prev' | 'next') => {
    let nextPageNumber = pageNumber

    if (type == 'prev') {
      nextPageNumber = Math.max(1, pageNumber - 1)
    } else if (type == 'next') {
      nextPageNumber = pageNumber + 1
    }

    if (nextPageNumber > 1) {
      navigate(`${path}?page=${nextPageNumber}`, { replace: true })
    } else {
      navigate(`${path}`, { replace: true })
    }
  }

  return (
    <div className='pagination'>
      <Button
        onClick={() => handleNavigation('prev')}
        disabled={pageNumber === 1}
        className='!text-small-regular text-light-2'
      >
        Prev
      </Button>
      <p className='text-small-semibold text-light-1'>{pageNumber}</p>
      <Button onClick={() => handleNavigation('next')} disabled={!isNext} className='!text-small-regular text-light-2'>
        Next
      </Button>
    </div>
  )
}

export default Pagination
