import { Introduction } from "@/recoil/atoms/member"
import { EditMode } from "@/recoil/atoms/mode"
import { useRecoilState } from "recoil"

const useMyPage = () => {
  /**
   * 자기소개 수정 관련
   */
  const [isEditMode, setIsEditMode] = useRecoilState(EditMode)
  const closeEditMode = () => setIsEditMode(false)
  const handleEditMode = () => setIsEditMode((prev: boolean) => !prev)

  const [introduction, setIntroduction] = useRecoilState(Introduction)

  return {
    isEditMode,
    setIsEditMode,
    closeEditMode,
    handleEditMode,
    introduction,
    setIntroduction,
  }
}

export default useMyPage
