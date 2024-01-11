import { VoteIcons } from "@/components/icons/Icons"
import useAnswerVote from "../../hooks/useAnswerVote"
import type { Answer } from "@/interfaces/answer"
import { useEffect } from "react"

type VoteBoxProps = {
  userId?: number
  answer: Answer
}

const VoteBox = ({ userId, answer }: VoteBoxProps) => {
  const { vote, setVote, handleRaise, handleReduce } = useAnswerVote({
    answer,
    userId,
  })

  useEffect(() => {
    setVote({ ...vote, value: answer.vote_count })
  }, [answer.vote_count])

  return (
    <form className="mr-5">
      <div className="flex justify-center">
        <VoteIcons.Up
          className="text-[30px] hover:text-primary"
          onClick={handleRaise}
        />
      </div>
      <div className="text-[30px]">
        {vote.value < 10 ? "0" + vote.value : vote.value}
      </div>
      <div className="flex justify-center">
        <VoteIcons.Down
          className="text-[30px] hover:text-primary"
          onClick={handleReduce}
        />
      </div>
    </form>
  )
}

export default VoteBox
