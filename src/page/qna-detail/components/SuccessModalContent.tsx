import DeleteSuccess from "@/components/shared/animation/DeleteSuccess"
import ProgressModal from "@/page/signup/components/ProgressModal"

interface SuccesssModalProps {
  message: string
}

const SuccessModalContent = ({ message }: SuccesssModalProps) => (
  <ProgressModal.Success>
    <ProgressModal.StepContentWrapper>
      <DeleteSuccess style={{ width: "100px" }} />
      <p className="font-bold">{message}</p>
    </ProgressModal.StepContentWrapper>
  </ProgressModal.Success>
)

export default SuccessModalContent
