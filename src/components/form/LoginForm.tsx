"use client"

import { LoginFormData } from "@/interfaces/form"
import { FieldErrors, useForm } from "react-hook-form"
import { Input } from "../shared/input/Input"
import Button from "../shared/button/Button"
import PasswordField from "../shared/input/PasswordField"
import Spacing from "../shared/Spacing"
import Link from "next/link"
import { twJoin } from "tailwind-merge"
import LabelDivider from "../shared/divider/LabelDivider"
import useModal from "@/hooks/useModal"
import SocialButton from "../SocialButton"
import { Validator } from "@/util/validate"
import { login } from "@/service/auth"
import { useQueryClient } from "@tanstack/react-query"

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>()

  const queryClient = useQueryClient()

  const { closeModal } = useModal()

  const validator = new Validator()

  const linkClassNames = twJoin([
    "flex justify-center items-center text-sm text-primary underline underline-offset-4",
  ])

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login({ email: data.email, password: data.password })

      // update
      // 현재는 id로만 member 데이터를 가져올 수 있음
      // 쿠키에서 토큰을 가져오고, jwt를 파싱해서 진행해야 하는데
      // 프론트에서 필요한 로직일지 의문
      //
      // token만 가지고 유저 정보를 가져올 수 있는
      // api를 백엔드에 요청해볼 예정

      // react query 유저 쿼리 캐시 초기화
      queryClient.invalidateQueries({ queryKey: ["user"] })

      closeModal()
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
      <div className="flex w-full justify-center items-center">
        <span className="text-sm">처음이신가요?&nbsp;&nbsp;</span>
        <Link href="/signup" className={linkClassNames} onClick={handleClose}>
          회원가입
        </Link>
      </div>
      <Spacing size={24} />
      <LabelDivider label={"간편 로그인"} />
      <Spacing size={12} />
      {/* social login button */}
      <div className="flex w-full justify-center gap-2">
        <SocialButton social="github" action="login" />
      </div>
    </form>
  )
}

export default LoginForm
