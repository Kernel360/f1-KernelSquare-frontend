"use client"

import { ButtonHTMLAttributes, useCallback, useEffect, useState } from "react"
import Tag from "./Tag"
import { twMerge } from "tailwind-merge"
import { TechTag } from "@/interfaces/tech-tag"
import { useRecoilValue } from "recoil"
import { tagListState } from "@/recoil/atoms/tag"

interface SelectableTagProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onSelect"> {
  tag: TechTag
  onBeforeSelect?: (control: {
    maybeSelectedTagList: Array<TechTag>
    maybeSelected: boolean
    next: () => void
    disallow: () => void
  }) => void
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
  onBeforeSelect,
  onSelect,
  ...props
}: SelectableTagProps) {
  const [selected, setSelected] = useState<boolean>(initialSelected)

  const { getSelectedTagList } = useRecoilValue(tagListState)

  const classNames = twMerge([
    "line-clamp-1 text-ellipsis",
    className,
    selected
      ? "bg-secondary text-white hover:bg-[#606160]"
      : "bg-colorsLightGray",
  ])

  // 클릭시 setState로 select상태를 바꾼다
  const next = useCallback(() => {
    setSelected((prev) => !prev)
  }, [])

  // 클릭시 아무것도 하지 않는 함수를 호출하여 select 상태를 바꾸지 않는다
  const disallow = useCallback(() => {}, [])

  // 클릭 핸들러: select 상태를 관리
  const handleSelect = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onBeforeSelect) {
      const selectedTagList = await getSelectedTagList()

      onBeforeSelect({
        maybeSelectedTagList: !selected
          ? [...selectedTagList, tag]
          : [...selectedTagList],
        maybeSelected: !selected,
        next,
        disallow,
      })

      return
    }

    next()
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
