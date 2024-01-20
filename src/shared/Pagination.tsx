'use client'
import { CustomLink } from "@/data/types"
import React, { FC } from "react"
import twFocusClass from "@/utils/twFocusClass"
import Link from "next/link"
import { Route } from "@/routers/types"

// const DEMO_PAGINATION: CustomLink[] = [
//   {
//     label: "1",
//     href: "#",
//   },
//   {
//     label: "2",
//     href: "#",
//   },
//   {
//     label: "3",
//     href: "#",
//   },
//   {
//     label: "4",
//     href: "#",
//   },
// ]

export interface PaginationProps {
  className?: string
  pageNo: number
  pageSize?: number
  pageCount?: number
  totalDocs?: number
  urlPath?: string
}

const Pagination: FC<PaginationProps> = ({ className = "", urlPath = "/list", pageNo = 1, pageSize = 8, pageCount = 1, totalDocs = 0 }) => {

  const renderItem = (pag: CustomLink, isActive: boolean, key: any,) => {
    if (isActive) {
      // RETURN ACTIVE PAGINATION
      return (
        <span
          key={key}
          className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-primary-6000 text-white ${twFocusClass()}`}
        >
          {pag.label}
        </span>
      )
    }
    // RETURN UNACTIVE PAGINATION
    return (
      <a
        key={key}
        className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 ${twFocusClass()}`}
        href={pag.href as Route}
      >
        {pag.label}
      </a>
      // <Link
      //   key={key}
      //   className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 ${twFocusClass()}`}
      //   href={pag.href as Route}
      //   replace={true}
      // >
      //   {pag.label}
      // </Link>
    )
  }
  // const [pageButtons,setPageButtons]=useState<CustomLink[]>([])

  const calculateButtons = (urlPath = '', pageCount: number, pageSize: number): CustomLink[] => {
    var buttonList: CustomLink[] = []
    var i = 0
    while (i < pageCount) {
      const btn: CustomLink = {
        href: `${urlPath}?page=${i + 1}&pageSize=${pageSize}`,
        label: (i + 1).toString(),
        targetBlank: false
      }
      buttonList.push(btn)
      i++
    }
    return buttonList
  }

  const pageButtons: CustomLink[] = calculateButtons(urlPath, pageCount, pageSize)

  return (
    <nav
      className={`nc-Pagination inline-flex space-x-1 text-base font-medium ${className}`}
    >
      {pageButtons.map((btn, index) => renderItem(btn, (index + 1) === pageNo, index))}
    </nav>
  )
}

export default Pagination
