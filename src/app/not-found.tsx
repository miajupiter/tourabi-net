import React from "react"
import I404Png from "@/images/404-notfound.png"
import Image from "next/image"
import ButtonPrimary from "@/shared/ButtonPrimary"
import ButtonThird from "@/shared/ButtonThird"
import Button from "@/shared/Button"

const Page404 = () => (
  <div className="nc-Page404">
    <div className="container relative pt-5 pb-16 lg:pb-20 lg:pt-5">
      {/* HEADER */}
      <header className="text-center max-w-2xl mx-auto space-y-2">
        <div className='flex justify-center'>
        <Image src={I404Png} alt="not-found" />
        </div>
        {/* <span className="block text-sm text-neutral-800 sm:text-base dark:text-neutral-200 tracking-wider font-medium"> */}
        <span className="block text-sm text-neutral-800 dark:text-neutral-200 tracking-wider ">
          {`Page not found`}{" "}
        </span>
        <div className="pt-8">
          <Button href="/" fontSize='text-4xl' >⬅️</Button>
        </div>
      </header>
    </div>
  </div>
)

export default Page404
