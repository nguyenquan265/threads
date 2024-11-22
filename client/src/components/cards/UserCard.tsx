import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'

type Props = {
  id: string
  name: string
  username: string
  imgUrl: string
  personType: string
}

const UserCard = ({ id, name, username, imgUrl, personType }: Props) => {
  const navigate = useNavigate()
  const isCommunity = personType === 'Community'

  return (
    <article className='user-card'>
      <div className='user-card_avatar'>
        <img src={imgUrl} alt='avatar' width={48} height={48} className='rounded-full' loading='lazy' />

        <div className='flex-1 text-ellipsis'>
          <h4 className='text-base-semibold text-light-1 truncate w-40'>{name}</h4>
          <p className='text-small-medium text-gray-1 truncate w-40'>{username}</p>
        </div>
      </div>

      <Button
        className='user-card_btn'
        onClick={() => {
          if (isCommunity) {
            navigate(`/community/${id}`)
          } else {
            navigate(`/profile/${id}`)
          }
        }}
      >
        View
      </Button>
    </article>
  )
}

export default UserCard
