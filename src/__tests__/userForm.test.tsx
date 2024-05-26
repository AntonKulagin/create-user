import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { UserForm } from '../components/user-form/UserForm'
import * as reduxHooks from '../redux/hooks'
import { addUser } from '../redux/slice'

jest.mock('../redux/hooks')

const mockedDispatch = jest.spyOn(reduxHooks, 'useAppDispatch')

describe('UserForm', () => {
  it('should create useForm with empty fields', () => {
    const component = render(<UserForm />)

    expect(component).toMatchSnapshot()
  })
  it('should dispatch actions', async () => {
    const dispatch = jest.fn()
    mockedDispatch.mockReturnValue(dispatch)

    render(<UserForm />)

    const nameInput = screen.getByPlaceholderText(
      'Enter name'
    ) as HTMLInputElement
    const usernameInput = screen.getByPlaceholderText(
      'Enter username'
    ) as HTMLInputElement
    const emailInput = screen.getByPlaceholderText(
      'Enter email'
    ) as HTMLInputElement
    const createButton = screen.getByText('Create')

    fireEvent.change(nameInput, { target: { value: 'Test Name' } })
    fireEvent.change(usernameInput, { target: { value: 'testusername' } })
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })

    fireEvent.click(createButton)

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith(
        addUser({
          id: expect.any(Number),
          name: 'Test Name',
          username: 'testusername',
          email: 'test@example.com',
        })
      )
    })
  })

  it('отображает сообщение об ошибке для незаполненных полей', async () => {
    render(<UserForm />)

    const createButton = screen.getByText('Create')

    fireEvent.click(createButton)

    await waitFor(() => {
      expect(screen.getByText('Name field is required')).toBeInTheDocument()
      expect(screen.getByText('Username field is required')).toBeInTheDocument()
      expect(screen.getByText('Email field is required')).toBeInTheDocument()
    })
  })
})
