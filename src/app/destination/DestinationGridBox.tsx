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
          <div className="col-span-12 sm:col-span-6 md:col-span-4 gap-6">
            <DestinationCard key={i} title={item.title} imageSrc={item.imageSrc || ''} id={item.id} />
          </div>
        ))}

      </div>

    </div>
  )
}

export default DestinationGridBox


//  <div className="col-span-12 sm:col-span-6 lg:col-span-4 flex">
//             <CardCategory6 taxonomy={DEMO_CATS_2[0]} />
//           </div>
//           <div className="col-span-12 sm:col-span-6 lg:col-span-4 grid grid-rows-2 gap-6">
//             <CardCategory6 taxonomy={DEMO_CATS_2[3]} />
//             <CardCategory6 taxonomy={DEMO_CATS_2[1]} />
//           </div>
//           <div className="col-span-12 sm:col-span-6 lg:col-span-4 flex">
//             <CardCategory6 taxonomy={DEMO_CATS_2[4]} />
//           </div>

//  <div className={`grid ${gridClassName} gap-5 sm:gap-6 md:gap-8`}>
//         {DESTINATION_LIST.map((item, i) => (
//           <DestinationCard key={i} title={item.title} imageSrc={item.imageSrc || ''} id={item.id} />
//         ))}
//       </div>