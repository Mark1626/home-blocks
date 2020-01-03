import thenChrome from 'then-chrome'
import {useEffect, useState} from 'react'

const colors = [
  '#fcf3af',
  '#fba058',
  '#31cdd4',
  '#ffd1c6',
  '#70a4d8',
  '#9de0fc',
  '#c9bff4',
  '#30dca6',
  '#ffa3bb',
  '#a3c4fd',
]

export const ensureValidSites = sites => {
  for (var i = 0; i < 20; ++i) {
    if (!sites[i]) {
      sites.push({
        title: '',
        url: '',
        color: colors[Math.floor(Math.random() * 10)],
        character: '-',
      })
    } else if (!sites[i].title) {
      sites[i].title = ''
      sites[i].character = '-'
    }
  }
  return sites
}

/**
 * Fetch sites from Chrome Browser Extension API
 */
export const getSites = async () => {
  const results = await thenChrome.storage.sync.get(['page-topSites'])
  if (typeof results['page-topSites'] === 'undefined') {
    results['page-topSites'] = []
  }
  return results['page-topSites'].slice(0, 20)
}

export const saveSites = async (siteList) => {
  return new thenChrome.storage.sync.set({'page-topSites': siteList});
}
