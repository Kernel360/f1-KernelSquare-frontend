import { Answer, VoteStatus } from "@/interfaces/answer"
import VoteButton from "./VoteButton"
import { DirectionIcons } from "@/components/icons/Icons"
import useAnswerVote from "@/page/qna-detail/hooks/useAnswerVote"

interface VoteDisLikeAnswerProps {
  answer: Answer
}

function VoteDisLikeAnswer({ answer }: VoteDisLikeAnswerProps) {
  const { voteDisLikeAnswer } = useAnswerVote({ answer })

  const classNames = `${
    answer.vote_status === VoteStatus.DISLIKED && "text-primary"
  }`

  return (
    <VoteButton className={classNames} onClick={voteDisLikeAnswer}>
      <DirectionIcons.Down />
    </VoteButton>
  )
}

export default VoteDisLikeAnswer
