import React, { FC } from "react"
import Badge from "@/shared/Badge"
import convertNumbThousand from "@/utils/convertNumbThousand"
import Link from "next/link"
import Image from "next/image"

export interface LocationCardProps {
  className?: string
  _id: string
  title: string
  destination: string
  country: string
  imageSrc?: string
  width?: number
  height?: number
}

const LocationCard: FC<LocationCardProps> = ({
  className = "",
  _id,
  title,
  country,
  imageSrc,
  width = 400,
  height = 400
}) => {

  return (
    <Link
      href={`/locations/${_id}`}
      className={`nc-CardCategory6 relative  flex w-full group rounded-[4px] z-0 overflow-hidden ${className}`}
    >

      <div className="aspect-w-16 aspect-h-10 sm:aspect-h-12 xl:aspect-h-9 w-full h-0"></div>

      <Image
        fill
        src={imageSrc || ""}
        alt={title}
        title={title}
        // width={width}
        // height={height}
        sizes="(max-width: 400px) 100vw, 400px"
        className="aspect-ratio object-cover rounded-[4px] group-hover:scale-105 transition-transform durat11ion-31100"
      />
      <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 text-white">
        <span className="absolute inset-0 bg-gradient-to-t from-black/60"></span>
        <h2 className={`relative text-lg lg:text-xl font-semibold uppercase`}>{title}</h2>
        <span className={`relative block mt-1.5 text-sm text-neutral-100`}>
          {country}
        </span>
      </div>

    </Link>
  )
}

export default LocationCard

