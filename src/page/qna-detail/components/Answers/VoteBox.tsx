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
  const {
    handleRaise,
    handleReduce,
    handleCancle,
    raiseClass,
    reduceClass,
    replaceNumber,
  } = useAnswerVote({
    answer,
  })
  const { user } = useClientSession()

  const handleVoteRaise = () => {
    if (answer.created_by === user?.nickname)
      return toast.error(validationMessage.voteForMe, {
        toastId: "voteForMe",
        position: "top-center",
      })
    if (answer.vote_status === 0) return handleRaise()
    return handleCancle()
  }

  const handleVoteReduce = () => {
    if (answer.created_by === user?.nickname)
      return toast.error(validationMessage.voteForMe, {
        toastId: "voteForMe",
        position: "top-center",
      })
    if (answer.vote_status === 0) return handleReduce()

    return handleCancle()
  }

  return (
    <form className="mr-5">
      <div className="flex justify-center">
        <DirectionIcons.Up className={raiseClass} onClick={handleVoteRaise} />
      </div>
      <div className="text-[30px]">{replaceNumber(answer.vote_count)}</div>
      <div className="flex justify-center">
        <DirectionIcons.Down
          className={reduceClass}
          onClick={handleVoteReduce}
        />
      </div>
    </form>
  )
}

export default VoteBox
