import React, { FC } from "react"

export interface CommonLayoutProps {
  children?: React.ReactNode
}

const CommonLayout: FC<CommonLayoutProps> = ({ children }) => {
  return (<>
    {children}
    <div className='absolute bottom-2 w-full '>
      <div className='flex justify-center space-x-3 text-slate-100'>
        <a href='#'>Tour Abi</a>
        <a href='#'>About</a>
        <a href='#'>Contact</a>
        <a href='#'>Help</a>
      </div>
    </div>
  </>

  )
}

export default CommonLayout
