import React, { FC } from "react"

export interface CommonLayoutProps {
  children?: React.ReactNode
}

const CommonLayout: FC<CommonLayoutProps> = ({ children }) => {
  return (<>
    {children}
    
  </>

  )
}

export default CommonLayout
