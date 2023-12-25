"use client"

import {
  CheckDuplicateFieldKeys,
  duplicateState,
} from "@/recoil/atoms/duplicate"
import { PropsWithChildren, LabelHTMLAttributes, HTMLAttributes } from "react"
import { useRecoilValue } from "recoil"
import { twMerge } from "tailwind-merge"

type SubLabelType = "requiredCheckDuplicate" | "duplicate" | "nonDuplicate"

interface DuplicateFieldSubLabelProps
  extends PropsWithChildren<HTMLAttributes<HTMLSpanElement>> {
  className?: string
  labelType: SubLabelType
}

interface DuplicateFieldLabelProps
  extends LabelHTMLAttributes<HTMLLabelElement> {
  field: CheckDuplicateFieldKeys
  renderFieldName?: string
  renderCase?: Partial<Record<SubLabelType, React.ReactNode>>
}

function DuplicateFieldLabel({
  field,
  renderFieldName,
  renderCase,
  className,
  children,
  ...props
}: DuplicateFieldLabelProps) {
  const fieldDuplicateState = useRecoilValue(duplicateState)
  const { checkedDuplicate, isDuplicate } = fieldDuplicateState[field]

  const labelClassNames = className

  const SubLabel = () => {
    // 중복확인 하지 않음
    if (!checkedDuplicate) {
      return (
        renderCase?.requiredCheckDuplicate ?? (
          <DuplicateFieldLabel.SubLabel labelType="requiredCheckDuplicate">
            [중복확인 필요]
          </DuplicateFieldLabel.SubLabel>
        )
      )
    }

    // 중복(사용 중)
    if (checkedDuplicate && isDuplicate) {
      return (
        renderCase?.duplicate ?? (
          <DuplicateFieldLabel.SubLabel labelType="duplicate">
            [사용중인 {renderFieldName ?? field}입니다]
          </DuplicateFieldLabel.SubLabel>
        )
      )
    }

    // 중복되지 않음(사용 가능)
    if (checkedDuplicate && !isDuplicate) {
      return (
        renderCase?.nonDuplicate ?? (
          <DuplicateFieldLabel.SubLabel labelType="nonDuplicate">
            [사용가능한 {renderFieldName ?? field}입니다]
          </DuplicateFieldLabel.SubLabel>
        )
      )
    }

    return null
  }

  return (
    <div className="flex gap-1 items-center">
      <label htmlFor={field} className={labelClassNames} {...props}>
        {children}
      </label>
      <SubLabel />
    </div>
  )
}

DuplicateFieldLabel.SubLabel = function DuplicateFieldSubLabel({
  labelType,
  className,
  children,
  ...props
}: DuplicateFieldSubLabelProps) {
  const classNames = twMerge([
    className,
    "text-xs font-bold",
    labelType === "requiredCheckDuplicate" && "text-colorsDarkGray",
    labelType === "duplicate" && "text-danger",
    labelType === "nonDuplicate" && "text-success",
  ])

  return (
    <span className={classNames} {...props}>
      {children}
    </span>
  )
}

export default DuplicateFieldLabel
