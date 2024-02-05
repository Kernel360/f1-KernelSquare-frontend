import { atom, atomFamily } from "recoil"
import type { TechTag } from "@/interfaces/tech-tag"

type Tag = TechTag
type TagList = Array<Tag>

export const selectedTagListAtomFamily = atomFamily<
  TagList,
  {
    uniqueKey: string
    initialSelectedTagList?: TagList
  }
>({
  key: "selectedTagListAtomFamily",
  default(param) {
    return param.initialSelectedTagList ? [...param.initialSelectedTagList] : []
  },
})

export const searchTagAtom = atom<{ keyword: string; page: number }>({
  key: "search-tag-list",
  default: {
    keyword: "",
    page: 0,
  },
})
