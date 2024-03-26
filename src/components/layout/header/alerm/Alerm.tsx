"use client"

import { Icons } from "@/components/icons/Icons"
import Button from "@/components/shared/button/Button"
import { useSSE } from "@/hooks/sse/useSSE"
import { useEffect, useRef, useState } from "react"
import { Event } from "event-source-polyfill"
import { SSEMessage, SSEMessages } from "@/interfaces/sse"
import { getKorDayjs } from "@/util/getDate"
import Link from "next/link"
import { twMerge } from "tailwind-merge"

interface MessageState {
  receivedMessage: boolean
  events: Array<Event & { lastEventId: string; data: SSEMessages }>
}

function Alerm() {
  const [sse, setSSE] = useState<MessageState>({
    receivedMessage: false,
    events: [],
  })

  const [open, setOpen] = useState(false)

  const eventSource = useSSE({
    onSSEevent(event) {
      const sseEvent = {
        ...event,
        data: JSON.parse((event as any).data),
      }

      setSSE((prev) => ({
        ...prev,
        receivedMessage: true,
        events: [...prev.events, { ...(sseEvent as any) }],
      }))
    },
  })

  const alermRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleDim = (e: MouseEvent) => {
      if (!alermRef.current) return
      if (alermRef.current.contains(e.target as HTMLElement)) return

      setOpen(false)
    }

    window.addEventListener("click", handleDim)

    return () => {
      window.removeEventListener("click", handleDim)
    }
  }, []) /* eslint-disable-line */

  return (
    <div className="relative inline-flex align-top" ref={alermRef}>
      <Button
        className="p-0"
        onClick={() => {
          setOpen((prev) => !prev)
          setSSE((prev) => ({
            ...prev,
            receivedMessage: false,
          }))
        }}
      >
        <Icons.Notification
          className={`text-2xl transition-colors duration-200 ${
            sse.receivedMessage ? "text-secondary" : "text-colorsGray"
          }`}
        />
      </Button>
      {sse.receivedMessage ? (
        <div className="absolute top-0 -left-0.5 w-2 h-2 rounded-full bg-rose-500" />
      ) : null}
      {open ? (
        <div className="absolute left-full bottom-0 z-[101] -translate-x-full translate-y-full border border-colorsGray">
          <AlermList
            list={sse.events.map((event) => event.data)}
            onLink={() => setOpen(false)}
          />
        </div>
      ) : null}
    </div>
  )
}

export default Alerm

function AlermList({
  list,
  onLink,
}: {
  list: Array<SSEMessages>
  onLink?: () => void
}) {
  return (
    <div className="bg-white w-[150px] sm:w-[320px] h-max max-h-[120px] overflow-y-auto">
      {list.length ? (
        list
          .filter(
            (alerm) =>
              alerm.alert_type === "QUESTION_REPLY" ||
              alerm.alert_type === "RANK_ANSWER" ||
              alerm.alert_type === "COFFEE_CHAT_REQUEST",
          )
          .map((alerm, index) => {
            return <AlermList.Alerm key={index} alerm={alerm} onLink={onLink} />
          })
          .reverse()
      ) : (
        <AlermList.NoAlerm />
      )}
    </div>
  )
}

AlermList.AlermWrapper = function AlermListWrapper({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  const classNames = twMerge(["w-full box-border px-2 py-1", className])

  return <div className={classNames}>{children}</div>
}

AlermList.Alerm = function AlermListAlerm({
  alerm,
  onLink,
}: {
  alerm: SSEMessages
  onLink?: () => void
}) {
  if (alerm.alert_type === "QUESTION_REPLY") {
    const questionReplyAlerm = alerm as SSEMessage<"QUESTION_REPLY">

    return (
      <Link
        href={`/question/${questionReplyAlerm.payload.questionId}`}
        className="block bg-white hover:bg-colorsLightGray transition-colors duration-200"
        onClick={onLink}
      >
        <AlermList.AlermWrapper>
          <div className="flex flex-wrap gap-1 items-center text-sm font-medium text-secondary">
            <span className="flex-1 font-bold line-clamp-1 text-ellipsis">
              {questionReplyAlerm.payload.questionTitle}
            </span>
            <span> 글에 </span>
            <span className="font-bold">
              {questionReplyAlerm.payload.sender}
            </span>
            <span> 님이 답변했습니다.</span>
          </div>
          <AlermList.AlermTime time={questionReplyAlerm.send_time} />
        </AlermList.AlermWrapper>
      </Link>
    )
  }

  if (alerm.alert_type === "RANK_ANSWER") {
    const rankAnswerAlerm = alerm as SSEMessage<"RANK_ANSWER">

    return (
      <Link
        href={`/question/${rankAnswerAlerm.payload.questionId}`}
        className="block bg-white hover:bg-colorsLightGray transition-colors duration-200"
        onClick={onLink}
      >
        <AlermList.AlermWrapper>
          <div className="flex flex-wrap gap-1 items-center text-sm font-medium text-secondary">
            <span className="w-full sm:w-1/2 font-bold line-clamp-1 text-ellipsis">
              {rankAnswerAlerm.payload.questionTitle}
            </span>
            <span> 글에 작성하신 답변이 </span>
            <span className="font-bold">{rankAnswerAlerm.payload.rank}등</span>
            <span> 답변이 되었습니다.</span>
          </div>
          <AlermList.AlermTime time={rankAnswerAlerm.send_time} />
        </AlermList.AlermWrapper>
      </Link>
    )
  }

  if (alerm.alert_type === "COFFEE_CHAT_REQUEST") {
    const coffeeChatRequestAlerm = alerm as SSEMessage<"COFFEE_CHAT_REQUEST">

    return (
      <AlermList.AlermWrapper className="bg-white hover:bg-colorsLightGray transition-colors duration-200 text-secondary">
        <div>
          <Link
            href={`/profile/${coffeeChatRequestAlerm.payload.senderId}`}
            onClick={onLink}
          >
            <span className="text-sm font-bold underline underline-offset-4">
              {coffeeChatRequestAlerm.payload.sender}
            </span>
          </Link>
          <span> 님이 커피챗을 요청하였습니다.</span>
        </div>
        <AlermList.AlermTime time={coffeeChatRequestAlerm.send_time} />
      </AlermList.AlermWrapper>
    )
  }

  return null
}

AlermList.AlermTime = function AlermListAlermTime({ time }: { time: string }) {
  return (
    <div className="w-full flex justify-end items-center text-xs text-colorsDarkGray font-light">
      {getKorDayjs(time).format("YYYY-MM-DD Ahh:mm:ss")}
    </div>
  )
}

AlermList.NoAlerm = function AlermListNoAlerm() {
  return (
    <div className="w-full h-10 flex justify-center items-center text-colorsDarkGray text-sm">
      알람 메시지가 없습니다.
    </div>
  )
}
