import React, { createContext, useState } from 'react'

const ConfigContext = createContext({})

export const ConfigProvider = ({ children }) => {
  const [quickConfig, setQuickConfig] = useState(false)
  const [quickConfigIndex, setQuickConfigIndex] = useState(-1)

  return (
    <ConfigContext.Provider
      value={{
        quickConfigIndex,
        quickConfig,
        setQuickConfigIndex,
        setQuickConfig,
      }}
    >
      {children}
    </ConfigContext.Provider>
  )
}

export default ConfigContext
