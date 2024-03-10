"use client"

import { useLayoutEffect, useRef } from "react"
import CodingMeetingSection from "./CodingMeetingSection"
import { toast } from "react-toastify"
import { errorMessage } from "@/constants/message"
import Limitation from "@/constants/limitation"
import Regex from "@/constants/regex"
import { Input } from "@/components/shared/input/Input"
import Button from "@/components/shared/button/Button"
import { Icons } from "@/components/icons/Icons"
import { useRecoilState } from "recoil"
import type { HashTagsSectionProps } from "../CreateCodingMeetingPage.types"
import { CodingMeetingHashTagList } from "@/recoil/atoms/coding-meeting/hashtags"

const HashTagsSection = ({ initialHashTags }: HashTagsSectionProps) => {
  const hashtagRef = useRef<HTMLInputElement>(null)

  // 제출된 해시태그
  const [hashtags, setHashtags] = useRecoilState(CodingMeetingHashTagList)

  useLayoutEffect(() => {
    if (initialHashTags) setHashtags(initialHashTags)
    else setHashtags([])
  }, [])

  // 해시태그 추가
  const handleAddHashTags = () => {
    // 빈 값 방지
    if (!hashtagRef.current?.value)
      return toast.error(errorMessage.noValue, {
        toastId: "emtpyHashtagValue",
        position: "top-center",
      })
    // 해시태그 개수 제한
    if (hashtags.length >= Limitation.hashtags_cnt)
      return toast.error(errorMessage.overHashtagCntLimit, {
        toastId: "overHashtagCntLimit",
        position: "top-center",
      })
    // 해시태그 개수 제한
    if (hashtagRef.current?.value.length >= Limitation.hashtags_word)
      return toast.error(errorMessage.overHashtagWordLimit, {
        toastId: "overHahtagWordLmit",
        position: "top-center",
      })
    // 특수문자 + 이모지 제출 방지
    if (
      hashtagRef.current?.value.match(Regex.preventSpecialCharacter) ||
      hashtagRef.current?.value.match(Regex.preventEmoji)
    )
      return toast.error(errorMessage.preventSpecialCharacter, {
        toastId: "preventSpecialCharacter",
        position: "top-center",
      })
    // 중복 제출 방지
    if (hashtags.includes(hashtagRef.current.value))
      return toast.error(errorMessage.preventDuplicateValue, {
        toastId: "preventDuplicateValue",
        position: "top-center",
      })
    setHashtags([...hashtags, hashtagRef.current?.value])
    // 제출 후 input 초기화
    hashtagRef.current.value = ""
  }
  // 해시태그 삭제
  const handleDeleteHashTags = (tag: string) =>
    setHashtags(hashtags.filter((hashtag) => hashtag !== tag))

  return (
    <CodingMeetingSection>
      <CodingMeetingSection.Label className="flex flex-row sm:flex-col">
        <div>해시태그</div>
        <div>
          ({hashtags.length}/{Limitation.hashtags_cnt})
        </div>
      </CodingMeetingSection.Label>
      <div>
        <div className="flex flex-col sm:flex-row">
          <Input
            id="hashtags"
            spellCheck="false"
            autoComplete="off"
            className="rounded-none border-r-0 border-l-0 border-t-0 text-xl"
            placeholder="해시태그를 추가해보세요"
            ref={hashtagRef}
          />
          <div className="flex flex-col justify-center sm:ml-3">
            <Button
              buttonTheme="primary"
              className="px-5 py-2 shrink-0 w-full mt-5 sm:mt-0"
              onClick={handleAddHashTags}
            >
              추가
            </Button>
          </div>
        </div>
        <div className="min-h-[30px] mt-5 flex flex-wrap">
          {hashtags.map((tag) => (
            <div
              key={tag}
              className="p-3 mr-3 flex border-[1px] border-slate-300 rounded-3xl items-center min-w-[50px] mb-5"
            >
              <div className="mr-1"># {tag}</div>
              <div
                className="transition-colors w-5 h-5 p-1 rounded-full border flex justify-center items-center bg-white hover:bg-secondary hover:text-white"
                onClick={() => handleDeleteHashTags(tag)}
              >
                <Icons.Close />
              </div>
            </div>
          ))}
        </div>
      </div>
    </CodingMeetingSection>
  )
}

export default HashTagsSection
