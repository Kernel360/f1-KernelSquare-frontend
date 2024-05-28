"use client"

import Tag from "./Tag"
import { twMerge } from "tailwind-merge"
import { useEffect, useState, type ButtonHTMLAttributes } from "react"
import type { TechTag } from "@/interfaces/tech-tag"

export type SelectableTagType<T = TechTag> = {
  label: React.ReactNode
  value: T
}

type SelectPayloadKey<K extends string> = `${K}`

type SelectableTagOnSelectPayload<
  T = TechTag,
  K extends string = "tag",
> = Record<SelectPayloadKey<K>, SelectableTagType<T>> &
  Record<"willSelected", boolean>
export type SelectableTagOnSelect<T = TechTag, K extends string = "tag"> =
  | ((payload: SelectableTagOnSelectPayload<T, K>) => boolean)
  | ((payload: SelectableTagOnSelectPayload<T, K>) => Promise<boolean>)

export interface SelectableTagProps<T = TechTag, K extends string = "tag">
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onSelect"> {
  tag: SelectableTagType<T>
  tagKey: K
  onSelect: SelectableTagOnSelect<T, K>
  selected?: boolean
}

function SelectableTag<T = TechTag, K extends string = "tag">({
  tag,
  tagKey,
  className,
  selected = false,
  onSelect,
  children,
  ...props
}: SelectableTagProps<T, K>) {
  const [isSelected, setIsSelected] = useState(selected)

  const classNames = twMerge([
    "line-clamp-1 text-ellipsis pointerhover:hover:cursor-pointer",
    className,
    isSelected
      ? "bg-primary text-white pointerhover:hover:bg-[#02a35f]"
      : "bg-colorsLightGray pointerhover:hover:bg-colorsGray",
  ])

  const handleSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
    const payload = {
      willSelected: !selected,
      [tagKey as SelectPayloadKey<typeof tagKey>]: tag as SelectableTagType<T>,
    } as SelectableTagOnSelectPayload<T, K>

    if (onSelect(payload)) {
      setIsSelected((prev) => !prev)
    }
  }

  useEffect(() => {
    setIsSelected(selected)
  }, [selected])

  return (
    <Tag className={classNames} onClick={handleSelect} {...props}>
      {children ?? tag.toString()}
    </Tag>
  )
}

export default SelectableTag

SelectableTag.Loading = function SelectableTagLoading() {
  return (
    <Tag wrapperClassName="inline-flex align-top leading-none">
      <span className="skeleton !bg-clip-text leading-none text-transparent inline-flex items-center align-top h-5 text-base">
        태그
      </span>
    </Tag>
  )
}
