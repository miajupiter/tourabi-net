"use client"

import Link from 'next/link'
import React, { FC, useEffect, useState } from "react"

export interface PaginationProps {
  className?: string
  pageNo: number

  pageCount: number

  onPageClick?: Function
}

const Pagination: FC<PaginationProps> = ({
  className = "",
  pageNo,
  pageCount,
  onPageClick
}) => {
  const buttonList = Array.from(Array(pageCount).keys())
  

  return (
    <nav className={`inline-flex space-x-1 text-base font-medium`}>
      {buttonList.map((no, index) => {
        no = no + 1
        if (no == pageNo) {
          return <span
            key={index}
            className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-blue-600 text-neutral-100 dark:text-neutral-100`}
          >
            {no}
          </span>
        } else {
          return <Link
            href="#"
            key={index}
            className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-300 border border-neutral-900 text-neutral-600 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700`}
            onClick={(e) => {
              e.preventDefault()
              if (onPageClick != undefined) {
                onPageClick(no)
              }
            }}
          >{no}</Link>
        }
      })}
    </nav>
  )
}

export default Pagination
