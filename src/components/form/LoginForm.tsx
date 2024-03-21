"use client"

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
import { revalidatePage } from "@/util/actions/revalidatePage"
import { ToastContentProps, toast } from "react-toastify"
import { login } from "@/service/auth"
import { SessionPayload, userAtom } from "@/recoil/atoms/user"
import dayjs from "dayjs"
import { encrypt } from "@/util/crypto"
import { setAuthCookie } from "@/util/actions/cookie"
import { useSetRecoilState } from "recoil"
import LogoWithRowText from "../icons/LogoWithRowText"
import type { LoginFormData } from "@/interfaces/form"

interface LoginFormProps {
  onSuccess?: (user: NonNullable<SessionPayload>) => void
}

function LoginForm({ onSuccess }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginFormData>()
  const setUserAtom = useSetRecoilState(userAtom)

  const { closeModal } = useModal()

  const validator = new Validator()

  const linkClassNames = twJoin([
    "flex justify-center items-center font-semibold text-primary underline underline-offset-4",
  ])

  const onSubmit = async (data: LoginFormData) => {
    try {
      const loginResponse = await login({
        email: data.email,
        password: data.password,
      })

      const { token_dto, ...userPayload } = loginResponse.data.data!

      const { access_token, refresh_token } = token_dto
      const payload = {
        ...userPayload,
      }

      const expires = dayjs().add(1, "hours").startOf("second").toDate()

      const stringifyPayload = JSON.stringify({
        ...payload,
        expires: expires.toJSON(),
      } as SessionPayload)
      const encryptedPayload = encrypt(stringifyPayload)

      await setAuthCookie(
        access_token,
        refresh_token,
        encryptedPayload,
        expires,
      )

      setUserAtom({
        ...payload,
        expires: expires.toJSON(),
      })

      await revalidatePage("*")

      closeModal()

      if (onSuccess) {
        setTimeout(() => {
          onSuccess({ ...payload, expires: expires.toJSON() })
        }, 0)
      }
    } catch (error) {
      /*
        서버에서 유효하지 않은 응답이 오는 경우
        (ex. status 401)
      */

      toast.error(LoginForm.ErrorToast, { position: "top-center" })
    }
  }

  const onInvalid = (errors: FieldErrors<LoginFormData>) => {
    toast.error(LoginForm.ErrorToast, { position: "top-center" })
  }

  const handleClose = (e: React.MouseEvent<HTMLAnchorElement>) => {
    closeModal()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      className="w-full sm:w-[320px]"
    >
      <div className="max-w-full w-full h-12 flex gap-2 justify-center items-center">
        <LogoWithRowText className="w-full h-full max-w-[262px]" />
        <h2 className="sr-only">kernel square</h2>
      </div>
      <Spacing size={24} />
      <Input
        className="px-4 py-3.5 h-12 box-border placeholder:font-medium placeholder:text-base"
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
        classNames={{
          wrapper: "pl-4 pr-2 py-3.5 h-12 box-border",
          input: "p-0 placeholder:font-medium placeholder:text-base",
        }}
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
          className="px-2 py-4 text-base font-semibold text-white disabled:bg-[#E0E0E0] disabled:text-[#BDBDBD] disabled:pointer-events-none"
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? "로그인 중" : "로그인"}
        </Button>
      </div>
      <Spacing size={24} />
      {/* helper menu */}
      <div className="flex w-full justify-center items-center gap-6">
        <span className="font-medium text-[#656565]">
          커널 스퀘어가 처음이신가요?
        </span>
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

LoginForm.ErrorToast = function LoginFormErrorToast({
  closeToast,
  toastProps,
}: ToastContentProps) {
  return (
    <div className="text-xs">
      등록되지 않은 아이디 이거나,
      <br />
      아이디 또는 비밀번호를 잘못 입력했습니다
    </div>
  )
}

LoginForm.InternalServerErrorToast =
  function LoginFormInternalServerErrorToast({
    closeToast,
    toastProps,
  }: ToastContentProps) {
    return (
      <div className="text-xs">
        서버에러가 발생했습니다.
        <br />
        잠시후 다시 이용해주세요.
      </div>
    )
  }
