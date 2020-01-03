import React from 'react'
import TileSet from './components/TileSet'
import { SiteProvider } from './providers/SiteContext'
import { ConfigProvider } from './providers/ConfigContext'
import './global.css'

const App = () => {
  return (
    <ConfigProvider>
      <SiteProvider>
        <div className="inline">
          <TileSet />
        </div>
      </SiteProvider>
    </ConfigProvider>
  )
}

export default App
