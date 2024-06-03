import { Answer } from "@/interfaces/answer"
import VoteLikeAnswer from "./VoteLikeAnswer"
import VoteDisLikeAnswer from "./VoteDisLikeAnswer"

interface VoteAnswerProps {
  answer: Answer
}

function VoteAnswer({ answer }: VoteAnswerProps) {
  return (
    <div className="flex flex-col w-[51px] pc:w-[62px] items-center">
      <VoteLikeAnswer answer={answer} />
      <div className="text-center text-xl pc:text-2xl font-semibold">
        {answer.vote_count > 999 ? "999+" : answer.vote_count}
      </div>
      <VoteDisLikeAnswer answer={answer} />
    </div>
  )
}

export default VoteAnswer
