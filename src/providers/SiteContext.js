import React, { createContext, useState } from 'react'
import { saveSites } from './ChromeAPI'

const SiteContext = createContext({})

export const SiteProvider = ({ children }) => {
  const [sites, setSites] = useState([])
  const save = async (sites) => saveSites(sites)
  const removeSite = async idx => {
    // Retain the old color
    const deleteSiteColor = sites[idx].color;
    const newSitesList = [
      ...sites.slice(0, idx),
      {
        title: '',
        url: '',
        color: deleteSiteColor,
        character: '-'
      },
      ...sites.slice(idx+1)
    ];
    setSites(newSitesList)
    await save(newSitesList)
  }

  return (
    <SiteContext.Provider
      value={{
        save,
        sites,
        setSites,
        removeSite
      }}
    >
      {children}
    </SiteContext.Provider>
  )
}

export default SiteContext
