"use client"

import { DirectionIcons } from "@/components/icons/Icons"
import useAnswerVote from "../../hooks/useAnswerVote"
import type { Answer } from "@/interfaces/answer"
import { useClientSession } from "@/hooks/useClientSession"
import { toast } from "react-toastify"
import { validationMessage } from "@/constants/message/validation"

export type VoteBoxProps = {
  userId?: number
  answer: Answer
}

const VoteBox: React.FC<VoteBoxProps> = ({ answer }) => {
  const { user } = useClientSession()

  const { handleRaise, handleReduce, handleCancle, raiseClass, reduceClass } =
    useAnswerVote({
      answer,
    })

  const handleVoteRaise = () => {
    if (answer.member_nickname === user?.nickname)
      return toast.error(validationMessage.voteForMe, {
        toastId: "voteForMe",
        position: "top-center",
      })
    if (answer.vote_status === 0) return handleRaise()
    return handleCancle()
  }

  const handleVoteReduce = () => {
    if (answer.member_nickname === user?.nickname)
      return toast.error(validationMessage.voteForMe, {
        toastId: "voteForMe",
        position: "top-center",
      })
    if (answer.vote_status === 0) return handleReduce()

    return handleCancle()
  }

  return (
    <form className="flex flex-col w-[51px] pc:w-[62px] items-center">
      <DirectionIcons.Up className={raiseClass} onClick={handleVoteRaise} />
      <div className="text-center text-xl pc:text-2xl font-semibold">
        {answer.vote_count > 999 ? "999+" : answer.vote_count}
      </div>
      <DirectionIcons.Down className={reduceClass} onClick={handleVoteReduce} />
    </form>
  )
}

export default VoteBox
