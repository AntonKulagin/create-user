import { FC } from 'react'
import { IUser } from '../../types/user'
import cls from './UserItem.module.scss'
import { useAppDispatch } from '../../redux/hooks'
import { deleteUser } from '../../redux/slice'

interface UserProps {
  user: IUser
}

export const UserItem: FC<UserProps> = ({ user }) => {
  const dispatch = useAppDispatch()
  const handleDelete = (id: number) => {
    dispatch(deleteUser(id))
  }
  return (
    <div className={cls.item}>
      <div className={cls.item__body}>
        <div
          className={cls.item__name}
          onClick={handleDelete.bind(null, user.id)}
        >
          {user.name}
        </div>
        <div>
          <div>{user.username}</div>
          <div>{user.email}</div>
        </div>
      </div>
    </div>
  )
}
