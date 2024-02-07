"use client"

import { selectedTagListAtomFamily } from "@/recoil/atoms/tag"
import { useCallback, useEffect } from "react"
import { useRecoilState } from "recoil"
import type { TechTag } from "@/interfaces/tech-tag"

export interface TagListAtomParam {
  uniqueKey: string
  questionId?: number
}

export interface SelectCallback {
  callback?: (
    selectedTagList: Array<TechTag>,
  ) => void | ((selectedTagList: Array<TechTag>) => Promise<void>)
}

export type UseSelectTagListOption = TagListAtomParam &
  SelectCallback & { initialSelectedTagList?: Array<TechTag> }

export function useSelectTagList({
  uniqueKey,
  initialSelectedTagList,
  questionId,
  callback,
}: UseSelectTagListOption) {
  const [selectedTagList, setSelectedTagList] = useRecoilState(
    selectedTagListAtomFamily({
      uniqueKey,
      questionId,
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

  useEffect(() => {
    if (initialSelectedTagList) {
      // 현재는 문자열이므로, 객체간의 깊은 비교를 하지 않아도 됨
      if (selectedTagList.toString() !== initialSelectedTagList.toString()) {
        setSelectedTagList((prev) => [...initialSelectedTagList])
      }
    }
  }, []) /* eslint-disable-line */

  return {
    selectedTagList,
    select,
    unselect,
    clearSelectedTagList,
  }
}
