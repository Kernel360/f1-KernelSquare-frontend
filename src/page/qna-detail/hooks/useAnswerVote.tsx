import { errorMessage } from "@/constants/message"
import queryKey from "@/constants/queryKey"
import type { Answer } from "@/interfaces/answer"
import { answerQueries } from "@/react-query/answers"
import voteAtoms from "@/recoil/atoms/vote"
import { voteAnswer } from "@/service/answers"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { useRecoilState } from "recoil"

interface VoteProps {
  answer: Answer
  status?: 1 | -1
  userId: number | undefined
}

const useAnswerVote = ({ answer, status, userId }: VoteProps) => {
  const [vote, setVote] = useRecoilState(voteAtoms(answer?.created_by))
  const queryClient = useQueryClient()

  const { data, mutate } = answerQueries.useVoteAnswer()

  const handleRaise = () => {
    setVote({ ...vote, value: vote.value + 1 })
    if (!userId) return toast.error(errorMessage.unauthorized)
    try {
      mutate({
        answerId: answer?.answer_id,
        member_id: userId,
        status: status || 1,
      })
      console.log("[set vote]", { data })

      queryClient.invalidateQueries({ queryKey: [queryKey.answer] })
    } catch (err) {
      console.error("error", err)
    }
  }

  const handleReduce = () => {
    setVote({ ...vote, value: vote.value - 1 })
    if (!userId) return toast.error(errorMessage.unauthorized)
    try {
      voteAnswer({
        answerId: answer.answer_id,
        member_id: userId,
        status: -1,
      }).then((res) => {
        console.log("res", res.data.msg, res.config.data)
        queryClient.invalidateQueries({ queryKey: [queryKey.answer] })
      })
    } catch (err) {
      console.error("error", err)
    }
  }

  const handleCancle = () => {}

  return {
    vote,
    setVote,
    handleRaise,
    handleReduce,
    handleCancle,
  }
}

export default useAnswerVote
