import React, { FC } from "react"
import { TaxonomyType } from "@/data/types"
import Badge from "@/shared/Badge"
import convertNumbThousand from "@/utils/convertNumbThousand"
import Link from "next/link"
import Image from "next/image"

export interface DestinationCardProps {
  className?: string
  id: string
  title: string
  imageSrc?: string
}

const DestinationCard: FC<DestinationCardProps> = ({
  className = "",
  id,
  title,
  imageSrc
}) => {

  return (
    <Link
      href={`/destination/${id}`}
      className={`nc-CardCategoryBox1 relative flex items-center p-3 sm:p-6 [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ]  ${className}`}
    >
      <Badge
        className="absolute right-2 top-2"
        color="gray"
        name={convertNumbThousand(216)}
      />

      <div className="relative flex-shrink-0 w-24 h-24 rounded-full overflow-hidden">
        <Image
          src={imageSrc || ""}
          fill
          alt=""
          sizes="(max-width: 400px) 100vw, 400px"
        />
      </div>
      <div className="ml-4 flex-grow overflow-hidden">
        <h2 className="text-base font-medium">
          <span className="line-clamp-1">{title}</span>
        </h2>
        <span
          className={`block mt-2 text-sm text-neutral-500 dark:text-neutral-400`}
        >
          {/* 19 minutes drive */}
        </span>
      </div>
    </Link>
  )
}

export default DestinationCard
