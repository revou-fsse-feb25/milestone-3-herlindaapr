import { render, screen, fireEvent } from '@testing-library/react'
import Navbar from './Navbar'
import { useCart } from '../contexts/CartContext'
import { useSession, signOut } from 'next-auth/react'

// Mocks
jest.mock('../contexts/CartContext', () => ({
  useCart: jest.fn(),
}))

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
  signOut: jest.fn(),
}))

describe('Navbar', () => {
  const mockCart = { totalItems: 3 }

  beforeEach(() => {
    (useCart as jest.Mock).mockReturnValue(mockCart)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders logo and cart icon with item count', () => {
    ;(useSession as jest.Mock).mockReturnValue({
      data: null,
      status: 'unauthenticated',
    })

    render(<Navbar />)

    // Logo
    const logo = screen.getByAltText('Logo Apps')
    expect(logo).toBeInTheDocument()

    // Cart link (with aria-label)
    const cartLink = screen.getByRole('link', { name: 'Cart' })
    expect(cartLink).toHaveAttribute('href', '/cart')

    // Cart item count
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('shows Sign Up and Login when not authenticated', () => {
    ;(useSession as jest.Mock).mockReturnValue({
      data: null,
      status: 'unauthenticated',
    })

    render(<Navbar />)

    expect(screen.getByText('Sign Up')).toBeInTheDocument()
    expect(screen.getByText('Login')).toBeInTheDocument()
  })

  it('shows Home when authenticated as user', () => {
    ;(useSession as jest.Mock).mockReturnValue({
      data: {
        user: {
          name: 'Test User',
          role: 'user',
        },
      },
      status: 'authenticated',
    })

    render(<Navbar />)

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Test User')).toBeInTheDocument()
  })

  it('shows Dashboard when authenticated as admin', () => {
    ;(useSession as jest.Mock).mockReturnValue({
      data: {
        user: {
          name: 'Admin User',
          role: 'admin',
        },
      },
      status: 'authenticated',
    })
  
    render(<Navbar />)
  
    const dashboardLink = screen.getByRole('link', { name: 'Dashboard' })
    expect(dashboardLink).toBeInTheDocument()
  
    expect(screen.getByText('Admin User')).toBeInTheDocument()
    expect(screen.getByText('(Admin)')).toBeInTheDocument()
  })
  

  it('calls signOut on Sign out button click', () => {
    ;(useSession as jest.Mock).mockReturnValue({
      data: {
        user: {
          name: 'Logged In User',
          role: 'user',
        },
      },
      status: 'authenticated',
    })

    render(<Navbar />)

    const signOutButton = screen.getByText('Sign out')
    fireEvent.click(signOutButton)

    expect(signOut).toHaveBeenCalledWith({ callbackUrl: '/login' })
  })
})
