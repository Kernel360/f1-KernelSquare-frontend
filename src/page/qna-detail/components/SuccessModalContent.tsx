import DeleteSuccess from "@/components/shared/animation/DeleteSuccess"
import { successMessage } from "@/constants/message"
import ProgressModal from "@/page/signup/components/ProgressModal"

const SuccessModalContent = () => (
  <ProgressModal.Success>
    <ProgressModal.StepContentWrapper>
      <DeleteSuccess style={{ width: "100px" }} />
      <p className="font-bold">{successMessage.deleteQuestoin}</p>
    </ProgressModal.StepContentWrapper>
  </ProgressModal.Success>
)

export default SuccessModalContent
