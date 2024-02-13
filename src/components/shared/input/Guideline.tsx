import { Validator } from "@/util/validate"
import { twMerge } from "tailwind-merge"

interface GuideLineLabelProps {
  value: string
  valid: boolean
}

type Guide = {
  label: string | ((props: GuideLineLabelProps) => JSX.Element)
  value?: string
  valid: boolean
}

interface GuidelineProps {
  className?: string
  open: boolean
  guildeline: Array<Guide>
}

const validator = new Validator()

function Guideline({ open, guildeline, className }: GuidelineProps) {
  const wrapperClassNames = twMerge(["text-xs", className])

  const itemClassNames = ({ valid }: { valid: boolean }) =>
    twMerge(["text-secondary", valid ? "text-primary" : "text-danger"])

  return open ? (
    <ul className={wrapperClassNames}>
      {guildeline.map(({ label, valid, value }, index) => {
        return (
          <li key={`guideline-${label}`} className={itemClassNames({ valid })}>
            {typeof label === "string"
              ? label
              : label({ valid, value: value ?? "" })}
          </li>
        )
      })}
    </ul>
  ) : null
}

export default Guideline

Guideline.PasswordLabel = function GuideLinePasswordLabel({
  value,
  valid,
}: GuideLineLabelProps) {
  const { minLowerCase, minUppercase, minNumbers, minSymbols } = validator
    .validatePassword(value)
    .eachFormat()

  const validClassNames = (valid: boolean) =>
    twMerge(["text-secondary", valid ? "text-primary" : "text-danger"])

  const Delimeter = () => {
    return <span className="text-secondary">&nbsp;/&nbsp;</span>
  }

  return (
    <>
      <span className={validClassNames(valid)}>-&nbsp;</span>
      <span className={validClassNames(minLowerCase)}>영문 소문자</span>
      <Delimeter />
      <span className={validClassNames(minUppercase)}>영문 대문자</span>
      <Delimeter />
      <span className={validClassNames(minNumbers)}>숫자</span>
      <Delimeter />
      <span className={validClassNames(minSymbols)}>특수문자</span>
      <br />
      <span className={"text-secondary ml-2"}>각 1자 이상 포함</span>
    </>
  )
}
