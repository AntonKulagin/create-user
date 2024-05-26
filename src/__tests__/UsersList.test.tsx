import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import axios from 'axios'
import { UsersList } from '../components/users-list'
import * as utils from '../utils/uniqList'
import * as reduxHooks from '../redux/hooks'

const mockUniq = jest.spyOn(utils, 'uniqList')
const mockAxios = jest.spyOn(axios, 'get')
const mockDispatch = jest.spyOn(reduxHooks, 'useAppDispatch')
const mockSelector = jest.spyOn(reduxHooks, 'useAppSelector')

afterEach(() => {
  jest.restoreAllMocks()
})

describe('UsersList', () => {
  it('должен загружать и отображать пользователей при нажатии на кнопку', async () => {
    const users = [
      {
        id: 1,
        name: 'User One',
        username: 'userone',
        email: 'userone@example.com',
      },
      {
        id: 2,
        name: 'User Two',
        username: 'usertwo',
        email: 'usertwo@example.com',
      },
    ]
    const dispatch = jest.fn()
    mockDispatch.mockReturnValue(dispatch)

    mockAxios.mockResolvedValue({ data: users })
    mockUniq.mockReturnValue(users)
    mockSelector.mockReturnValue(users)

    render(<UsersList />)

    fireEvent.click(screen.getByText('Fetch Users'))

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledTimes(1)
      expect(screen.getByText('User One')).toBeInTheDocument()
      expect(screen.getByText('User Two')).toBeInTheDocument()
    })
  })
})
