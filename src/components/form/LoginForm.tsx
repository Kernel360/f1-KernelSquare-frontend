"use client"

import { FieldErrors, useForm } from "react-hook-form"
import Button from "../shared/button/Button"
import Spacing from "../shared/Spacing"
import Link from "next/link"
import { twJoin } from "tailwind-merge"
import LabelDivider from "../shared/divider/LabelDivider"
import useModal from "@/hooks/useModal"
import SocialButton from "../SocialButton"
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
import { useRouter } from "next/navigation"
import PasswordFieldController from "../form-fields/login/password/PasswordFieldController"
import EmailFieldController from "../form-fields/login/email/EmailFieldController"

export interface LoginFormProps {
  onSuccess?: (user: NonNullable<SessionPayload>) => void
  continueURL?: string
}

function LoginForm({ onSuccess, continueURL }: LoginFormProps) {
  const { replace, push } = useRouter()

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>()

  const setUserAtom = useSetRecoilState(userAtom)

  const { closeModal } = useModal()

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

      if (continueURL) {
        closeModal()

        replace(continueURL)

        setTimeout(() => {
          revalidatePage("*")
        }, 400)

        return
      }

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
    toast.error(LoginForm.InvalidErrorToast, { position: "top-center" })
  }

  const handleClose = (e: React.MouseEvent<HTMLAnchorElement>) => {
    closeModal()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      className="w-full sm:w-[320px]"
    >
      <div
        className="max-w-full w-full h-12 flex gap-2 justify-center items-center cursor-pointer"
        onClick={() => push("/")}
      >
        <LogoWithRowText className="w-full h-full max-w-[262px]" />
        <h2 className="sr-only">kernel square</h2>
      </div>
      <Spacing size={24} />
      <EmailFieldController control={control} />
      <Spacing size={12} />
      <PasswordFieldController control={control} />
      <Spacing size={12} />
      <div>
        <Button
          type="submit"
          fullWidth
          buttonTheme="primary"
          className="px-2 py-4 text-base font-semibold text-white disabled:bg-[#E0E0E0] disabled:text-[#BDBDBD] disabled:pointer-events-none"
          disabled={isSubmitting}
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
      등록되지 않은 이메일이거나,
      <br />
      이메일 또는 비밀번호를 잘못 입력했습니다
    </div>
  )
}

LoginForm.InvalidErrorToast = function LoginFormInvalidErrorToast(
  props: ToastContentProps,
) {
  return (
    <div className="text-xs">
      이메일 또는 비밀번호를
      <br />
      다시 확인해주세요
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
