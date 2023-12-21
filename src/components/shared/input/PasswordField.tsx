import { ForwardedRef, forwardRef, useState } from "react"
import { InputProps } from "./Input"
import RowInput from "./RowInput"
import { RxEyeOpen, RxEyeClosed } from "react-icons/rx"
import Button from "../button/Button"

interface PasswordFieldProps extends InputProps {}

interface PasswordVisibleButtonProps {
  onPasswordVisibleChange: (changedVisible: boolean) => void
}

function PasswordField(
  {
    className,
    fullWidth,
    error,
    errorMessage,
    helpMessage,
    ...props
  }: PasswordFieldProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const [type, setType] =
    useState<Extract<InputProps["type"], "text" | "password">>("password")

  return (
    <RowInput
      ref={ref}
      type={type}
      sideField={
        <PasswordVisibleButton
          onPasswordVisibleChange={(passwordvisible) =>
            setType(passwordvisible ? "text" : "password")
          }
        />
      }
      fullWidth={fullWidth}
      error={error}
      errorMessage={errorMessage}
      helpMessage={helpMessage}
      {...props}
    />
  )
}

function PasswordVisibleButton({
  onPasswordVisibleChange,
}: PasswordVisibleButtonProps) {
  const [passwordVisible, setPasswordVisible] = useState(false)

  const handlePasswordVisible = () => {
    const targetVisible = !passwordVisible

    setPasswordVisible(targetVisible)
    onPasswordVisibleChange(targetVisible)
  }

  return (
    <Button onClick={handlePasswordVisible}>
      {passwordVisible ? (
        <RxEyeClosed className="text-lg" />
      ) : (
        <RxEyeOpen className="text-lg" />
      )}
    </Button>
  )
}

export default forwardRef(PasswordField)
