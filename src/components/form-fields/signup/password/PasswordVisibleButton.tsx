"use client"

import Button from "@/components/shared/button/Button"
import { useState } from "react"
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx"

export interface PasswordVisibleButtonProps {
  disabled?: boolean
  onPasswordVisibleChange: (changedVisible: boolean) => void
  className?: string
}

function PasswordVisibleButton({
  onPasswordVisibleChange,
  disabled,
  className,
}: PasswordVisibleButtonProps) {
  const [passwordVisible, setPasswordVisible] = useState(false)

  const handlePasswordVisible = () => {
    const targetVisible = !passwordVisible

    setPasswordVisible(targetVisible)
    onPasswordVisibleChange(targetVisible)
  }

  return (
    <Button
      disabled={disabled}
      onClick={handlePasswordVisible}
      className={className}
    >
      {passwordVisible ? (
        <RxEyeClosed className="text-lg" />
      ) : (
        <RxEyeOpen className="text-lg" />
      )}
    </Button>
  )
}

export default PasswordVisibleButton
