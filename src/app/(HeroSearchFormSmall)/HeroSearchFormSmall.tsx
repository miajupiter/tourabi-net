"use client"

import React, { FC, useEffect, useState } from "react"
import { SearchFormFields } from "../tours/type"
import SearchForm from "./SearchForm"

export interface HeroSearchFormSmallProps {
  className?: string
  defaultFieldFocus?: SearchFormFields
}

const HeroSearchFormSmall: FC<HeroSearchFormSmallProps> = ({
  className = "",
  defaultFieldFocus,
}) => {


  return (
    <div
      className={`nc-HeroSearchFormSmall ${className}`}
      data-nc-id="HeroSearchFormSmall"
    >
      <div className="mt-2">
        <SearchForm defaultFieldFocus={defaultFieldFocus} />
      </div>
    </div>
  )
}

export default HeroSearchFormSmall
