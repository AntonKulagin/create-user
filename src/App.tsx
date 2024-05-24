import { UserForm } from './components/user-form'
import { UsersList } from './components/users-list'
import cls from './App.module.scss'

function App() {
  return (
    <div className={cls.container}>
      <UserForm />
      <UsersList />
    </div>
  )
}

export default App
