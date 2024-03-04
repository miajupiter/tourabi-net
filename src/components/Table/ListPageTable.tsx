import Link from 'next/link'
import { FC } from 'react'


export interface ListPageTableProps {
  columns: any[],
  onRenderHeader?: (th: any, colIndex: number) => void
  onRenderRow?: (tr: any, colItem: any | string, colIndex: number, rowIndex: number) => void
  addNewButton?: {
    href: string,
    title?: string,
    onClick?: (event: any) => void
  }
  rowEditButton?: {
    href: string,
    title?: string,
    onClick?: (rowItem: any, index: number) => void
  }
  docs: any[]
  page: number
  pageCount: number
  pageSize: number
  totalDocs: number
  className?: string
  tableClassName?: string
  theadClassName?: string
  theadTrClassName?: string
  theadTrTdClassName?: string
  tbodyClassName?: string
  tbodyTrClassName?: string
  tbodyTrTdClassName?: string
  rowCustomButton?: any
}

const ListPageTable: FC<ListPageTableProps> = ({
  columns, onRenderHeader, onRenderRow, addNewButton, rowEditButton, docs,
  page, pageCount, pageSize, totalDocs,
  className = "border-opacity-20", tableClassName,
  theadClassName = "border-b border-opacity-15 ",
  theadTrClassName, tbodyClassName, tbodyTrClassName, tbodyTrTdClassName, theadTrTdClassName,
  rowCustomButton
}) => {

  const RowComponent = (rowItem: any, index: number) => {
    return <>
      <tr key={index}
        className={`h-16 border-b border-[#ddd] dark:border-strokedark border-opacity-15
        ${index % 2 == 0 ? "bg-slate-50 dark:bg-[#0e1425]" : "bg-slate-200 bg-opacity-90 dark:bg-[#0c1222]"}
        ${tbodyTrClassName}`}>
        {columns.map((th: any, colIndex: number) => <>
          <td key={colIndex} className={`px-2 py-2 font-medium ${tbodyTrTdClassName}`}>
            {onRenderRow && <>{onRenderRow(rowItem, th, colIndex, index)}</>}
            {!onRenderRow && typeof th == 'string' && <>{rowItem[th]}</>}
            {/* {!onRenderRow && typeof th!='string' && <>{({...rowItem})=>(th)}</>} */}
          </td>
        </>)}
        {(addNewButton || rowEditButton || rowCustomButton) && <>
          <td className="px-2 py-2 text-center">
            {rowEditButton && rowItem && <>
              <Link
                href={(rowEditButton && rowEditButton.href.replace(/(\$|){_id}|(\$|){id}|(\$|){slug}/g, (rowItem._id || '')) )}
                className='py-2 px-3 rounded-md bg-slate-600 text-neutral-100 shadow hover:bg-neutral-700'
                title={rowEditButton.title || 'Edit'}
                onClick={(e) => {
                  if (rowEditButton.onClick) {
                    e.preventDefault()
                    rowEditButton.onClick(rowItem, index)
                  }
                }}
              >
                <i className="fa-regular fa-pen-to-square text-lg"></i>
              </Link>
            </>}

            {rowCustomButton && <>{rowCustomButton}</>}
          </td>
        </>}
      </tr>
    </>
  }

  return <>
    <div className={`relative overflow-x-auto shadow-md rounded-md border border-stroke dark:border-strokedark border-opacity-40 ${className}`}>
      <table className={`w-full table-auto ${tableClassName}`}>
        {/* <thead className={`text-slate-900 dark:text-slate-100 bg-slate-300 dark:bg-slate-700 ${theadClassName}`}> */}
        <thead className={`${theadClassName}`}>
          <tr className={`h-12 ${theadTrClassName || ''}`}>
            {columns.map((th: any, index: number) => <>
              <th className={`ps-3 pe-2 py-2 font-semibold ${theadTrTdClassName || ''}`}>
                {onRenderHeader && <>{onRenderHeader(th, index)}</>}
                {!onRenderHeader && <>{th}</>}
              </th>
            </>)}
            {addNewButton && <>
              <th className="w-[90px] font-medium">
                <Link
                  href={addNewButton.href || '#'}
                  className={`py-2 px-3 rounded-md bg-blue-700 text-neutral-100 hover:bg-blue-900 shadow-default`}
                  title={addNewButton.title || 'New'}
                  onClick={(e) => {
                    if (addNewButton.onClick) {
                      e.preventDefault()
                      addNewButton.onClick(e)
                    }
                  }}
                >
                  <i className="fa-regular fa-square-plus text-lg"></i>
                </Link>
              </th>
            </>}
          </tr>
        </thead>
        {docs && <>
          <tbody className={`${tbodyClassName}`}>
            {docs.map((item: any, index) => RowComponent(item, index))}
          </tbody>
        </>}
      </table>
    </div>
  </>
}

export default ListPageTable