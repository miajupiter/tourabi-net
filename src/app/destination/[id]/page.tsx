"use client"

import React, { FC, Fragment, useState, useEffect } from 'react'
import Azerbaijan from './azerbaijan'
import China from './china'
import Kazakhstan from './kazakhstan'
import DestinationGridBox from '../DestinationGridBox'

export interface PageDestinationProps {
  params: { id: string }
}
const PageQwerty = ({ ...props }) => (
  <div>
    <img className='rounded-2xl' src={`https://miajupiter.com/media/tour-img01/${props.id}.jpg`} alt={`${props.id}`} />
    <h2 className='text-4xl mt-10 mb-10 capitalize '>{props.title}</h2>
    <div className='my-4'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab reiciendis eum deserunt sequi cum alias animi! Dolorum, corporis repellendus, perferendis laudantium in sunt aut maiores iste ab corrupti eos voluptatibus!</div>
    <div className='my-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum expedita sit commodi rerum. Facilis blanditiis necessitatibus beatae esse explicabo, repudiandae at a, atque eum delectus, quidem culpa similique modi ad.</div>
    <div className='my-4'>Non, tempore. Fuga veniam odio hic explicabo cum? Dicta culpa nihil, non qui repellendus dolorum mollitia soluta excepturi iure atque odit ipsum.</div>
  </div>
)


const PageDestination: FC<PageDestinationProps> = ({ params }: { params: { id: string } }) => {
  window.scrollTo(0, 0)

  return (
    <div className={`container my-20`}>

      {params.id == 'azerbaijan' && <Azerbaijan />}
      {params.id == 'china' && <China />}
      {params.id == 'kazakhstan' && <Kazakhstan />}
      {!['azerbaijan', 'china', 'kazakhstan'].includes(params.id) && <PageQwerty title={params.id} id={params.id} />}

      <div className='mt-20 mb-10'>
        <DestinationGridBox headingCenter={true} />
      </div>
    </div>
  )
}

export default PageDestination
