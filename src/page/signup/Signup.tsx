"use client"

import Spacing from "@/components/shared/Spacing"
import Button from "@/components/shared/button/Button"
import { signup } from "@/service/auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { FieldErrors, useForm } from "react-hook-form"
import { useRecoilValue, useResetRecoilState } from "recoil"
import { FieldDuplicateState, duplicateState } from "@/recoil/atoms/duplicate"
import { sleep } from "@/util/sleep"
import { useProgressModal } from "@/hooks/useProgressModal"
import { toast } from "react-toastify"
import Link from "next/link"
import LogoWithRowText from "@/components/icons/LogoWithRowText"
import EmailFieldController from "@/components/form-fields/signup/email/EmailFieldController"
import NicknameFieldController from "@/components/form-fields/signup/nickname/NicknameFieldController"
import PasswordFieldController from "@/components/form-fields/signup/password/PasswordFieldController"
import { SignupHookFormData } from "@/interfaces/form"
import PasswordCheckFieldController from "@/components/form-fields/signup/password-check/PasswordCheckFieldContorller"

function Signup() {
  const { replace } = useRouter()

  const { ProgressModalView, setStep } = useProgressModal()

  const {
    control,
    handleSubmit,
    setFocus,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SignupHookFormData>({
    mode: "onChange",
  })

  const signupDuplicate = useRecoilValue(duplicateState)
  const resetSignupDuplicate = useResetRecoilState(duplicateState)

  const disableCase =
    !isValid ||
    (Object.values(signupDuplicate) as Array<FieldDuplicateState>).some(
      (duplicateState) => {
        // 중복체크를 하지 않거나, 중복인 필드가 있는경우
        return !duplicateState.checkedDuplicate || duplicateState.isDuplicate
      },
    )

  const onSubmit = async ({
    email,
    nickname,
    password,
    image_url,
  }: SignupHookFormData) => {
    // api 요청 중(onSubmit 실행 중)인 경우 재 요청되지 않도록 함
    if (isSubmitting) {
      return
    }

    /* --- 
       비정상적인 가입 버튼 클릭 대응 (유효성 검증을 통해 불필요한 api 요청을 막기 위해)
       중복확인에 대해 react hook form validate로 설정하지 않아 따로 검증해야 함 
       --- 
    */
    // 중복확인을 하지 않은 필드가 있을 경우 api 요청되지 않도록 유효성 검증
    if (!signupDuplicate.email.checkedDuplicate) {
      toast.error("이메일 중복체크를 해주세요", {
        position: "top-center",
      })

      setTimeout(() => {
        setFocus("email")
      }, 0)

      return
    }

    if (!signupDuplicate.nickname.checkedDuplicate) {
      toast.error("닉네임 중복체크를 해주세요", {
        position: "top-center",
      })

      setTimeout(() => {
        setFocus("nickname")
      }, 0)

      return
    }

    // 중복(사용 중)인 필드가 있을 경우 api 요청되지 않도록 유효성 검증
    if (signupDuplicate.email.isDuplicate) {
      toast.error("사용중인 이메일로 가입할 수 없습니다", {
        position: "top-center",
      })

      setTimeout(() => {
        setFocus("email")
      }, 0)

      return
    }

    if (signupDuplicate.nickname.isDuplicate) {
      toast.error("사용중인 닉네임으로 가입할 수 없습니다", {
        position: "top-center",
      })

      setTimeout(() => {
        setFocus("nickname")
      }, 0)

      return
    }

    if (!isValid) {
      onInvalid(errors)

      return
    }

    // submit시 이전 값을 보존하기 위해 설정
    // 하지 않을 경우 포커스 같은 유저 액션이 있기 전까지는
    // 해당 필드가 빈 값이기 때문에 가이드라인에서 valid가 false로 됨
    // reset({ email, nickname, password, passwordCheck, image_url })

    /* ------ */
    setStep("start")

    // 가입 진행중 상태를 의도적으로 지연
    // 이후에 삭제 할 수 있음
    await sleep(500)

    try {
      await signup({
        email,
        password,
        nickname,
        image_url,
      })

      setStep("success")

      // 성공 화면 렌더링 후 3초정도 지난 뒤에 홈으로 이동
      sleep(3000).then(() => replace(`/qna?page=0`))
    } catch (error) {
      setStep("fail")
    }
  }

  const onInvalid = (errors: FieldErrors<SignupHookFormData>) => {
    toast.error("유효하지 않습니다", {
      position: "top-center",
      toastId: "signupFieldError",
    })
  }

  useEffect(() => {
    return () => {
      // reset
      resetSignupDuplicate()
    }
  }, []) /* eslint-disable-line */

  return (
    <div className="flex min-w-[320px] w-full h-full min-h-[100dvh] justify-center items-center box-border p-4">
      <form
        className="w-full max-w-[480px] border p-4 rounded-lg"
        onSubmit={handleSubmit(onSubmit, onInvalid)}
      >
        {/* logo - click: move Home */}
        <section className="w-full flex justify-center items-center">
          <Link href={"/"} className="flex justify-center items-center mx-auto">
            <LogoWithRowText className="w-[232px] h-12" />
            <h2 className="sr-only">kernel square</h2>
          </Link>
        </section>
        <Spacing size={14} />
        {/* email field */}
        <EmailFieldController control={control} disabled={isSubmitting} />
        <Spacing size={28} />
        {/* nickname field */}
        <NicknameFieldController control={control} disabled={isSubmitting} />
        <Spacing size={28} />
        {/* password field */}
        <PasswordFieldController control={control} disabled={isSubmitting} />
        <Spacing size={48} />
        {/* password check field */}
        <PasswordCheckFieldController
          control={control}
          disabled={isSubmitting}
        />
        <Spacing size={60} />
        <div>
          <Button
            type="submit"
            fullWidth
            buttonTheme="primary"
            disabled={disableCase || isSubmitting}
            className="px-2 py-4 disabled:bg-colorsGray disabled:hover:bg-colorsGray disabled:text-colorsDarkGray"
          >
            {isSubmitting ? "가입 진행 중" : "회원가입"}
          </Button>
        </div>
      </form>
      <ProgressModalView />
    </div>
  )
}

export default Signup
