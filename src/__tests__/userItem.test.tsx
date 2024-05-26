import { render, screen, fireEvent } from '@testing-library/react'
import { UserItem } from '../components/user-item'
import { deleteUser } from '../redux/slice'
import { IUser } from '../types/user'
import * as reduxHooks from '../redux/hooks'

const mockDispatch = jest.spyOn(reduxHooks, 'useAppDispatch')

const user: IUser = {
  id: 1,
  name: 'John Doe',
  username: 'johndoe',
  email: 'john@example.com',
}

beforeEach(() => {
  mockDispatch.mockClear()
})

describe('UserItem', () => {
  it('renders user information', () => {
    const dispatch = jest.fn()
    mockDispatch.mockReturnValue(dispatch)

    render(<UserItem user={user} />)

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('johndoe')).toBeInTheDocument()
    expect(screen.getByText('john@example.com')).toBeInTheDocument()
  })

  it('dispatches deleteUser action when name is clicked', () => {
    const dispatch = jest.fn()
    mockDispatch.mockReturnValue(dispatch)

    render(<UserItem user={user} />)

    fireEvent.click(screen.getByText('John Doe'))

    expect(dispatch).toHaveBeenCalledWith(deleteUser(1))
  })
})
