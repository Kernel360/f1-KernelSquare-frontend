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
import { Validator } from "@/util/validate"

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
  } = useForm<LoginFormData & { hiddenResult: boolean }>()

  const { closeModal } = useModal()

  const validator = new Validator()

  const linkClassNames = twJoin([
    "text-sm text-colorsDarkGray underline underline-offset-4",
  ])

  const onSubmit = async (data: LoginFormData) => {
    try {
      console.log({ data })
      // closeModal();
      // update
    } catch (error) {
      /*
        서버에서 유효하지 않은 응답이 오는 경우
        (ex. status 401)
      */

      // [TODO] show Toast
      alert(
        "등록되지 않은 아이디이거나, 아이디 또는 비밀번호를 잘못 입력했습니다",
      )
    }
  }

  const onInvalid = (errors: FieldErrors<LoginFormData>) => {
    // [TODO] show Toast
    alert(
      "등록되지 않은 아이디이거나, 아이디 또는 비밀번호를 잘못 입력했습니다",
    )
  }

  const handleClose = (e: React.MouseEvent<HTMLAnchorElement>) => {
    closeModal()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      className="w-full sm:w-[320px]"
    >
      <h3 className="text-center text-3xl font-bold">KernalSquare</h3>
      <Spacing size={24} />
      <Input
        className="px-2"
        fullWidth
        placeholder="이메일"
        autoComplete="off"
        error={!!errors.email}
        errorMessage={errors.email?.message}
        {...register("email", {
          required: true,
          validate: (email) => {
            const { allCheck } = validator.validateEmail(email)

            return allCheck()
          },
        })}
      />
      <Spacing size={12} />
      <PasswordField
        placeholder="비밀번호"
        fullWidth
        error={!!errors.password}
        errorMessage={errors.password?.message}
        {...register("password", {
          required: true,
          validate: (password) => {
            const { allCheck } = validator.validatePassword(password)

            return allCheck()
          },
        })}
      />
      <Spacing size={12} />
      <div>
        <Button
          type="submit"
          fullWidth
          buttonTheme="primary"
          className="disabled:bg-colorsGray"
          disabled={!isValid}
        >
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
