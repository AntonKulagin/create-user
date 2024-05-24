import { useForm, SubmitHandler } from 'react-hook-form'
import cls from './UserForm.module.scss'
import { useAppDispatch } from '../../redux/hooks'
import { addUser } from '../../redux/slice'

type Inputs = {
  name: string
  username: string
  email: string
}

export const UserForm = () => {
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(addUser({ id: Date.now(), ...data }))
    reset()
  }

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)} className={cls.form}>
        <h1 style={{ textAlign: 'center' }}>Create User</h1>
        <div className={cls.form__input}>
          <input
            {...register('name', { required: true })}
            placeholder="Enter name"
          />
          {errors.name && (
            <span className={cls.form__error}>Name field is required</span>
          )}
        </div>
        <div className={cls.form__input}>
          <input
            {...register('username', { required: true })}
            placeholder="Enter username"
          />
          {errors.username && (
            <span className={cls.form__error}>Username field is required</span>
          )}
        </div>
        <div className={cls.form__input}>
          <input
            {...register('email', { required: true })}
            placeholder="Enter email"
          />
          {errors.email && (
            <span className={cls.form__error}>Email field is required</span>
          )}
        </div>

        <button className={cls.form__button} type="submit">
          Create
        </button>
      </form>
    </section>
  )
}
