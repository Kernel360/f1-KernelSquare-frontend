import { useState } from "react"

const useHandleMyAnswer = () => {
  const [isAnswerEditMode, setIsAnswerEditMode] = useState(false)

  return {
    isAnswerEditMode,
    setIsAnswerEditMode,
    handleEditMode: () => setIsAnswerEditMode((prev: boolean) => !prev),
  }
}

export default useHandleMyAnswer
