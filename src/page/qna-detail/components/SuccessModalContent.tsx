import DeleteSuccess from "@/components/shared/animation/DeleteSuccess"
import ProgressModal from "@/page/signup/components/ProgressModal"
import CheckSuccess from "@/components/shared/animation/CheckSuccess"
import { successMessage } from "@/constants/message"
import { CSSProperties } from "react"

export interface SuccesssModalProps {
  message: string
}

export interface IconProps {
  message: string
  style?: CSSProperties | undefined
}

const SuccessModalContent: React.FC<SuccesssModalProps> = ({ message }) => {
  return (
    <ProgressModal.Success>
      <ProgressModal.StepContentWrapper>
        <Icon message={message} style={{ width: "100px" }} />
        <p className="font-bold">{message}</p>
      </ProgressModal.StepContentWrapper>
    </ProgressModal.Success>
  )
}

export default SuccessModalContent

const Icon: React.FC<IconProps> = ({ message, style }) => {
  switch (message) {
    case successMessage.createAnswer:
      return <CheckSuccess style={style} />
    case successMessage.deleteAnswer:
      return <DeleteSuccess style={style} />
    case successMessage.deleteQuestion:
      return <DeleteSuccess style={style} />
    default:
      return null
  }
}
