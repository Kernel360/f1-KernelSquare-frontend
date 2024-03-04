"use client"

import { useEffect, PropsWithChildren, HTMLAttributes } from "react"
import useModal from "@/hooks/useModal"
import Lottie from "lottie-react"
import checkSuccess from "@/assets/lottie/check-success.json"
import checkFailWithEmoji from "@/assets/lottie/check-fail-with-emoji.json"
import { useRecoilValue, useResetRecoilState } from "recoil"
import { progressModalState } from "@/recoil/atoms/progressModal"

type WrapperProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>

export interface ProgressModalProps {
  onFail?: () => void
  open?: boolean
  wrapper?: (props: WrapperProps) => React.ReactNode
  content?: {
    progressing?: React.ReactNode
    success?: React.ReactNode
    fail?: React.ReactNode
  }
}

function ProgressModal({ onFail, open, wrapper, content }: ProgressModalProps) {
  const { step, successStep } = useRecoilValue(progressModalState)
  const reset = useResetRecoilState(progressModalState)

  const isOpen = open ?? step === "pending"

  const { openModal, closeModal } = useModal()

  const ModalWrapper = (props: WrapperProps) => {
    const TargetModalWrapper = wrapper ?? ProgressModal.Wrapper

    return <TargetModalWrapper {...props} />
  }

  const ModalContent = () => {
    if (successStep === "unknown" && step === "progressing") {
      return (
        <ProgressModal.Progressing>
          {content?.progressing}
        </ProgressModal.Progressing>
      )
    }

    if (successStep === "success" && step === "complete") {
      return <ProgressModal.Success>{content?.success}</ProgressModal.Success>
    }

    if (successStep === "fail") {
      return <ProgressModal.Fail>{content?.fail}</ProgressModal.Fail>
    }
  }

  useEffect(() => {
    if (!isOpen) {
      closeModal()

      return
    }

    if (step === "progressing" || step === "complete") {
      openModal({
        containsHeader: successStep === "fail",
        closeableDim: false,
        ...(successStep === "fail" && {
          onClose: () => {
            onFail && onFail()
            reset()
          },
        }),
        content: (
          <ModalWrapper>
            <ModalContent />
          </ModalWrapper>
        ),
      })
    }
  }, [step, successStep]) /* eslint-disable-line */

  return null
}

ProgressModal.Wrapper = function ProgressModalWrapper({
  children,
  ...props
}: WrapperProps) {
  return (
    <div
      className="w-[calc(100dvw-48px)] sm:w-[520px] flex flex-col justify-center items-center h-40"
      {...props}
    >
      {children}
    </div>
  )
}

ProgressModal.StepContentWrapper = function ProgressModalStepContentWrapper({
  children,
}: PropsWithChildren) {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      {children}
    </div>
  )
}

ProgressModal.Progressing = function ProgressModalProgressing({
  children,
}: PropsWithChildren) {
  return children ? (
    <>{children}</>
  ) : (
    <ProgressModal.StepContentWrapper>
      <p className="text-secondary font-semibold">가입을 진행중이에요</p>
    </ProgressModal.StepContentWrapper>
  )
}

ProgressModal.Success = function ProgressModalSuccess({
  children,
}: PropsWithChildren) {
  return children ? (
    <>{children}</>
  ) : (
    <ProgressModal.StepContentWrapper>
      <p className="text-success font-bold">가입을 성공했어요</p>
      <Lottie className="w-20" animationData={checkSuccess} loop={false} />
      <p className="text-secondary font-semibold mt-2">
        Q&A 페이지로 이동 중이에요
      </p>
    </ProgressModal.StepContentWrapper>
  )
}

ProgressModal.Fail = function ProgressModalFail({
  children,
}: PropsWithChildren) {
  return children ? (
    <>{children}</>
  ) : (
    <ProgressModal.StepContentWrapper>
      <Lottie className="w-20" animationData={checkFailWithEmoji} />
      <div className="text-danger font-bold">서버에러가 발생했어요</div>
      <div className="mt-4">
        <div>잠시뒤에 다시 시도해주세요</div>
        <div className="text-secondary font-bold">
          이용에 불편을 드려 죄송해요
        </div>
      </div>
    </ProgressModal.StepContentWrapper>
  )
}

export default ProgressModal
