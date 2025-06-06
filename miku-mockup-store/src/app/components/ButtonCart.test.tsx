import { render, fireEvent } from '@testing-library/react'
import ButtonCart from './ButtonCart'
import { useCart } from '../contexts/CartContext'

// Mock CartContext
jest.mock('../contexts/CartContext', () => ({
  useCart: jest.fn(),
}))

describe('ButtonCart', () => {
  const addToCartMock = jest.fn()
  const mockProduct = {
    id: 1,
    name: 'Test Product',
    price: 10,
    image: '/test.jpg',
  }

  beforeEach(() => {
    ;(useCart as jest.Mock).mockReturnValue({
      addToCart: addToCartMock,
    })

    document.body.innerHTML = '<div class="cart-icon"></div>' // mock cart icon
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('calls addToCart when clicked', async () => {
    const { getByRole } = render(<ButtonCart product={mockProduct} />)

    const button = getByRole('button')
    fireEvent.click(button)

    // Wait for animation timeout
    await new Promise((r) => setTimeout(r, 600))

    expect(addToCartMock).toHaveBeenCalledWith(mockProduct)
  })
})
