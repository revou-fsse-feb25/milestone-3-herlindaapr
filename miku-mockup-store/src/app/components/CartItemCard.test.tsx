import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import CartItemCard from './CartItemCard'
import { useCart } from '../contexts/CartContext'

// Mock the CartContext
jest.mock('../contexts/CartContext', () => ({
  useCart: jest.fn(),
}))

describe('CartItemCard', () => {
  const addToCartMock = jest.fn()
  const removeFromCartMock = jest.fn()

  const mockItem = {
    quantity: 2,
    product: {
      id: 1,
      name: 'Test Product',
      price: 25.5,
      image: '/test.jpg',
    },
  }

  beforeEach(() => {
    ;(useCart as jest.Mock).mockReturnValue({
      addToCart: addToCartMock,
      removeFromCart: removeFromCartMock,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders product name, price, and quantity', () => {
    render(<CartItemCard item={mockItem} />)

    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('$25.50')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('calls removeFromCart when the left button is clicked', () => {
    render(<CartItemCard item={mockItem} />)

    const removeButton = screen.getByLabelText('Remove item')
    fireEvent.click(removeButton)

    expect(removeFromCartMock).toHaveBeenCalledWith(mockItem.product.id)
  })

  it('calls addToCart when the right button is clicked', async () => {
    render(<CartItemCard item={mockItem} />)

    const addButton = screen.getByLabelText('Add item')
    fireEvent.click(addButton)

    expect(addToCartMock).toHaveBeenCalledWith(mockItem.product)

    // Wait for animation state to clear
    await waitFor(() => {
      expect(screen.getByLabelText('Add item')).not.toBeDisabled()
    }, { timeout: 500 })
  })
})
