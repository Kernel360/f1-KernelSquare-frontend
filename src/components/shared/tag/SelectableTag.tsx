"use client"

import Tag from "./Tag"
import { twMerge } from "tailwind-merge"
import { toast } from "react-toastify"
import { maximumSelectableError } from "./SelectableTagList"
import type { ButtonHTMLAttributes } from "react"
import type { TechTag } from "@/interfaces/tech-tag"

interface SelectableTagProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onSelect"> {
  tag: TechTag
  onSelect: ({
    selected,
  }: {
    selected: boolean
    tag: TechTag
  }) => void | Promise<void>
  selected?: boolean
}

function SelectableTag({
  tag,
  children,
  className,
  selected = false,
  onSelect,
  ...props
}: SelectableTagProps) {
  const classNames = twMerge([
    "line-clamp-1 text-ellipsis",
    className,
    selected
      ? "bg-secondary text-white hover:bg-[#606160]"
      : "bg-colorsLightGray",
  ])

  const handleSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      onSelect({ selected: !selected, tag })
    } catch (error) {
      if (error instanceof Error) {
        // @ts-ignore
        if (error.cause?.type === maximumSelectableError.cause!.type) {
          const { maximum } = error.cause as any

          toast.error(`기술 태그는 최대 ${maximum}개 선택 가능합니다`, {
            position: "top-center",
          })
        }
      }
    }
  }

  return (
    <Tag className={classNames} onClick={handleSelect} {...props}>
      {children ?? tag.toString()}
    </Tag>
  )
}

export default SelectableTag
