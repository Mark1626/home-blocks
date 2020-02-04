import React, { useContext } from 'react'
import styled from 'styled-components'
import Close from './Close'
import ConfigContext from '../providers/ConfigContext'
import SiteContext from '../providers/SiteContext'

const Tile = ({ index, url, character, color, title }) => {
  const { setQuickConfigIndex, setQuickConfig } = useContext(ConfigContext)
  const { removeSite } = useContext(SiteContext)
  const handleClear = async (event, index) => {
    event.preventDefault()
    removeSite(index)
  }
  const handleClick = (event, index) => {
    event.preventDefault()
    setQuickConfig(true)
    setQuickConfigIndex(index)
  }
  return (
    <>
      <PageTile>
        <PageTileBlock
          color={color}
          onClick={event => handleClick(event, index)}
        >
          <TopButtons>{url !== '' && <Close onClick={event => handleClear(event, index)} />}</TopButtons>
          <PageTileChar>{character}</PageTileChar>
          <PageTileTitle>{title}</PageTileTitle>
        </PageTileBlock>
      </PageTile>
    </>
  )
}

const TopButtons = styled.div`
  position: relative;
  width: 100%;
  height: 25px;
  margin-bottom: 10px;
`;

const PageTileChar = styled.span`
  display: block;
  margin: 5px auto;
  padding: 2px;
  font-size: 2rem;
  text-align: center;
  text-transform: capitalize;
`

const PageTileTitle = styled.span`
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
  padding: 20px 0;
`

const PageTileBlock = styled.div`
  margin: 5px;
  padding: 10px;
  height: 130px;
  max-width: 200px;
  border-radius: 15px;
  background: ${props => props.color};
  transition: transform 100ms ease;

  &:hover {
    transform: scale(1.2);
  }
`

const PageTile = styled.div`
  flex-basis: 150px;
  width: fit-content;
  width: -moz-fit-content;
  height: fit-content;
  height: -moz-fit-content;
  color: #000;

  &:hover {
    color: #000;
    text-decoration: none;
  }
  &e:visited {
    color: #000;
  }
`

export default Tile
