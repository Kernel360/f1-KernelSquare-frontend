"use client"

import { ButtonHTMLAttributes, useEffect, useState } from "react"
import Tag from "./Tag"
import { twMerge } from "tailwind-merge"
import { TechTag } from "@/interfaces/tech-tag"

interface SelectableTagProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onSelect"> {
  tag: TechTag
  onSelect: ({
    selected,
  }: {
    selected: boolean
    tag: TechTag
  }) => void | Promise<void>
  initialSelected?: boolean
}

function SelectableTag({
  tag,
  children,
  className,
  initialSelected = false,
  onSelect,
  ...props
}: SelectableTagProps) {
  const [selected, setSelected] = useState<boolean>(initialSelected)

  const classNames = twMerge([
    "line-clamp-1 text-ellipsis",
    className,
    selected
      ? "bg-secondary text-white hover:bg-[#606160]"
      : "bg-colorsLightGray",
  ])

  const handleSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelected((prev) => !prev)
  }

  useEffect(() => {
    setSelected(initialSelected)
  }, [initialSelected])

  useEffect(() => {
    onSelect({ selected, tag })
  }, [selected]) /* eslint-disable-line */

  return (
    <Tag className={classNames} onClick={handleSelect} {...props}>
      {children ?? tag.toString()}
    </Tag>
  )
}

export default SelectableTag
