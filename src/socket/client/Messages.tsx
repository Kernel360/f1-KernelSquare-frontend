"use client"

import Profile from "@/components/shared/user/Profile"
import {
  MessagePayload,
  RoomAtomFamily,
} from "@/recoil/atoms/socket/socketAtom"
import { useRecoilValue } from "recoil"
import { twMerge } from "tailwind-merge"
import { IoCopyOutline } from "react-icons/io5"
import copy from "copy-to-clipboard"
import { toast } from "react-toastify"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import nightOwl from "react-syntax-highlighter/dist/esm/styles/prism/night-owl"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import useModal from "@/hooks/useModal"
import Button from "@/components/shared/button/Button"
import { IoIosArrowDown } from "react-icons/io"
import { IoClose } from "react-icons/io5"
import { debounce, throttle } from "lodash-es"
import { getKorDayjs } from "@/util/getDate"
import { useSearchParams } from "next/navigation"
import type { SessionPayload } from "@/recoil/atoms/user"

interface MessagesProps {
  roomKey: string
  user: NonNullable<SessionPayload>
}

function Messages({ roomKey, user }: MessagesProps) {
  const searchParams = useSearchParams()
  const isPopup = searchParams.get("popup")

  const { messages } = useRecoilValue(RoomAtomFamily({ roomKey }))

  useEffect(() => {
    const scrollingElement = document.scrollingElement

    if (scrollingElement) {
      window.scroll({
        top: document.documentElement.scrollHeight + (52 + 33 + 16),
      })
    }
  }, [messages])

  return (
    <div
      className={`w-full flex flex-col gap-3 mb-[calc(52px+33px+16px)] box-border px-2 ${
        isPopup ? "mt-9" : "mt-[90px]"
      }`}
    >
      {messages.map((messagePayload, index) => {
        if (messagePayload.type === "ENTER")
          return (
            <Messages.NotifyEnteredRoom
              key={index}
              nickname={messagePayload.sender}
            />
          )

        if (messagePayload.type === "LEAVE") {
          return (
            <Messages.NotifyLeaveRoom
              key={index}
              nickname={messagePayload.sender}
            />
          )
        }

        if (messagePayload.type === "EXPIRE") return null

        return <Messages.Message key={index} user={user} {...messagePayload} />
      })}
      <Messages.ScrollBottomButton />
    </div>
  )
}

export default Messages

Messages.Message = function Message({
  type,
  message,
  sender,
  sender_id,
  sender_image_url,
  user,
  send_time,
}: MessagePayload & { user: MessagesProps["user"] }) {
  const me = user.nickname === sender

  const containerClassNames = twMerge([
    "w-full flex",
    me ? "justify-end" : "justify-start",
  ])

  const messageWrapperClassNames = twMerge([
    "flex gap-2 max-w-[70%]",
    me ? "flex-row-reverse" : "flex-row",
  ])

  const profileClassNames = twMerge(["w-8 h-8 self-start shrink-0"])

  const messageClassNames = twMerge([
    "whitespace-pre-wrap w-fit px-2 py-1 break-all rounded-sm",
    me ? "bg-socialKakao self-end" : "bg-info self-start",
  ])

  const codeMessageClassNames = twMerge([
    "w-fit px-2 py-1 rounded-sm border border-colorsLightGray",
    me ? "self-end" : "self-start",
  ])

  const matchedCode = matchCode(message)

  const copyToClipboard = () => {
    const copySuccess = copy(matchedCode ? matchedCode.code : message)

    if (copySuccess) {
      toast.success("클립보드 복사 성공", { position: "bottom-center" })
    }
  }

  const MessageContent = () => {
    if (type === "CODE" && matchedCode) {
      return (
        <div className={codeMessageClassNames}>
          <Messages.CodeMessage
            language={matchedCode.language}
            code={matchedCode.code}
          />
        </div>
      )
    }

    return <div className={messageClassNames}>{message}</div>
  }

  return (
    <div className={containerClassNames}>
      <div className={messageWrapperClassNames}>
        <Profile
          className={profileClassNames}
          profileImage={me ? user.image_url : sender_image_url ?? null}
        />
        <div className={`flex flex-col`}>
          <div
            className={`flex items-center gap-1 mb-1 text-secondary ${
              me ? "justify-end" : "justify-start"
            }`}
          >
            <span className="text-xs">{sender}</span>
            <button
              className="inline-flex align-top p-0.5 justify-center items-center"
              onClick={copyToClipboard}
            >
              <IoCopyOutline className="text-sm" />
            </button>
          </div>
          <MessageContent />
        </div>
        {send_time ? <Messages.Time formatTime={send_time} /> : ""}
      </div>
    </div>
  )
}

// [TODO] 서버에서 유효한 ISO 포멧으로 오지 않을 경우, 수정될 수 있음
// (지금은 서버에서 유효한 ISO 포멧으로 와서, 정상적으로 변환 될 것이라고 가정하고 구현)
Messages.Time = function MessageTime({ formatTime }: { formatTime: string }) {
  return (
    <div className="flex shrink-0 self-end">
      <span className="text-secondary text-[10px] font-bold">
        {getKorDayjs(formatTime).format("Ahh:mm")}
      </span>
    </div>
  )
}

