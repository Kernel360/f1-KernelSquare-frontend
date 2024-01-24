import { atomFamily } from "recoil"
import type { TechTag } from "@/interfaces/tech-tag"

type Tag = TechTag
type TagList = Array<Tag>

export const selectedTagListAtomFamily = atomFamily<
  { tagList: TagList; selectedTagList: TagList },
  {
    uniqueKey: string
    initialTagList?: Array<TechTag>
    initialSelectedTagList?: Array<TechTag>
  }
>({
  key: "selectedTagListAtomFamily",
  default(param) {
    const { initialTagList, initialSelectedTagList } = param

    if (initialSelectedTagList && !initialTagList) {
      return {
        tagList: [],
        selectedTagList: [],
      }
    }

    if (initialTagList) {
      if (initialSelectedTagList) {
        return {
          tagList: initialTagList,
          selectedTagList: initialSelectedTagList.filter((tag) =>
            initialTagList.includes(tag),
          ),
        }
      }

      return {
        tagList: initialTagList,
        selectedTagList: [],
      }
    }

    return {
      tagList: [],
      selectedTagList: [],
    }
  },
})
