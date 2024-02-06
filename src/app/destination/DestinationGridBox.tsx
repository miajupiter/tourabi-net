import DestinationCard from "./DestinationCard"
import Heading from "@/shared/Heading"
// import { TaxonomyType } from "@/data/types";
import { DESTINATION_LIST, DestinationType } from '@/data/destinations'
import React from "react"

export interface DestinationGridBoxProps {
  headingCenter?: boolean
  className?: string
  gridClassName?: string
}


const DestinationGridBox: React.FC<DestinationGridBoxProps> = ({
  headingCenter = true,
  className = "",
  gridClassName = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
}) => {

  return (
    <div className={`nc-DestinationGridBox relative ${className}`}>
      <Heading
        desc="Let's discover great tours with together"
        isCenter={headingCenter}
      >
        Destinations
      </Heading>
      <div className="grid grid-cols-12 gap-6">
        {DESTINATION_LIST.map((item, i) => (
          <div key={i.toString()} className="col-span-12 sm:col-span-6 md:col-span-4 gap-6">
            <DestinationCard  title={item.title} imageSrc={item.imageSrc || ''} id={item.id} />
          </div>
        ))}

      </div>

    </div>
  )
}

export default DestinationGridBox
