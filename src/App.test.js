import React from 'react'
import TestRenderer from 'react-test-renderer'
import App from './App'

describe('should render App', () => {
  it('should be able to mount the component', () => {
    const component = TestRenderer.create(<App />)

    expect(component.toJSON()).toMatchSnapshot()
  })
})
