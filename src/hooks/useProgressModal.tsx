"use client"

import ProgressModal, {
  ProgressModalProps,
} from "@/page/signup/components/ProgressModal"
import {
  progressModalState,
  progressModalStepSelector,
  progressModalSuccessSelector,
} from "@/recoil/atoms/progressModal"
import { useCallback, useEffect, useMemo } from "react"
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil"
import useModal from "./useModal"
import { ProgressState } from "@/interfaces/modal"

interface UseProgressModalOptions {
  onFail?: () => void
  checkOpen?: (progressState: ProgressState) => boolean
  wrapper?: ProgressModalProps["wrapper"]
  content?: ProgressModalProps["content"]
}

export function useProgressModal({
  onFail,
  checkOpen = ({ step }) => step !== "pending",
  wrapper,
  content,
}: UseProgressModalOptions = {}) {
  const progressState = useRecoilValue(progressModalState)
  const setProgressStep = useSetRecoilState(progressModalStepSelector)
  const setSuccessStep = useSetRecoilState(progressModalSuccessSelector)
  const resetProgressModalState = useResetRecoilState(progressModalState)

  const { closeModal } = useModal()

  const open = useMemo(() => {
    return checkOpen(progressState)
  }, [progressState]) /* eslint-disable-line */

  const setStep = (step: "pending" | "start" | "success" | "fail") => {
    switch (step) {
      case "pending":
        setSuccessStep("unknown")
        setProgressStep("pending")

        return
      case "start":
        setSuccessStep("unknown")
        setProgressStep("progressing")

        return
      case "success":
        setSuccessStep("success")
        setProgressStep("complete")

        return
      case "fail":
        setSuccessStep("fail")
        setProgressStep("complete")

        return
    }
  }

  const ProgressModalView = useCallback(() => {
    return (
      <ProgressModal
        open={open}
        onFail={onFail}
        wrapper={wrapper}
        content={content}
      />
    )
  }, [onFail, open]) /* eslint-disable-line */

  useEffect(() => {
    return () => {
      closeModal()

      resetProgressModalState()
    }
  }, []) /* eslint-disable-line */

  return {
    ProgressModalView,
    progressState,
    reset: resetProgressModalState,
    setStep,
    setProgressStep,
    setSuccessStep,
    closeProgressModal: closeModal,
  }
}
