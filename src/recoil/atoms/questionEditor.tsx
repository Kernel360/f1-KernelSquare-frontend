import { DeleteImageResponse } from "@/interfaces/dto/upload/delete-image.dto"
import { TechTag } from "@/interfaces/tech-tag"
import { deleteImage } from "@/service/upload"
import { onSubmitQuestion } from "@/util/actions/form"
import { findImageLinkUrlFromMarkdown, getImageIdFromLink } from "@/util/editor"
import { AxiosResponse } from "axios"
import { atom, selector } from "recoil"
import { tagListState } from "./tag"

interface QuestionEditorState {
  title: string
  content: string
  fileUploadImageLinks: Array<string>
  skills: Array<TechTag>
}

export const fileUploadImageLinksSelector = selector({
  key: "question-editor-file-upload-image-link-selector",
  get: ({ get, getCallback }) => {
    const fileUploadImageLinks = get(questionEditorAtom).fileUploadImageLinks

    const getFileUploadImageLinks = getCallback(({ snapshot }) => async () => {
      return (await snapshot.getPromise(questionEditorAtom))
        .fileUploadImageLinks
    })

    const addFileUploadImageLinks = getCallback(
      ({ set, snapshot }) =>
        async (links: string) => {
          const questionEditorSnapshot = await snapshot.getPromise(
            questionEditorAtom,
          )

          const nonDuplicatedImageLinks = Array.from([
            ...questionEditorSnapshot.fileUploadImageLinks,
            links,
          ])

          set(questionEditorAtom, {
            ...questionEditorSnapshot,
            fileUploadImageLinks: [...nonDuplicatedImageLinks],
          })
        },
    )

    const clearFileUploadImageLinks = getCallback(
      ({ set, snapshot }) =>
        async () => {
          const fileUploadImageSnapshot = await get(
            fileUploadImageLinksSelector,
          ).getFileUploadImageLinks()

          if (fileUploadImageSnapshot.length) {
            const removeTargetIdList = fileUploadImageSnapshot.map(
              (imageLink) => getImageIdFromLink(imageLink),
            )

            await Promise.allSettled([
              ...removeTargetIdList.map((removeTargetId) =>
                deleteImage({ id: removeTargetId! }),
              ),
            ])
          }

          const questionEditorSnapshot = await snapshot.getPromise(
            questionEditorAtom,
          )

          set(questionEditorAtom, {
            ...questionEditorSnapshot,
            fileUploadImageLinks: [],
          })
        },
    )

    const resetFileUploadImageLinks = getCallback(
      ({ set, snapshot }) =>
        async () => {
          const questionEditorSnapshot = await snapshot.getPromise(
            questionEditorAtom,
          )

          set(questionEditorAtom, {
            ...questionEditorSnapshot,
            fileUploadImageLinks: [],
          })
        },
    )

    const removeUnusedFileUploadImage = getCallback(
      ({ set, snapshot }) =>
        async () => {
          const questionEditorStateSnapshot = await snapshot.getPromise(
            questionEditorAtom,
          )

          const fileUploadImageLinksSnapshot = await getFileUploadImageLinks()

          const allUploadImageLinks = findImageLinkUrlFromMarkdown(
            questionEditorStateSnapshot.content,
          )

          const removeTargetIdList = fileUploadImageLinksSnapshot
            .filter(
              (fileUploadImageUrl) =>
                !allUploadImageLinks?.includes(fileUploadImageUrl),
            )
            .map((imageLink) => getImageIdFromLink(imageLink))

          if (removeTargetIdList.length) {
            const promiseResult = await Promise.allSettled([
              ...removeTargetIdList.map((removeTargetId) =>
                deleteImage({ id: removeTargetId! }),
              ),
            ])

            const idRegExp = /(?<=\/image\/)(.*)/g

            const successRemoveImageLinks = (
              promiseResult.filter(
                (result) => result.status === "fulfilled",
              ) as Array<
                PromiseFulfilledResult<AxiosResponse<DeleteImageResponse, any>>
              >
            ).map((result) => {
              const id = result.value.config.url!.match(idRegExp)![0]

              return fileUploadImageLinksSnapshot.find(
                (imageLink) => getImageIdFromLink(imageLink) === id,
              )
            })

            console.log({ successRemoveImageLinks })

            const resultFileUploadImageLink =
              fileUploadImageLinksSnapshot.filter(
                (imageLink) => !successRemoveImageLinks?.includes(imageLink),
              )

            console.log({
              fileUploadImageLinksSnapshot,
              resultFileUploadImageLink,
            })

            const questionEditorSnapshot = await snapshot.getPromise(
              questionEditorAtom,
            )

            set(questionEditorAtom, {
              ...questionEditorSnapshot,
              fileUploadImageLinks: [...resultFileUploadImageLink],
            })
          }
        },
    )

    return {
      fileUploadImageLinks,
      getFileUploadImageLinks,
      addFileUploadImageLinks,
      removeUnusedFileUploadImage,
      clearFileUploadImageLinks,
      resetFileUploadImageLinks,
    }
  },
})

