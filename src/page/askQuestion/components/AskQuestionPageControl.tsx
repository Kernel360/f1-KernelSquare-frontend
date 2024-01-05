"use client"

import Button from "@/components/shared/button/Button"
import { Fragment, useLayoutEffect } from "react"
import useModal from "@/hooks/useModal"
import CancelAskQuestionModal from "./CancelAskQuestionModal"
import { useRecoilValue } from "recoil"
import {
  fileUploadImageLinksSelector,
  questionEditorLoadedAtom,
} from "@/recoil/atoms/questionEditor"
import Image from "next/image"
import { MdClose } from "react-icons/md"

export interface DeleteImageLinkFormMarkdownPayload {
  targetLink: string
}
export const deleteImageLinkFromMarkdownEventName =
  "deleteImageLinkFormMarkDown"

function AskQuestionPageControl() {
  const form = document.querySelector("form")!

  const formLoaded = useRecoilValue(questionEditorLoadedAtom)
  const { fileUploadImageLinks, clearFileUploadImageLinks } = useRecoilValue(
    fileUploadImageLinksSelector,
  )

  const { openModal, closeModal } = useModal()

  const onSubmit = () => {
    form.requestSubmit()
  }

  const onCancel = () => {
    openModal({
      containsHeader: true,
      content: <CancelAskQuestionModal />,
    })
  }

  useLayoutEffect(() => {
    return () => {
      closeModal()
    }
  }, []) /* eslint-disable-line */

  return !formLoaded ? null : (
    <aside className="order-1 lgDevice:order-2 sticky justify-self-start z-[1] bg-[#f7f9fc] box-border p-0 lgDevice:p-3 top-[calc(var(--height-header)+67px)] sm:top-[calc(var(--height-header))] lgDevice:top-[calc(var(--height-header)+150px)] h-max w-full lgDevice:w-32 lgDevice:self-start lgDevice:mr-4 shadow-md rounded-none lgDevice:rounded-md">
      <div className="relative flex flex-row lgDevice:flex-col gap-4 w-full h-full justify-between items-center box-border p-2">
        {/* file uploaded image */}
        {fileUploadImageLinks.length
          ? fileUploadImageLinks.map((imageLink) => {
              return (
                <Fragment key={imageLink}>
                  <div className="flex w-20 min-w-[5rem]">
                    <div className="relative w-full aspect-square rounded-lg overflow-hidden">
                      <Image
                        src={imageLink}
                        alt="img"
                        fill
                        style={{
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  </div>
                  <Button
                    className="flex gap-1 justify-center items-center absolute w-24 top-1 lgDevice:w-full lgDevice:top-0 left-0 shadow-lg bg-white group hover:bg-colorsGray"
                    onClick={() => {
                      clearFileUploadImageLinks()
                      window.dispatchEvent(
                        new CustomEvent(deleteImageLinkFromMarkdownEventName, {
                          detail: {
                            targetLink: imageLink,
                          } as DeleteImageLinkFormMarkdownPayload,
                        }),
                      )
                    }}
                  >
                    <span className="text-xs w-max">업로드 취소</span>
                    <div className="flex justify-center items-center rounded-full w-4 h-4 p-1.5 box-border shrink-0 bg-colorsLightGray shadow-md">
                      <MdClose className={"shrink-0 text-xs"} />
                    </div>
                  </Button>
                </Fragment>
              )
            })
          : "업로드 이미지 없음"}
        <div className="mr-8 flex gap-2 flex-row justify-center items-center lgDevice:flex-col lgDevice:mr-0">
          <Button buttonTheme="primary" className="w-[68px]" onClick={onSubmit}>
            질문 작성
          </Button>
          <Button
            buttonTheme="secondary"
            className="w-[68px]"
            onClick={onCancel}
          >
            작성 취소
          </Button>
        </div>
      </div>
    </aside>
  )
}

export default AskQuestionPageControl
