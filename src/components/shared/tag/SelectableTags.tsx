"use client"

import { TechTag } from "@/interfaces/tech-tag"
import SelectableTag, {
  SelectableTagOnSelect,
  SelectableTagType,
} from "./SelectableTag"
import { twMerge } from "tailwind-merge"
import { useId } from "react"
import Highlight from "react-highlight-words"

export interface SelectableTagsProps<T = TechTag, K extends string = "tag"> {
  tags: SelectableTagType<T>[]
  tagKey: K
  isSelected: (tag: SelectableTagType<T>) => boolean
  onSelect: SelectableTagOnSelect<T, K>
  className?: string
  highlightKeyword?: {
    keyword: string
  }
}

function SelectableTags<T = TechTag, K extends string = "tag">({
  tags,
  tagKey,
  isSelected,
  onSelect,
  className,
  highlightKeyword,
}: SelectableTagsProps<T, K>) {
  const idSeperator = useId()

  const classNames = twMerge([
    "flex w-full flex-wrap gap-x-2 gap-y-2",
    className,
  ])

  if (highlightKeyword) {
    return (
      <ul className={classNames}>
        {tags.map((tag, index) => {
          return (
            <li key={`${idSeperator}${index}${tag.value}`}>
              <SelectableTag<T, K>
                tag={tag}
                tagKey={tagKey}
                onSelect={onSelect}
                selected={isSelected(tag)}
              >
                {isSelected(tag) ? (
                  tag.label
                ) : (
                  <Highlight
                    highlightClassName="bg-transparent text-primary"
                    searchWords={highlightKeyword.keyword.split(" ")}
                    textToHighlight={
                      typeof tag.label === "string"
                        ? tag.label
                        : (tag.value as string)
                    }
                  />
                )}
              </SelectableTag>
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <ul className={classNames}>
      {tags.map((tag, index) => {
        return (
          <li key={`${idSeperator}${index}${tag.value}`}>
            <SelectableTag<T, K>
              tag={tag}
              tagKey={tagKey}
              onSelect={onSelect}
              selected={isSelected(tag)}
            >
              {tag.label}
            </SelectableTag>
          </li>
        )
      })}
    </ul>
  )
}

export default SelectableTags
