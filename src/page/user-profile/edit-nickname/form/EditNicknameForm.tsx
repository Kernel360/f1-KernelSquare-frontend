"use client"

import Funnel from "@/components/shared/funnel/Funnel"
import InputStep, { InputStepFormData } from "./InputStep"
import ConfirmStep from "./ConfirmStep"
import SubmitStep from "./SubmitStep"
import { twMerge } from "tailwind-merge"
import { FaCheckCircle } from "react-icons/fa"
import { TfiWrite } from "react-icons/tfi"
import { TbMessageCircleQuestion } from "react-icons/tb"
import { BsPersonCheckFill } from "react-icons/bs"
import { useState } from "react"
import { useMutationState } from "@tanstack/react-query"
import EditNicknameProgressLoading from "../loading/EditNicknameProgressLoading"
import { MdCancel } from "react-icons/md"

export enum EditNicknameFunnelStep {
  "Input" = 0,
  "Confirm" = 1,
  "Submit" = 2,
}

export type EditNicknameFormData = InputStepFormData

function EditNicknameForm() {
  const [step, setStep] = useState<keyof typeof EditNicknameFunnelStep>("Input")

  const editNicknameFunnelSteps: Array<keyof typeof EditNicknameFunnelStep> = [
    "Input",
    "Confirm",
    "Submit",
  ]

  return (
    <div>
      <EditNicknameProgress progressStep={step} />
      <Funnel
        steps={editNicknameFunnelSteps}
        onStepChange={(step) => setStep(step as any)}
      >
        <Funnel.Step stepName={EditNicknameFunnelStep[0]}>
          {InputStep}
        </Funnel.Step>
        <Funnel.Step stepName={EditNicknameFunnelStep[1]}>
          {ConfirmStep}
        </Funnel.Step>
        <Funnel.Step stepName={EditNicknameFunnelStep[2]}>
          {SubmitStep}
        </Funnel.Step>
      </Funnel>
    </div>
  )
}

export default EditNicknameForm

function EditNicknameProgress({
  progressStep,
}: {
  progressStep: keyof typeof EditNicknameFunnelStep
}) {
  const [editNicknameMutationStatus] = useMutationState({
    filters: { mutationKey: ["editNickname"] },
    select: (mutation) => mutation.state.status,
  })

  const classNames = (step: keyof typeof EditNicknameFunnelStep) =>
    twMerge([
      progressStep === step ? "text-secondary font-bold" : "text-colorsGray",
      EditNicknameFunnelStep[step] < EditNicknameFunnelStep[progressStep] &&
        "text-primary",
      step === "Submit" &&
        editNicknameMutationStatus === "success" &&
        "text-primary font-normal",
      step === "Submit" &&
        editNicknameMutationStatus === "error" &&
        "text-danger font-normal",
    ])

  const iconClassNames = (step: keyof typeof EditNicknameFunnelStep) =>
    twMerge([
      progressStep === step && "text-secondary",
      EditNicknameFunnelStep[step] > EditNicknameFunnelStep[progressStep] &&
        "text-colorsGray",
    ])

  return (
    <div className="w-full flex mb-4 pt-2 bg-white shadow-sm sticky z-[2] top-[calc(var(--height-header)+67px)] sm:top-[calc(var(--height-header))]">
      <div className="w-full flex max-w-[560px] mx-auto">
        <StepDescription
          step="Input"
          icon={<TfiWrite className={iconClassNames("Input")} />}
          description={<div className={classNames("Input")}>입력</div>}
          success={
            EditNicknameFunnelStep["Input"] <
            EditNicknameFunnelStep[progressStep]
          }
        />
        <StepLine
          active={
            EditNicknameFunnelStep["Input"] <
            EditNicknameFunnelStep[progressStep]
          }
        />
        <StepDescription
          step="Confirm"
          icon={
            <TbMessageCircleQuestion className={iconClassNames("Confirm")} />
          }
          description={<div className={classNames("Confirm")}>확인</div>}
          success={
            EditNicknameFunnelStep["Confirm"] <
            EditNicknameFunnelStep[progressStep]
          }
        />
        <StepLine
          active={
            EditNicknameFunnelStep["Confirm"] <
            EditNicknameFunnelStep[progressStep]
          }
        />
        <StepDescription
          step="Submit"
          icon={<BsPersonCheckFill className={iconClassNames("Submit")} />}
          description={<div className={classNames("Submit")}>결과</div>}
          loading={editNicknameMutationStatus === "pending"}
          success={
            progressStep === "Submit" &&
            editNicknameMutationStatus === "success"
          }
          fail={
            progressStep === "Submit" && editNicknameMutationStatus === "error"
          }
        />
      </div>
    </div>
  )
}

function StepDescription({
  step,
  icon,
  description,
  success = false,
  loading = false,
  fail = false,
}: {
  step: keyof typeof EditNicknameFunnelStep
  icon: React.ReactNode
  description: React.ReactNode
  success?: boolean
  loading?: boolean
  fail?: boolean
}) {
  return (
    <div className="flex flex-col px-2 pt-0.5 pb-2 items-center">
      <div className={`flex justify-center items-center mb-2`}>
        {loading ? (
          <EditNicknameProgressLoading className="w-4 h-4" />
        ) : success ? (
          <FaCheckCircle className="text-primary shrink-0" />
        ) : fail ? (
          <MdCancel className="text-base text-danger" />
        ) : (
          icon
        )}
      </div>
      {description}
    </div>
  )
}

function StepLine({ active }: { active: boolean }) {
  const lineClassNames = twMerge([
    "absolute left-0 top-0 h-full transition-[width] duration-300 bg-blue-400",
    active ? "w-full" : "w-0",
  ])

  return (
    <div className={"relative flex-1 h-1 mt-2 bg-colorsGray"}>
      <div className={lineClassNames} />
    </div>
  )
}
