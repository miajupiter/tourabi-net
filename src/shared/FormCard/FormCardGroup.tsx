"use client"
import { ReactNode, useState } from "react"

interface FormCardGroupProps {
  children: (handleClick: () => void, open: boolean) => ReactNode
  activeCondition: boolean,
  id: string,
}

const FormCardGroup = ({
  children,
  activeCondition,
  id,
}: FormCardGroupProps) => {

  const [open, setOpen] = useState<boolean>(activeCondition)

  const handleClick = () => {

    setOpen(!open)

  }

  return <>{children(handleClick, open)}</>
}

export default FormCardGroup
