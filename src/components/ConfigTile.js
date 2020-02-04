import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import Close from './Close'
import ConfigContext from '../providers/ConfigContext'
import SiteContext from '../providers/SiteContext'

// TODO Validate max-length of title, char
const ConfigTile = ({ index }) => {
  const { setQuickConfig } = useContext(ConfigContext)
  const { save, sites, setSites } = useContext(SiteContext)
  const newSites = [...sites]
  const handleChange = (e, property, fn, value) => {
    e.preventDefault()
    fn(value)
    clearTimeout(debounce)
    var debounce = setTimeout(() => {
      newSites[index][property] = value
    }, 100)
  }
  const closeConfig = () => setQuickConfig(false)

  const saveConfig = () => {
    save(newSites).catch(e => console.log('Error while saving', e))
    setSites(newSites)
    closeConfig()
  }

  const handleClose = () => saveConfig()
  const {
    title: initialTitle,
    url: initialUrl,
    character: initialCharacter,
    color: initialColor,
  } = sites[index]
  const [title, setTitle] = useState(initialTitle)
  const [url, setUrl] = useState(initialUrl)
  const [color, setColor] = useState(initialColor)
  const [character, setCharacter] = useState(initialCharacter)

  return (
    <QuickConfig>
      <ConfigList>
        <div className="top-buttons">
          <Close onClick={() => closeConfig()}>✖</Close>
        </div>
        <BlockTitle>Config Site</BlockTitle>
        Title:{' '}
        <input
          name="config-title"
          type="text"
          placeholder="Enter site title"
          onChange={e => handleChange(e, 'title', setTitle, e.target.value)}
          value={title || ''}
        />
        URL:{' '}
        <input
          name="config-url"
          type="text"
          placeholder="Enter URL"
          onChange={e => handleChange(e, 'url', setUrl, e.target.value)}
          value={url || ''}
        />
        Character:{' '}
        <input
          name="config-character"
          type="text"
          placeholder="Enter Character"
          onChange={e =>
            handleChange(e, 'character', setCharacter, e.target.value)
          }
          value={character || ''}
        />
        Color:{' '}
        <input
          name="config-color"
          type="color"
          onChange={e => handleChange(e, 'color', setColor, e.target.value)}
          value={color || '#ffffff'}
        />
        <div className="bottom-buttons">
          <button onClick={() => handleClose()}>Save &amp; Close</button>
        </div>
      </ConfigList>
    </QuickConfig>
  )
}

const QuickConfig = styled.div`
  position: fixed;
  z-index: 100;
  top: 0;
  width: 100%;
`

const ConfigList = styled.div`
  margin: auto;
  margin-top: 20vh;
  border: 2px solid;
  padding: 13px 25px;
  width: fit-content;
  width: -moz-fit-content;
  height: fit-content;
  width: -moz-fit-content;
  background-color: #fff;
  font-size: 1rem;

  input {
    display: block;
    width: 175px;
  }

  input[type='color'] {
    padding: 0;
    height: 35px;
  }
`

const BlockTitle = styled.div`
  width: 100%;
  text-align: center;
  padding: 2px;
  font-size: 1.13rem;
`

export default ConfigTile