Messages.NotifyEnteredRoom = function NotifyEnteredRoom({
  nickname,
}: {
  nickname: string
}) {
  return (
    <div className="mx-auto w-fit bg-secondary text-white py-1 px-3 rounded-full text-xs">
      <span className="inline-block align-top">{nickname}</span> 님이
      입장하였습니다
    </div>
  )
}

Messages.NotifyLeaveRoom = function NotifyLeaveRoom({
  nickname,
}: {
  nickname: string
}) {
  return (
    <div className="mx-auto w-fit bg-secondary text-white py-1 px-3 rounded-full text-xs">
      <span className="inline-block align-top">{nickname}</span> 님이
      퇴장하였습니다
    </div>
  )
}

Messages.CodeMessage = function CodeMessage({
  language,
  code,
}: {
  language: string
  code: string
}) {
  const highlighterRef = useRef<HTMLDivElement>(null)
  const [isWrap, setIsWrap] = useState(false)

  const { openModal, closeModal } = useModal()

  const openCodeDetail = () => {
    openModal({
      containsHeader: false,
      closeableDim: true,
      content: (
        <>
          <div className="sticky top-0 flex w-full justify-between items-center -mt-[27px]">
            <span className="text-[10px] text-colorsDarkGray font-bold bg-colorsGray px-3 -mt-3">
              {language}
            </span>
            <div className="inline-flex align-top shrink-0">
              <Button className="w-fit h-fit p-1" onClick={closeModal}>
                <IoClose className="text-colorsLightGray" />
              </Button>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden">
            <div className="[&_pre::-webkit-scrollbar]:!w-0 [&_pre::-webkit-scrollbar]:!h-0">
              <SyntaxHighlighter
                language={language}
                style={nightOwl}
                wrapLongLines={true}
                customStyle={{
                  margin: "0",
                }}
              >
                {code}
              </SyntaxHighlighter>
            </div>
          </div>
        </>
      ),
      classNames:
        "bg-transparent p-0 [&::-webkit-scrollbar]:!w-0 [&::-webkit-scrollbar]:!h-0",
    })
  }

  useLayoutEffect(() => {
    if (!highlighterRef?.current) return

    setIsWrap(highlighterRef.current.scrollHeight >= 224 ? true : false)

    const handleResize = (e: UIEvent) => {
      if (!highlighterRef.current) return

      setIsWrap(highlighterRef.current.scrollHeight >= 224 ? true : false)
    }

    const handleThrottleResize = throttle(handleResize, 300)

    window.addEventListener("resize", handleThrottleResize)

    return () => {
      window.removeEventListener("resize", handleThrottleResize)
    }
  }, [])

  return (
    <>
      <div
        ref={highlighterRef}
        className="relative [&_pre::-webkit-scrollbar]:!w-0 [&_pre::-webkit-scrollbar]:!h-0 max-h-48 overflow-hidden"
      >
        <div className="absolute left-0 top-0 w-full flex">
          <span className="px-1 py-0.5 text-colorsDarkGray bg-colorsLightGray text-[10px]">
            {language}
          </span>
        </div>
        <SyntaxHighlighter
          language={language}
          style={nightOwl}
          wrapLongLines={true}
          customStyle={{
            width: "51vw",
            margin: "0",
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
      {isWrap ? (
        <Button
          fullWidth
          className="text-secondary text-xs"
          onClick={openCodeDetail}
        >
          &gt; 코드 더 보기
        </Button>
      ) : null}
    </>
  )
}

Messages.ScrollBottomButton = function ScrollBottomButton() {
  const [visible, setVisible] = useState(false)
  const scrollingRef = useRef(false)

  const handleScrollBottom = () => {
    if (!visible) return

    const scrollingElement = document.scrollingElement
    if (scrollingElement) {
      window.scroll({ top: scrollingElement.scrollHeight + (52 + 33 + 16) })
    }
  }

  const handleScroll = (e: Event) => {
    const scrollingElement = document.scrollingElement

    if (scrollingElement) {
      const targetValue =
        scrollingElement.scrollHeight - scrollingElement.scrollTop

      if (Math.round(targetValue - scrollingElement.clientHeight) <= 26) {
        return
      }
    }

    scrollingRef.current = true
    if (scrollingRef.current === true && !visible) setVisible(true)
  }

  const handleScrollend = (e: Event) => {
    scrollingRef.current = false
    setVisible(false)
  }

  const handleThrottleVisible = throttle(handleScroll, 400)
  const handleDebounceVisible = debounce(handleScrollend, 2000)

  useEffect(() => {
    window.addEventListener("scroll", handleThrottleVisible)
    window.addEventListener("scrollend", handleDebounceVisible)

    return () => {
      window.removeEventListener("scroll", handleThrottleVisible)
      window.removeEventListener("scrollend", handleDebounceVisible)
    }
  }, []) /* eslint-disable-line */

  return (
    <button
      className={`fixed bottom-[92px] right-3 z-[4] rounded-full p-2 bg-secondary text-white hover:bg-slate-600 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={handleScrollBottom}
    >
      <IoIosArrowDown className="text-sm" />
    </button>
  )
}

function matchCode(message: string) {
  const codeRegex = /^\+(?<language>\w+)\+/

  const codeMatch = message.match(codeRegex)

  if (codeMatch) {
    const matchedLanguage = codeMatch.groups?.language

    return { language: matchedLanguage!, code: message.replace(codeRegex, "") }
  }

  return null
}
