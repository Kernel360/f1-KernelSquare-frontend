"use client"

import { useRef } from "react"
import CoffeeChatSection from "./CoffeeChatSection"
import { toast } from "react-toastify"
import { errorMessage } from "@/constants/message"
import Limitation from "@/constants/limitation"
import Regex from "@/constants/regex"
import { Input } from "@/components/shared/input/Input"
import Button from "@/components/shared/button/Button"
import { Icons } from "@/components/icons/Icons"
import { useRecoilState } from "recoil"
import { HashTagList } from "@/recoil/atoms/coffee-chat/hashtags"

const HashTagsSection = () => {
  const hashtagRef = useRef<HTMLInputElement>(null)

  // 제출된 해시태그
  const [hashtags, setHashtags] = useRecoilState(HashTagList)
  // 해시태그 추가
  const handleAddHashTags = () => {
    // 빈 값 방지
    if (!hashtagRef.current?.value)
      return toast.error(errorMessage.noValue, { position: "top-center" })
    // 해시태그 개수 제한
    if (hashtags.length >= Limitation.hashtags_cnt)
      return toast.error(errorMessage.overHashtagCntLimit, {
        position: "top-center",
      })
    // 해시태그 개수 제한
    if (hashtagRef.current?.value.length >= Limitation.hashtags_word)
      return toast.error(errorMessage.overHashtagWordLimit, {
        position: "top-center",
      })
    // 특수문자 + 이모지 제출 방지
    if (
      hashtagRef.current?.value.match(Regex.preventSpecialCharacter) ||
      hashtagRef.current?.value.match(Regex.preventEmoji)
    )
      return toast.error(errorMessage.preventSpecialCharacter, {
        position: "top-center",
      })
    // 중복 제출 방지
    if (hashtags.includes(hashtagRef.current.value))
      return toast.error(errorMessage.preventDuplicateValue, {
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
    <CoffeeChatSection>
      <CoffeeChatSection.Label className="block w-max">
        해시태그 ({hashtags.length}/{Limitation.hashtags_cnt})
      </CoffeeChatSection.Label>
      <div className="flex">
        <Input
          id="hashtags"
          spellCheck="false"
          autoComplete="off"
          className="rounded-none border-r-0 border-l-0 border-t-0 text-xl"
          placeholder="해시태그를 추가해보세요"
          ref={hashtagRef}
        />
        <div className="flex flex-col justify-center ml-3">
          <Button
            buttonTheme="primary"
            className="px-5 py-2"
            onClick={handleAddHashTags}
          >
            추가
          </Button>
        </div>
      </div>
      <div className="min-h-[30px] mt-5 flex">
        {hashtags.map((tag) => (
          <div
            key={tag}
            className="px-3 mr-3 flex border-[1px] border-primary rounded items-center"
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
    </CoffeeChatSection>
  )
}

export default HashTagsSection
