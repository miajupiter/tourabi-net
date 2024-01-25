import React, { FC } from 'react'
import { DESTINATION_LIST, DestinationType} from '@/data/destinations'
import Link from 'next/link'
export interface PageDestinationListProps { }

const PageDestinationList: FC<PageDestinationListProps> = ({ }) => {
  return (
    <div className={`container mt-10 mb-12 `}>
      <h1>Destinations</h1>
      {DESTINATION_LIST.map((e: DestinationType, index) => (<p key={index}>
        <Link href={`/destination/${e.id}`}>{e.title} - id: {e.id}</Link>
      </p>))}
    </div>
  )
}

export default PageDestinationList
