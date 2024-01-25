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
  // let CardComponentName = CardCategoryBox1;
  // switch (categoryCardType) {
  //   case "card1":
  //     CardComponentName = CardCategoryBox1;
  //     break;

  //   default:
  //     CardComponentName = CardCategoryBox1;
  // }

  return (
    <div className={`nc-DestinationGridBox relative ${className}`}>
      <Heading
        desc="Let's discover great tours with together"
        isCenter={headingCenter}
      >
        Destinations
      </Heading>
      <div className={`grid ${gridClassName} gap-5 sm:gap-6 md:gap-8`}>
        {DESTINATION_LIST.map((item, i) => (
          <DestinationCard key={i} title={item.title} imageSrc={item.imageSrc || ''} id={item.id} />
        ))}
      </div>
    </div>
  )
}

export default DestinationGridBox
