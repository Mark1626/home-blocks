import React from 'react'
import styled from 'styled-components'
import Tile from './Tile'
import SiteContext from '../providers/SiteContext'

const TileSet = () => {
  return (
    <PageTileSet>
      <SiteContext.Consumer>
        {tiles => (
          <For each="tile" of={tiles} index="index">
            <Tile
              key={index}
              character={tile.character}
              url={tile.url}
              color={tile.color}
              title={tile.title}
            />
          </For>
        )}
      </SiteContext.Consumer>
    </PageTileSet>
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
