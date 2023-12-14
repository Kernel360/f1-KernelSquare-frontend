export interface ModalState {
  open: boolean
  containsHeader?: boolean
  classNames?: string
  content?: JSX.Element | null
  onClose?: () => void
}
