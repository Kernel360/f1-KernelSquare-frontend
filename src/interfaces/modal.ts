// 전역 modal
export interface ModalState {
  open: boolean
  containsHeader?: boolean
  closeableDim?: boolean
  classNames?: string
  content?: JSX.Element | null
  onClose?: () => void
}

// progress Modal
type ProgressModalStep = "pending" | "progressing" | "complete"
type ProgressModalSuccess = "unknown" | "success" | "fail"

export interface ProgressState {
  step: ProgressModalStep
  successStep: ProgressModalSuccess
}
