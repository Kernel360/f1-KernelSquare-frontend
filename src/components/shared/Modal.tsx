"use client"

import { PropsWithChildren, useCallback } from "react"
import useModal from "@/hooks/useModal"
import { MdClose } from "react-icons/md"
import Button from "./button/Button"
import { twMerge } from "tailwind-merge"

interface ModalDimProps {
  onClose?: (e: React.MouseEvent<HTMLDivElement>) => void
}

interface ModalHeaderProps {
  onClose?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

interface ModalWrapperProps extends PropsWithChildren {
  className?: string
}

function Modal() {
  const { modal, closeModal } = useModal()

  const handleClose = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      closeModal()
    },
    [closeModal],
  )

  return modal.open ? (
    <Container>
      <Dim onClose={modal.closeableDim ? handleClose : undefined} />
      <Wrapper className={modal.classNames}>
        {modal.containsHeader ? <Header onClose={handleClose} /> : null}
        {modal.content}
      </Wrapper>
    </Container>
  ) : null
}

const Container = ({ children }: PropsWithChildren) => {
  return (
    <div className="fixed left-0 top-0 w-full h-full z-modalContainer flex justify-center items-center p-4">
      {children}
    </div>
  )
}

const Dim = ({ onClose }: ModalDimProps) => {
  return (
    <div
      className="absolute left-0 top-0 w-full h-full bg-black/30 flex justify-center items-center box-border z-modalDim"
      onClick={onClose}
    />
  )
}

const Header = ({ onClose }: ModalHeaderProps) => {
  return (
    <div className="flex w-full justify-end sticky top-0">
      <Button className="p-0" onClick={onClose}>
        <MdClose className="text-lg" />
      </Button>
    </div>
  )
}

const Wrapper = ({ className, children }: ModalWrapperProps) => {
  const classNames = twMerge([
    "bg-white rounded-lg p-4 z-modal max-h-full overflow-y-auto overflow-x-hidden",
    className,
  ])

  return <div className={classNames}>{children}</div>
}

export default Modal
