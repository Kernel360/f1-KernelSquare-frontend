"use client"

import { DirectionIcons } from "@/components/icons/Icons"
import { Answer, VoteStatus } from "@/interfaces/answer"
import VoteButton from "./VoteButton"
import useAnswerVote from "@/page/qna-detail/hooks/useAnswerVote"

interface VoteLikeAnswerProps {
  answer: Answer
}

function VoteLikeAnswer({ answer }: VoteLikeAnswerProps) {
  const { voteLikeAnswer } = useAnswerVote({ answer })

  const classNames = `${
    answer.vote_status === VoteStatus.LIKED && "text-primary"
  }`

  return (
    <VoteButton className={classNames} onClick={voteLikeAnswer}>
      <DirectionIcons.Up />
    </VoteButton>
  )
}

export default VoteLikeAnswer
