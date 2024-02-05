"use client"

import Button from "@/components/shared/button/Button"
import { FunnelStepFunctionComponentProps } from "@/components/shared/funnel/Funnel"
import DeleteMemberModal from "../DeleteMemberModal"
import { useClientSession } from "@/hooks/useClientSession"
import Radio from "@/components/shared/radio/Radio"
import { HTMLProps, useRef } from "react"
import { twMerge } from "tailwind-merge"
import { FieldErrors } from "react-hook-form"
import { toast } from "react-toastify"

interface LabelProps extends HTMLProps<HTMLLabelElement> {}

export interface Reason {
  reason: (typeof reasons)[number]
  reasonDetail: string
}

const reasons = [
  "사용하기 불편해서",
  "디자인이 마음에 들지 않아서",
  "오류가 많아서",
  "기타",
] as const

function ReasonFormStep({
  register,
  handleSubmit,
  watch,
  setValue,
  setStep,
}: FunnelStepFunctionComponentProps<Reason>) {
  const { user } = useClientSession()

  const textareaWrapperRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const isOpenTextArea = watch("reason") === "기타"

  const onSubmit = (data: Reason) => {
    if (data.reason === "기타") {
      setValue("reasonDetail", textareaRef.current?.value ?? "")
    }

    setStep("confirm")
  }

  const onInvalid = (errors: FieldErrors<Reason>) => {
    const reasonErrortype = errors.reason?.type

    if (reasonErrortype === "validate") {
      toast.error("기타 이유는 최소4자 이상이어야 합니다", {
        position: "bottom-center",
      })

      return
    }

    toast.error("탈퇴 이유를 선택해주세요", { position: "bottom-center" })
  }

  return (
    <DeleteMemberModal.ContentWrapper>
      <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <div className="flex flex-col w-full gap-1 mb-2">
          <h3 className="text-xs text-secondary">
            {user?.nickname} 님이 떠나신다니 아쉽습니다 :&#40;
          </h3>
          <h4 className="box-border text-sm px-1 py-0.5 bg-info rounded-sm">
            다음에 더 나은 모습으로 찾아 뵐 수 있도록 <br />
            아래 탈퇴 이유를 선택해주세요
          </h4>
        </div>
        <div className="flex flex-col w-full gap-1">
          {reasons.map((reason, index) => {
            const id = `reason-${index}`

            return (
              <RadioGroup key={reason}>
                <Radio
                  {...register("reason", {
                    required: true,
                    validate: (reason) => {
                      if (reason === "기타") {
                        if (
                          !textareaRef.current?.value ||
                          textareaRef.current.value.length < 4
                        ) {
                          return false
                        }
                      }
                      return true
                    },
                  })}
                  id={id}
                  className="cursor-pointer"
                  theme="danger"
                  value={reason}
                />
                <Label htmlFor={id}>{reason}</Label>
              </RadioGroup>
            )
          })}
          <div
            ref={textareaWrapperRef}
            className="overflow-hidden transition-[height]"
            style={{
              height: isOpenTextArea
                ? textareaWrapperRef.current
                  ? `${textareaWrapperRef.current?.scrollHeight}px`
                  : "100%"
                : "0px",
            }}
          >
            <textarea
              ref={textareaRef}
              rows={3}
              className="resize-none w-full border border-colorsGray outline-none px-2 py-1 text-sm"
              disabled={!isOpenTextArea}
            />
          </div>
          <input {...register("reasonDetail")} hidden />
        </div>
        <div className="flex w-full justify-center items-center mt-4">
          <Button
            type="submit"
            className="border border-colorsGray bg-colorsLightGray text-danger"
          >
            다음
          </Button>
        </div>
      </form>
    </DeleteMemberModal.ContentWrapper>
  )
}

export default ReasonFormStep

function RadioGroup({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-3">{children}</div>
}

function Label({ className, children, ...props }: LabelProps) {
  const classNames = twMerge([
    `text-colorsGray [input[type="radio"]:checked_+_&]:text-black transition-colors cursor-pointer`,
    className,
  ])

  return (
    <label className={classNames} {...props}>
      {children}
    </label>
  )
}