export const questionEditorAtom = atom<QuestionEditorState>({
  key: "question-editor-state-atom",
  default: {
    title: "",
    content: "",
    fileUploadImageLinks: [],
    skills: [],
  },
})

export const questionEditorLoadedAtom = atom<boolean>({
  key: "question-editor-loaded-atom",
  default: false,
})

export const questionEditorState = selector({
  key: "question-editor-state-selector",
  get: ({ get, getCallback }) => {
    const setQuestionEditorLoaded = getCallback(
      ({ set, snapshot }) =>
        async (loaded: boolean) => {
          await snapshot.getPromise(questionEditorLoadedAtom)

          set(questionEditorLoadedAtom, loaded)
        },
    )

    const getQuestionEditorLoaded = getCallback(({ snapshot }) => async () => {
      return await snapshot.getPromise(questionEditorLoadedAtom)
    })

    const getQuestionEditorState = getCallback(({ snapshot }) => async () => {
      return await snapshot.getPromise(questionEditorAtom)
    })

    const updateQuestionEditorState = getCallback(
      ({ set, snapshot }) =>
        async (payload: Partial<QuestionEditorState>) => {
          const questionEditorStateSnapshot = await snapshot.getPromise(
            questionEditorAtom,
          )

          set(questionEditorAtom, {
            ...questionEditorStateSnapshot,
            ...payload,
          })
        },
    )

    const resetQuestionEditorState = getCallback(({ reset }) => async () => {
      await get(fileUploadImageLinksSelector).resetFileUploadImageLinks()

      reset(questionEditorAtom)

      await get(tagListState).clearSelectedTagList()
    })

    const questionSubmit = getCallback(
      ({ snapshot }) =>
        async (member_id: number) => {
          await get(fileUploadImageLinksSelector).removeUnusedFileUploadImage()

          const questionStateSnapshot = await snapshot.getPromise(
            questionEditorAtom,
          )

          const fileUploadImageLinkSnapshot = await get(
            fileUploadImageLinksSelector,
          ).getFileUploadImageLinks()

          const res = await onSubmitQuestion({
            title: questionStateSnapshot.title,
            content: questionStateSnapshot.content,
            image_url: fileUploadImageLinkSnapshot[0] ?? "",
            skills: questionStateSnapshot.skills,
            member_id,
          })

          return res
        },
    )

    const cancelQuestionSubmit = getCallback(() => async () => {
      await resetQuestionEditorState()
    })

    return {
      getQuestionEditorLoaded,
      setQuestionEditorLoaded,
      getQuestionEditorState,
      updateQuestionEditorState,
      resetQuestionEditorState,
      questionSubmit,
      cancelQuestionSubmit,
    }
  },
})
