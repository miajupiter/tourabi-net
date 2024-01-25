import React from "react"
import Image from "next/image"
// import LogoSvgLight from "./LogoSvgLight"
import LogoSvg from "./LogoSvg"
import Link from "next/link"
import { StaticImageData } from "next/image"
// import LogoPng from "../images/tourabi.png"
// import LogoSvg from "../images/tourabi.svg"

export interface LogoProps {
  img?: StaticImageData
  imgLight?: StaticImageData
  className?: string
  classNameImg?: string
}

const Logo: React.FC<LogoProps> = ({
  className = "",
  classNameImg=""
}) => {
  return (
    <Link
      href="/"
      className={`ttnc-logo inline-block text-primary-6000 focus:outline-none focus:ring-0 ${className}`}
    
    >
      {/* <Image
        src={LogoSvg}
        alt="tourabi"
        width={220}
        height={80}

      /> */}
      {/* <LogoSvgLight /> */}
      <LogoSvg  width={220} height={80} className={classNameImg}  />

    </Link>
  )
}

export default Logo
