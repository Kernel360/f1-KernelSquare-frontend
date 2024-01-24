"use client"

import { selectedTagListAtomFamily } from "@/recoil/atoms/tag"
import { useCallback } from "react"
import { useRecoilState } from "recoil"
import type { TechTag } from "@/interfaces/tech-tag"

export interface TagListAtomParam {
  uniqueKey: string
  initialTagList?: Array<TechTag>
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
  initialTagList,
  initialSelectedTagList,
  callback,
}: UseSelectTagListOption) {
  const [tagList, setTagList] = useRecoilState(
    selectedTagListAtomFamily({
      uniqueKey,
      initialTagList,
      initialSelectedTagList,
    }),
  )

  const select = useCallback(
    (tag: TechTag) => {
      setTagList((prev) => {
        if (callback) {
          setTimeout(() => callback([...prev.selectedTagList, tag]), 0)
        }

        return {
          ...prev,
          selectedTagList: [...prev.selectedTagList, tag],
        }
      })
    },
    [setTagList, callback],
  )

  const unselect = useCallback(
    (tag: TechTag) => {
      setTagList((prev) => {
        if (callback) {
          setTimeout(() => {
            callback(
              prev.selectedTagList.filter((selectedTag) => selectedTag !== tag),
            )
          }, 0)
        }

        return {
          ...prev,
          selectedTagList: prev.selectedTagList.filter(
            (selectedTag) => selectedTag !== tag,
          ),
        }
      })
    },
    [setTagList, callback],
  )

  const searchTagList = useCallback(
    (keyword: string) => {
      if (!keyword) {
        setTagList((prev) => ({
          ...prev,
          tagList: initialTagList ?? [],
        }))

        return
      }

      const result = initialTagList?.filter((tag) => {
        const regExp = new RegExp(`${keyword}`, "gi")

        return regExp.test(tag)
      })

      setTagList((prev) => ({
        ...prev,
        tagList: result ?? [],
      }))
    },
    [initialTagList, setTagList],
  )

  const clearSelectedTagList = useCallback(() => {
    setTagList((prev) => ({
      ...prev,
      selectedTagList: [],
    }))
  }, [setTagList])

  return {
    tagList,
    select,
    unselect,
    searchTagList,
    clearSelectedTagList,
  }
}
