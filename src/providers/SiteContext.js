import React, { createContext, useState } from 'react'
import { saveSites } from './ChromeAPI'

const SiteContext = createContext({})

export const SiteProvider = ({ children }) => {
  const [sites, setSites] = useState([])
  const save = async () => saveSites(sites)

  return (
    <SiteContext.Provider
      value={{
        save,
        sites,
        setSites,
      }}
    >
      {children}
    </SiteContext.Provider>
  )
}

export default SiteContext
