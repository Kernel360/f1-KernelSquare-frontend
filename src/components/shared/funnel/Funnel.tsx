"use client"

import { Dispatch, SetStateAction, useState } from "react"
import {
  FieldValues,
  FormProvider,
  FormProviderProps,
  useForm,
  useFormContext,
} from "react-hook-form"

export interface UseStepFormContext<T extends FieldValues = FieldValues>
  extends FormProviderProps<T> {
  step: string
  steps: Array<string>
  setStep: Dispatch<SetStateAction<string>>
}

export type FunnelStepFunctionComponentProps<
  T extends FieldValues = FieldValues,
> = UseStepFormContext<T>

interface FunnelProps {
  steps: Array<string>
  use?: "progress-bar" | "progress-step"
  onStepChange?: (step: string) => void
  children: Array<JSX.Element>
}

interface FunnelStepProps<T extends FieldValues = FieldValues> {
  stepName: string
  children: (props: FunnelStepFunctionComponentProps<T>) => JSX.Element
}

function Funnel({ steps, use, onStepChange, children }: FunnelProps) {
  const methods = useForm({ resetOptions: { keepValues: true } })
  const [step, setFunnelStep] = useState<(typeof steps)[number]>(steps[0])

  const setStep = (step: string) => {
    setFunnelStep(step)

    onStepChange && onStepChange(step)
  }

  const provider = { ...methods, steps, step, setStep }

  return (
    <FormProvider {...provider}>
      {use === "progress-bar" ? <Funnel.Progressbar /> : null}
      {children}
    </FormProvider>
  )
}

export default Funnel

Funnel.Step = function FunnelStep({
  stepName,
  children,
}: FunnelStepProps<any>) {
  const formContext = useFormContext() as UseStepFormContext

  if (formContext.step !== stepName) return null

  return children({ ...formContext })
}

Funnel.Progressbar = function FunnelProgressBar() {
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
