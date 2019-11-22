import React from 'react'
import TileSet from './components/TileSet'
import SiteContext from './providers/SiteContext'
import {useSites} from './providers/ChromeAPI';
import './global.css'

const App = () => {

  const sites = useSites();

  return (
  <div className="inline">
    <SiteContext.Provider value={sites}>
      <TileSet/>
    </SiteContext.Provider>
  </div>
  );
}

export default App
