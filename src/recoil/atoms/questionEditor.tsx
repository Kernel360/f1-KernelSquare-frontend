import { onSubmitQuestion, onSubmitUpdateQuestion } from "@/util/actions/form"
import { findImageLinkUrlFromMarkdown } from "@/util/editor"
import { atom, atomFamily, selector } from "recoil"
import { deleteImages } from "@/service/images"
import { Editor } from "@toast-ui/react-editor"
import type { TechTag } from "@/interfaces/tech-tag"
import type { AxiosResponse } from "axios"
import type { DeleteImagesResponse } from "@/interfaces/dto/upload/delete-images.dto"
import type { EditMode } from "@/page/askQuestion/components/AskQuestionPageControl"

interface QuestionEditorState {
  title: string
  content: string
  fileUploadImageLinks: Array<string>
  skills: Array<TechTag>
}

export const questionEditorAtomFamily = atomFamily<QuestionEditorState, string>(
  {
    key: "question-editor-atom-family",
    default: {
      title: "",
      content: "",
      fileUploadImageLinks: [],
      skills: [],
    },
  },
)

export const editorRefAtomFamily = atomFamily<Editor | null, any>({
  key: "editor-ref-atom-family",
  default: null,
})

export const questionEditorLoadedAtomFamily = atomFamily<boolean, string>({
  key: "question-editor-loaded-atom-family",
  default: false,
})

// --- legacy (삭제 예정) ---
// 삭제이후 빌드 용량 개선에 도움될 것 같음

// export const questionEditorAtom = atom<QuestionEditorState>({
//   key: "question-editor-state-atom",
//   default: {
//     title: "",
//     content: "",
//     fileUploadImageLinks: [],
//     skills: [],
//   },
// })

// export const questionEditorLoadedAtom = atom<boolean>({
//   key: "question-editor-loaded-atom",
//   default: false,
// })

// export const fileUploadImageLinksSelector = selector({
//   key: "question-editor-file-upload-image-link-selector",
//   get: ({ get, getCallback }) => {
//     const fileUploadImageLinks = get(questionEditorAtom).fileUploadImageLinks

//     const getFileUploadImageLinks = getCallback(({ snapshot }) => async () => {
//       return (await snapshot.getPromise(questionEditorAtom))
//         .fileUploadImageLinks
//     })

//     const addFileUploadImageLinks = getCallback(
//       ({ set, snapshot }) =>
//         async (links: string) => {
//           const questionEditorSnapshot = await snapshot.getPromise(
//             questionEditorAtom,
//           )

//           const nonDuplicatedImageLinks = Array.from([
//             ...questionEditorSnapshot.fileUploadImageLinks,
//             links,
//           ])

//           set(questionEditorAtom, {
//             ...questionEditorSnapshot,
//             fileUploadImageLinks: [...nonDuplicatedImageLinks],
//           })
//         },
//     )

//     const removeFileUploadImageLinks = getCallback(
//       ({ set, snapshot }) =>
//         async (removeTargetLink: string) => {
//           const questionEditorSnapshot = await snapshot.getPromise(
//             questionEditorAtom,
//           )

//           set(questionEditorAtom, {
//             ...questionEditorSnapshot,
//             fileUploadImageLinks: [
//               ...questionEditorSnapshot.fileUploadImageLinks.filter(
//                 (imageLink) => imageLink !== removeTargetLink,
//               ),
//             ],
//           })
//         },
//     )

//     const clearFileUploadImageLinks = getCallback(
//       ({ set, snapshot }) =>
//         async () => {
//           const fileUploadImageSnapshot = await get(
//             fileUploadImageLinksSelector,
//           ).getFileUploadImageLinks()

//           if (fileUploadImageSnapshot.length) {
//             await Promise.allSettled([
//               ...fileUploadImageSnapshot.map((targetUploadImageLink) =>
//                 deleteImages({ imageUrl: targetUploadImageLink }),
//               ),
//             ])
//           }

//           const questionEditorSnapshot = await snapshot.getPromise(
//             questionEditorAtom,
//           )

//           set(questionEditorAtom, {
//             ...questionEditorSnapshot,
//             fileUploadImageLinks: [],
//           })
//         },
//     )

//     const resetFileUploadImageLinks = getCallback(
//       ({ set, snapshot }) =>
//         async () => {
//           const questionEditorSnapshot = await snapshot.getPromise(
//             questionEditorAtom,
//           )

//           set(questionEditorAtom, {
//             ...questionEditorSnapshot,
//             fileUploadImageLinks: [],
//           })
//         },
//     )

//     const removeUnusedFileUploadImage = getCallback(
//       ({ set, snapshot }) =>
//         async () => {
//           const questionEditorStateSnapshot = await snapshot.getPromise(
//             questionEditorAtom,
//           )

//           const fileUploadImageLinksSnapshot = await getFileUploadImageLinks()

//           // 마크다운 구문에 포함된 모든 이미지 링크
//           const allUploadImageLinks = findImageLinkUrlFromMarkdown(
//             questionEditorStateSnapshot.content,
//           )

//           const removeTargetUploadImageLinkList =
//             fileUploadImageLinksSnapshot.filter(
//               (fileUploadImageUrl) =>
//                 !allUploadImageLinks?.includes(fileUploadImageUrl),
//             )

//           if (removeTargetUploadImageLinkList.length) {
//             const promiseResult = await Promise.allSettled([
//               ...removeTargetUploadImageLinkList.map((targetUploadImage) =>
//                 deleteImages({ imageUrl: targetUploadImage }),
//               ),
//             ])

