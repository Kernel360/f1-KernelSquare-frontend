"use client"

import { ProgressState } from "@/interfaces/modal"
import { atom, selector } from "recoil"

export const progressModalState = atom<ProgressState>({
  key: "progress-modal-atom",
  default: {
    step: "pending",
    successStep: "unknown",
  },
})

export const progressModalStepSelector = selector<ProgressState["step"]>({
  key: "progress-modal-step-selector",
  get(opts) {
    return opts.get(progressModalState).step
  },
  set(opts, progressStep) {
    const prev = opts.get(progressModalState)
    opts.set(progressModalState, {
      ...prev,
      step: progressStep as ProgressState["step"],
    })
  },
})

export const progressModalSuccessSelector = selector<
  ProgressState["successStep"]
>({
  key: "progress-modal-success-selector",
  get(opts) {
    return opts.get(progressModalState).successStep
  },
  set(opts, successStep) {
    const prev = opts.get(progressModalState)
    opts.set(progressModalState, {
      ...prev,
      successStep: successStep as ProgressState["successStep"],
    })
  },
})
