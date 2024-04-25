"use client"

import { Icons } from "@/components/icons/Icons"
import Button from "@/components/shared/button/Button"
import { useSSE } from "@/hooks/sse/useSSE"
import { AlertType, SSEMessage, SSEMessages } from "@/interfaces/sse"
import { getKorDayjs } from "@/util/getDate"
import Link from "next/link"
import { twMerge } from "tailwind-merge"
import { useQueryClient } from "@tanstack/react-query"
import { useClientSession } from "@/hooks/useClientSession"
import { setCookie } from "@/util/actions/cookie"
import {
  RECEIVED_MESSAGE_STATE,
  SSE_STATE_KEY,
} from "@/constants/sse/sse-constants"
import { useRecoilState } from "recoil"
import { sseAtom } from "@/recoil/atoms/sse/sseAtom"

function Alerm() {
  const { user } = useClientSession()
  const queryClient = useQueryClient()

  const [sse, setSSE] = useRecoilState(sseAtom)

  const eventSource = useSSE({
    onSSEevent(event) {
      localStorage.setItem(SSE_STATE_KEY, RECEIVED_MESSAGE_STATE.Received)
      setCookie(SSE_STATE_KEY, RECEIVED_MESSAGE_STATE.Received)

      setSSE((prev) => ({
        ...prev,
        receivedMessage: true,
      }))

      queryClient.invalidateQueries({
        queryKey: ["alert", "list", user?.member_id],
      })
    },
  })

  return (
    <Link
      href={`/notification`}
      className="relative inline-flex align-top"
      onClick={() => {
        localStorage.setItem(SSE_STATE_KEY, RECEIVED_MESSAGE_STATE.NotReceived)
        setCookie(SSE_STATE_KEY, RECEIVED_MESSAGE_STATE.NotReceived)

        setSSE((prev) => ({
          ...prev,
          receivedMessage: false,
        }))
      }}
    >
      <Button className="p-0">
        <Icons.Notification
          className={`text-2xl transition-colors duration-200 ${
            sse.receivedMessage ? "text-secondary" : "text-colorsGray"
          }`}
        />
      </Button>
      {sse.receivedMessage ? (
        <div className="absolute top-0 -left-0.5 w-2 h-2 rounded-full bg-rose-500" />
      ) : null}
    </Link>
  )
}

export default Alerm

export function AlermList({
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
          <AlermList.TypeTag type={"QUESTION_REPLY"} />
          <div className="text-sm font-medium text-secondary">
            <span
              className="max-w-[28%] inline-block whitespace-nowrap align-top overflow-hidden font-bold text-ellipsis"
              style={{ textWrap: "nowrap" }}
            >
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
          <AlermList.TypeTag type={"RANK_ANSWER"} />
          <div className="text-sm font-medium text-secondary">
            <span className="max-w-[28%] inline-block whitespace-nowrap align-top overflow-hidden font-bold text-ellipsis">
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
        <AlermList.TypeTag type={"COFFEE_CHAT_REQUEST"} />
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

AlermList.TypeTag = function AlermListTypeStatusTag({
  type,
}: {
  type: AlertType
}) {
  return (
    <div
      className={`w-fit h-fit shrink-0 text-xs px-2 py-1 rounded-full bg-primary text-white`}
    >
      {type === "QUESTION_REPLY"
        ? "질문 답변"
        : type === "RANK_ANSWER"
        ? "답변 랭크"
        : "커피챗 요청"}
    </div>
  )
}
