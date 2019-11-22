import React from 'react'
import TileSet from './TileSet'
import SiteContext from '../providers/SiteContext'
import {render} from '@testing-library/react'

describe('should render TileSet', () => {
  it('should be able to mount the component', () => {
    const sites = [
      {
        title: 'Dummy1',
        url: 'dummy_url_1',
        character: 'D_1',
        color: '#f3f3f3',
      },{
        title: 'Dummy2',
        url: 'dummy_url_2',
        character: 'D_2',
        color: '#f2f2f2',
      },
    ];
    const {container} = render(
      <SiteContext.Provider value={sites}>
        <TileSet />
      </SiteContext.Provider>
    )

    expect(container).toMatchSnapshot()
  })
})
