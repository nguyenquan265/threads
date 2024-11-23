import { useNavigate } from 'react-router-dom'
import { Input } from '../ui/input'
import SearchIcon from '@/assets/search-gray.svg'
import { useEffect, useState } from 'react'

type Props = { path: string; text: string }

const SearchBar = ({ path, text }: Props) => {
  const [search, setSearch] = useState<string>('')
  const navigate = useNavigate()

  useEffect(() => {
    const delay = setTimeout(() => {
      if (search) {
        navigate(`${path}?q=${search}`)
      } else {
        navigate(path)
      }
    }, 300)

    return () => clearTimeout(delay)
  }, [search, path])

  return (
    <div className='searchbar'>
      <img src={SearchIcon} alt='search' width={24} height={24} className='object-contain' />
      <Input
        id='text'
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
        placeholder={text}
        className='no-focus searchbar_input'
      />
    </div>
  )
}

export default SearchBar
