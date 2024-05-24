import axios from 'axios'
import { useState } from 'react'
import { addUsersFromFetch } from '../../redux/slice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { UserItem } from '../user-item'
import cls from './UersList.module.scss'
import { uniqList } from '../../utils/uniqList'

export const UsersList = () => {
  const [isLoading, setIsLoading] = useState(false)
  const users = useAppSelector((state) => state.users.users)
  const dispatch = useAppDispatch()

  const handleFetch = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users'
      )
      const data = uniqList([...users, ...response.data])
      dispatch(addUsersFromFetch(data))
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section>
      <h2 style={{ textAlign: 'center', marginBottom: '0.3rem' }}>
        Users List
      </h2>
      {!users.length && (
        <h4 style={{ textAlign: 'center' }}>(list is empty)</h4>
      )}
      <ul className={cls.list}>
        {users &&
          users.map((user) => (
            <li key={user.id}>
              <UserItem user={user} />
            </li>
          ))}
      </ul>
      <div>
        <button
          onClick={handleFetch}
          disabled={isLoading}
          className={cls.list__button}
          style={{ width: '100%' }}
        >
          Fetch Users
        </button>
      </div>
    </section>
  )
}
