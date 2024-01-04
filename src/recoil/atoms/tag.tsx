import { techTagList } from "@/constants/editor"
import { TechTag } from "@/interfaces/tech-tag"
import { atom, selector } from "recoil"

type Tag = TechTag
type TagList = Array<Tag>

// about renderTagList
export const renderableTagListAtom = atom<{
  renderableTagList: TagList
  targetRenderTagList: TagList
}>({
  key: "renderable-tag-list-atom",
  default: {
    renderableTagList: [],
    targetRenderTagList: [],
  },
})

export const renderedTagListSelector = selector({
  key: "rendered-tag-list-selector",
  get(opts) {
    return opts.get(renderableTagListAtom).targetRenderTagList
  },
})

// about selectedTagList
export const selectedTagListAtom = atom<TagList>({
  key: "selected-tag-list-atom",
  default: [],
})

// tagListState(control)
export const tagListState = selector({
  key: "tag-list-state-selector",
  get: ({ getCallback }) => {
    const loadRenderableTagList = getCallback(
      ({ set, snapshot }) =>
        async () => {
          const renderableTagList = techTagList

          set(renderableTagListAtom, {
            renderableTagList: [...renderableTagList],
            targetRenderTagList: [...renderableTagList],
          })
        },
    )

    const getRenderedTagList = getCallback(({ snapshot }) => async () => {
      return await snapshot.getPromise(renderedTagListSelector)
    })

    const getSelectedTagList = getCallback(({ snapshot }) => async () => {
      return await snapshot.getPromise(selectedTagListAtom)
    })

    const renderableTagListInit = getCallback(
      ({ set, snapshot }) =>
        async (tagList: TagList) => {
          const renderableTagListSnapshot = await snapshot.getPromise(
            renderableTagListAtom,
          )

          set(renderableTagListAtom, {
            ...renderableTagListSnapshot,
            renderableTagList: [...tagList],
            targetRenderTagList: [...tagList],
          })
        },
    )

    const selectedTagListInit = getCallback(
      ({ set }) =>
        async (tagList: TagList) => {
          set(selectedTagListAtom, [...tagList])
        },
    )

    const resetRenderTagList = getCallback(({ set, snapshot }) => async () => {
      const renderableTagListAtomSnapshot = await snapshot.getPromise(
        renderableTagListAtom,
      )

      set(renderableTagListAtom, {
        ...renderableTagListAtomSnapshot,
        targetRenderTagList: [
          ...renderableTagListAtomSnapshot.renderableTagList,
        ],
      })
    })

    const renderTagList = getCallback(
      ({ set, snapshot }) =>
        async (tagList: TagList) => {
          const renderableTagListAtomSnapshot = await snapshot.getPromise(
            renderableTagListAtom,
          )

          set(renderableTagListAtom, {
            ...renderableTagListAtomSnapshot,
            targetRenderTagList: [...tagList],
          })
        },
    )

    const selectTag = getCallback(
      ({ set, snapshot }) =>
        async (selectedTag: Tag) => {
          const selectedTagListSnapshot = await snapshot.getPromise(
            selectedTagListAtom,
          )

          const nonDuplicatedTagList = Array.from(
            new Set([...selectedTagListSnapshot, selectedTag]),
          )

          set(selectedTagListAtom, [...nonDuplicatedTagList])
        },
    )

    const unSelectTag = getCallback(
      ({ set, snapshot }) =>
        async (unSelectTargetTag: Tag) => {
          const selectedTagListSnapshot = await snapshot.getPromise(
            selectedTagListAtom,
          )

          const resultSelectedTagList = selectedTagListSnapshot.filter(
            (selectedTag) => selectedTag !== unSelectTargetTag,
          )

          set(selectedTagListAtom, [...resultSelectedTagList])
        },
    )

    const clearSelectedTagList = getCallback(({ set }) => async () => {
      set(selectedTagListAtom, [])
    })

    const clearTagList = getCallback(({ set }) => async () => {
      set(renderableTagListAtom, {
        renderableTagList: [],
        targetRenderTagList: [],
      })

      set(selectedTagListAtom, [])
    })

    return {
      getRenderedTagList,
      getSelectedTagList,
      loadRenderableTagList,
      renderableTagListInit,
      selectedTagListInit,
      renderTagList,
      resetRenderTagList,
      clearTagList,
      clearSelectedTagList,
      selectTag,
      unSelectTag,
    }
  },
})
