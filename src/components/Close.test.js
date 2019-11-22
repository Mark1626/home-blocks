import React from 'react'
import { render } from '@testing-library/react'
import Close from './Close'

describe('should render Close', () => {
  it('should be able to mount the component', () => {
    const container = render(<Close />)

    expect(container).toMatchSnapshot()
  })
})
