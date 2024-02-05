"use client"

import { selectedTagListAtomFamily } from "@/recoil/atoms/tag"
import { useCallback, useEffect } from "react"
import { useRecoilState } from "recoil"
import type { TechTag } from "@/interfaces/tech-tag"

export interface TagListAtomParam {
  uniqueKey: string
  initialSelectedTagList?: Array<TechTag>
}

export interface SelectCallback {
  callback?: (
    selectedTagList: Array<TechTag>,
  ) => void | ((selectedTagList: Array<TechTag>) => Promise<void>)
}

export type UseSelectTagListOption = TagListAtomParam & SelectCallback

export function useSelectTagList({
  uniqueKey,
  initialSelectedTagList,
  callback,
}: UseSelectTagListOption) {
  const [selectedTagList, setSelectedTagList] = useRecoilState(
    selectedTagListAtomFamily({
      uniqueKey,
      initialSelectedTagList,
    }),
  )

  const select = useCallback(
    (tag: TechTag) => {
      setSelectedTagList((prev) => {
        if (callback) {
          setTimeout(() => callback([...prev, tag]), 0)
        }

        return [...prev, tag]
      })
    },
    [setSelectedTagList, callback],
  )

  const unselect = useCallback(
    (tag: TechTag) => {
      setSelectedTagList((prev) => {
        if (callback) {
          setTimeout(() => {
            callback(prev.filter((selectedTag) => selectedTag !== tag))
          }, 0)
        }

        return prev.filter((selectedTag) => selectedTag !== tag)
      })
    },
    [setSelectedTagList, callback],
  )

  const clearSelectedTagList = useCallback(() => {
    setSelectedTagList((prev) => [])
  }, [setSelectedTagList])

  return {
    selectedTagList,
    select,
    unselect,
    clearSelectedTagList,
  }
}
