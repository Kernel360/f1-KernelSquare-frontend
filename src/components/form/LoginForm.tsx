"use client"

import { LoginFormData } from "@/interfaces/form"
import { FieldErrors, useForm } from "react-hook-form"
import { Input } from "../shared/input/Input"
import Button from "../shared/button/Button"
import PasswordField from "../shared/input/PasswordField"
import Spacing from "../shared/Spacing"
import Link from "next/link"
import { twJoin } from "tailwind-merge"
import { RxDividerVertical } from "react-icons/rx"
import LabelDivider from "../shared/divider/LabelDivider"
import useModal from "@/hooks/useModal"
import SocialButton from "../SocialButton"

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>()

  const { closeModal } = useModal()

  const linkClassNames = twJoin([
    "text-sm text-colorsDarkGray underline underline-offset-4",
  ])

  const onSubmit = async (data: LoginFormData) => {
    console.log({ data })

    // closeModal();
    // update
  }

  const onInvalid = (errors: FieldErrors<LoginFormData>) => {
    console.log({ errors })

    // [TODO] show Toast
  }

  const handleClose = (e: React.MouseEvent<HTMLAnchorElement>) => {
    closeModal()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="w-[320px]">
      <h3 className="text-center text-3xl font-bold">KernalSquare</h3>
      <Spacing size={24} />
      <Input
        {...register("email", { required: "이메일을 입력해주세요" })}
        className="px-2"
        placeholder="이메일"
        autoComplete="off"
        error={!!errors.email}
        errorMessage={errors.email?.message}
        fullWidth
      />
      <Spacing size={12} />
      <PasswordField
        placeholder="비밀번호"
        fullWidth
        error={!!errors.password}
        errorMessage={errors.password?.message}
        {...register("password", { required: "비밀번호를 입력해주세요" })}
      />
      <Spacing size={12} />
      <div>
        <Button type="submit" fullWidth buttonTheme="primary">
          로그인
        </Button>
      </div>
      <Spacing size={24} />
      {/* helper menu */}
      {/* [TODO] 수정될 경우 변경 (href 등) */}
      <div className="flex w-full justify-center items-center">
        <Link href="/" className={linkClassNames} onClick={handleClose}>
          아이디(이메일) 찾기
        </Link>
        <RxDividerVertical className="text-sm text-black mt-1" />
        <Link href="/" className={linkClassNames} onClick={handleClose}>
          비밀번호 찾기
        </Link>
        <RxDividerVertical className="text-sm text-black mt-1" />
        <Link href="/signup" className={linkClassNames} onClick={handleClose}>
          회원가입
        </Link>
      </div>
      <Spacing size={24} />
      <LabelDivider label={"간편 로그인"} />
      <Spacing size={12} />
      {/* social login button */}
      <div className="flex w-full justify-center gap-2">
        <SocialButton social="kakao" action="login" />
        <SocialButton social="google" action="login" />
        <SocialButton social="github" action="login" />
      </div>
    </form>
  )
}

export default LoginForm
