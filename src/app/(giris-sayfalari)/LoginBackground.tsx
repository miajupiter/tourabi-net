"use client"
import React, { FC, useEffect, useState } from "react"
// import imagePng from "@/images/travelhero2.png";
import Image from "next/image"
import ButtonPrimary from "@/shared/ButtonPrimary"
import ButtonSecondary from '@/shared/ButtonSecondary'
import { useInterval } from 'react-use'
import ButtonThird from '@/shared/ButtonThird'
import Button from '@/shared/Button'

export interface LoginBackgroundProps {
  className?: string
}
const SLIDE_IMAGES = [
  'https://tourabi.s3.eu-central-1.amazonaws.com/destinations/russia/moscow-red-square.jpg',
  'https://tourabi.s3.eu-central-1.amazonaws.com/destinations/silk-road.jpg',
  'https://tourabi.s3.eu-central-1.amazonaws.com/destinations/kyrgyzstan.jpg',
  'https://tourabi.s3.eu-central-1.amazonaws.com/central-asia/mogolistan-gobi-desert01.jpg',
  'https://tourabi.s3.eu-central-1.amazonaws.com/central-asia/mogolistan-gobi-desert02.jpg'
]
const LoginBackground: FC<LoginBackgroundProps> = ({ className = "" }) => {

  const [slideIndex, setSlideIndex] = useState(0)

  const randomIndex=()=>{
    return Math.round(Math.random() * (SLIDE_IMAGES.length - 1))
  }
  const slideInterval = useInterval(() => {
    // var rnd = randomIndex()
    // if(SLIDE_IMAGES[rnd]==slideImg){
    //   rnd=randomIndex()
    // }
    // setSlideImg(SLIDE_IMAGES[rnd])
    if(slideIndex==SLIDE_IMAGES.length-1){
      setSlideIndex(0)
    }else{
      setSlideIndex(slideIndex+1)
    }
  }, 7000)




  return (
      <div className="relative h-[100vh] ms-auto w-full ">
        <Image
          fill

          className="absolute inset-0 object-cover top-0 start-0 end-0 bottom-0"
          src={SLIDE_IMAGES[slideIndex]}
          alt="hero"
          // width={900}
          // height={600}
          sizes="(max-width: 100%) 100vw, 100vh"
          priority
        />
      </div>

  )
}

export default LoginBackground
