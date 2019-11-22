import React from 'react'
import {render} from '@testing-library/react'
import Tile from './Tile'

describe('should render Tile', () => {
  it('should be able to mount the component', () => {
    const {container} = render(<Tile
      url="dummy-url"
      color="#f3f3f3"
      character="D"
      title="Dummy" />)

    expect(container).toMatchSnapshot()
  })
})
