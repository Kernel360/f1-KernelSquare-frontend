"use client"

import { Dispatch, SetStateAction, useState } from "react"
import {
  FieldValues,
  FormProvider,
  FormProviderProps,
  useForm,
  useFormContext,
} from "react-hook-form"

interface UseStepFormContext<T extends FieldValues = FieldValues>
  extends FormProviderProps<T> {
  step: string
  steps: FunnelProps["steps"]
  setStep: Dispatch<SetStateAction<string>>
}

export type FunnelStepFunctionComponentProps = UseStepFormContext

interface FunnelProps {
  steps: Array<string>
  use?: "progress-bar" | "progress-step"
  children: Array<JSX.Element>
}

interface FunnelStepProps {
  stepName: string
  children: React.FC<UseStepFormContext>
}

function Funnel({ steps, use, children }: FunnelProps) {
  const methods = useForm({ resetOptions: { keepValues: true } })
  const [step, setStep] = useState(steps[0])

  const Step = children.find((funnelStep) => step === funnelStep.props.stepName)

  const provider = { ...methods, steps, step, setStep }

  return (
    <FormProvider {...provider}>
      {use === "progress-bar" ? <Funnel.Progress /> : null}
      {Step}
    </FormProvider>
  )
}

export default Funnel

Funnel.Step = function FunnelStep({ children }: FunnelStepProps) {
  const formContext = useFormContext() as UseStepFormContext

  return children({ ...formContext })
}

Funnel.Progress = function FunnelProgress() {
  const { steps, step } = useFormContext() as UseStepFormContext

  const stepIndex = steps.findIndex((stepName) => stepName === step) + 1

  const normalize = (
    value: number,
    { min, max }: { min: number; max: number },
  ) => {
    return ((value - min) * 100) / (max - min)
  }

  return (
    <div className="relative w-full h-2">
      <div className="absolute left-0 top-0 w-full h-full bg-colorsLightGray" />
      <div
        className="absolute left-0 top-0 h-full bg-danger transition-[width]"
        style={{
          width: `${normalize(stepIndex, { min: 1, max: steps.length })}%`,
        }}
      />
    </div>
  )
}
