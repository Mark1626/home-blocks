import React, { createContext, useState } from 'react'

const ConfigContext = createContext({})

export const ConfigProvider = ({ children }) => {
  const [quickConfig, setQuickConfig] = useState(false)
  const [quickConfigIndex, setQuickConfigIndex] = useState(-1)
  const [config, setConfig] = useState(false)

  return (
    <ConfigContext.Provider
      value={{
        config,
        quickConfigIndex,
        quickConfig,
        setConfig,
        setQuickConfigIndex,
        setQuickConfig,
      }}
    >
      {children}
    </ConfigContext.Provider>
  )
}

export default ConfigContext