//             const successRemoveImageLinks = (
//               promiseResult.filter(
//                 (result) => result.status === "fulfilled",
//               ) as Array<
//                 PromiseFulfilledResult<AxiosResponse<DeleteImagesResponse, any>>
//               >
//             ).map((result) => {
//               const url = new URL(
//                 result.value.config.url!,
//                 process.env.NEXT_PUBLIC_SERVER,
//               )
//               const imageLink = url.searchParams.get("imageUrl")!

//               return imageLink
//             })

//             const resultFileUploadImageLink =
//               fileUploadImageLinksSnapshot.filter(
//                 (imageLink) => !successRemoveImageLinks?.includes(imageLink),
//               )

//             const questionEditorSnapshot = await snapshot.getPromise(
//               questionEditorAtom,
//             )

//             set(questionEditorAtom, {
//               ...questionEditorSnapshot,
//               fileUploadImageLinks: [...resultFileUploadImageLink],
//             })
//           }
//         },
//     )

//     return {
//       fileUploadImageLinks,
//       getFileUploadImageLinks,
//       addFileUploadImageLinks,
//       removeFileUploadImageLinks,
//       removeUnusedFileUploadImage,
//       clearFileUploadImageLinks,
//       resetFileUploadImageLinks,
//     }
//   },
// })

// export const questionEditCancelByUserAtom = atom<boolean>({
//   key: "question-edit-cancel-by-user-atom",
//   default: false,
// })

// export const questionEditorState = selector({
//   key: "question-editor-state-selector",
//   get: ({ get, getCallback }) => {
//     const setQuestionEditorLoaded = getCallback(
//       ({ set, snapshot }) =>
//         async (loaded: boolean) => {
//           await snapshot.getPromise(questionEditorLoadedAtom)

//           set(questionEditorLoadedAtom, loaded)
//         },
//     )

//     const getQuestionEditCancelByUser = getCallback(
//       ({ snapshot }) =>
//         async () => {
//           return await snapshot.getPromise(questionEditCancelByUserAtom)
//         },
//     )

//     const setQustionEditCancelByUser = getCallback(
//       ({ set, snapshot }) =>
//         async (cancelByUser: boolean) => {
//           await snapshot.getPromise(questionEditCancelByUserAtom)

//           set(questionEditCancelByUserAtom, cancelByUser)
//         },
//     )

//     const getQuestionEditorLoaded = getCallback(({ snapshot }) => async () => {
//       return await snapshot.getPromise(questionEditorLoadedAtom)
//     })

//     const getQuestionEditorState = getCallback(({ snapshot }) => async () => {
//       return await snapshot.getPromise(questionEditorAtom)
//     })

//     const updateQuestionEditorState = getCallback(
//       ({ set, snapshot }) =>
//         async (payload: Partial<QuestionEditorState>) => {
//           const questionEditorStateSnapshot = await snapshot.getPromise(
//             questionEditorAtom,
//           )

//           set(questionEditorAtom, {
//             ...questionEditorStateSnapshot,
//             ...payload,
//           })
//         },
//     )

//     const resetQuestionEditorState = getCallback(
//       ({ reset }) =>
//         async (editMode?: EditMode) => {
//           if (editMode === "create") {
//             const { removeUnusedFileUploadImage, clearFileUploadImageLinks } =
//               get(fileUploadImageLinksSelector)

//             // 마크다운 콘텐츠에서 사용하지 않는 이미지 먼저 제거(삭제 api 요청)하여 반영
//             await removeUnusedFileUploadImage()

//             // 남아있는 업로드 이미지 제거(삭제 api 요청)
//             await clearFileUploadImageLinks()

//             // 상태 초기화
//             // reset(questionEditorAtom)
//             // await get(tagListState).clearSelectedTagList()

//             return
//           }

//           reset(questionEditorAtom)

//           // await get(tagListState).clearSelectedTagList()
//         },
//     )

//     const questionSubmit = getCallback(
//       ({ snapshot }) =>
//         async (member_id: number) => {
//           await get(fileUploadImageLinksSelector).removeUnusedFileUploadImage()

//           const questionStateSnapshot = await snapshot.getPromise(
//             questionEditorAtom,
//           )

//           const fileUploadImageLinkSnapshot = await get(
//             fileUploadImageLinksSelector,
//           ).getFileUploadImageLinks()

//           const res = await onSubmitQuestion({
//             title: questionStateSnapshot.title,
//             content: questionStateSnapshot.content,
//             image_url: fileUploadImageLinkSnapshot[0] ?? "",
//             skills: questionStateSnapshot.skills,
//             member_id,
//           })

//           return res
//         },
//     )

//     const updateQuestionSubmit = getCallback(
//       ({ snapshot }) =>
//         async (question_id: number) => {
//           const questionStateSnapshot = await snapshot.getPromise(
//             questionEditorAtom,
//           )

//           const fileUploadImageLinkSnapshot = await get(
//             fileUploadImageLinksSelector,
//           ).getFileUploadImageLinks()

//           const res = await onSubmitUpdateQuestion({
//             title: questionStateSnapshot.title,
//             content: questionStateSnapshot.content,
//             image_url: fileUploadImageLinkSnapshot[0] ?? "",
//             skills: questionStateSnapshot.skills,
//             question_id,
//           })

//           return res
//         },
//     )

//     const cancelQuestionSubmit = getCallback(
//       () => async (editMode?: EditMode) => {
//         await resetQuestionEditorState(editMode)
//       },
//     )

//     return {
//       getQuestionEditorLoaded,
//       setQuestionEditorLoaded,
//       getQuestionEditCancelByUser,
//       setQustionEditCancelByUser,
//       getQuestionEditorState,
//       updateQuestionEditorState,
//       resetQuestionEditorState,
//       questionSubmit,
//       updateQuestionSubmit,
//       cancelQuestionSubmit,
//     }
//   },
// })
