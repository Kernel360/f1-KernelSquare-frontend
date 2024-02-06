"use client"

import { DirectionIcons } from "@/components/icons/Icons"
import useAnswerVote from "../../hooks/useAnswerVote"
import SuccessModalContent from "../SuccessModalContent"
import { successMessage } from "@/constants/message"
import type { Answer } from "@/interfaces/answer"

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

  const handleVoteRaise = () => {
    if (answer.vote_status === 0) return handleRaise()
    return handleCancle({
      successModal: <SuccessModalContent message={successMessage.cancleVote} />,
    })
  }

  const handleVoteReduce = () => {
    if (answer.vote_status === 0) return handleReduce()

    return handleCancle({
      successModal: <SuccessModalContent message={successMessage.cancleVote} />,
    })
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
