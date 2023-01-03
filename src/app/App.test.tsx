import React from 'react'
import { render, screen } from '@testing-library/react'
import Landing from './pages/HomePage'

test('renders learn react link', () => {
  render(<Landing />)

  const linkElement = screen.getByText(/translate/i)
  expect(linkElement).toBeInTheDocument()
})
