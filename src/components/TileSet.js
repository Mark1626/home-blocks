import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import Tile from './Tile'
import SiteContext from '../providers/SiteContext'
import ConfigContext from '../providers/ConfigContext'
import { getSites, ensureValidSites } from '../providers/ChromeAPI'
import ConfigTile from './ConfigTile'

const TileSet = () => {
  const { sites, setSites } = useContext(SiteContext)
  const { quickConfig, quickConfigIndex } = useContext(ConfigContext)
  useEffect(() => {
    getSites()
      .then(sites => {
        setSites(ensureValidSites(sites))
      })
      .catch(e => {
        console.log('Error fetching sites', e)
        setSites(ensureValidSites([]))
      })
  }, [])

  return (
    <>
      <PageTileSet>
        {sites.map(({character, url, color, title}, index) => (
          <Tile
            key={index}
            index={index}
            character={character}
            url={url}
            color={color}
            title={title}
          />
        ))}
      </PageTileSet>
      {quickConfig && <ConfigTile index={quickConfigIndex} />}
    </>
  )
}

const PageTileSet = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin: 20px;
  padding: 0;
  font-size: 1.3rem;

  @media only screen and (min-width: 1000px) {
    .page-tile-set {
      width: 60vw;
    }
  }
`

export default TileSet
