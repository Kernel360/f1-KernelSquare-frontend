"use client"

import SocialButton from "@/components/SocialButton"
import Spacing from "@/components/shared/Spacing"
import Button from "@/components/shared/button/Button"
import LabelDivider from "@/components/shared/divider/LabelDivider"
import Guideline from "@/components/shared/input/Guideline"
import { SignupFormData } from "@/interfaces/form"
import { signup } from "@/service/auth"
import { Validator } from "@/util/validate"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil"
import {
  FieldDuplicateState,
  checkDuplicateFieldValues,
  duplicateDefaultState,
  duplicateState,
} from "@/recoil/atoms/duplicate"
import DuplicateFieldLabel from "./components/DuplicateFieldLabel"
import EmailInput from "./components/EmailInput"
import NicknameInput from "./components/NicknameInput"
import PasswordInput from "./components/PasswordInput"
import { sleep } from "@/util/sleep"
import { useProgressModal } from "@/hooks/useProgressModal"
import { toast } from "react-toastify"
import Logo from "@/components/icons/Logo"
import Link from "next/link"

interface SignupHookFormData extends SignupFormData {
  passwordCheck: string
}

interface GuidelineOpen {
  email: boolean
  nickname: boolean
  password: boolean
  passwordCheck: boolean
}

// [TODO] 이미지 업로드

function Signup() {
  const { replace } = useRouter()

  const { ProgressModalView, setStep } = useProgressModal()

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    trigger,
    setFocus,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SignupHookFormData>({
    mode: "onChange",
  })

  const [signupDuplicate, setSignupDuplicate] = useRecoilState(duplicateState)
  const setSignupCheckDuplicateField = useSetRecoilState(
    checkDuplicateFieldValues,
  )
  const resetSignupDuplicate = useResetRecoilState(duplicateState)
  const resetCheckDuplicateField = useResetRecoilState(
    checkDuplicateFieldValues,
  )

  const field = {
    email: watch("email"),
    nickname: watch("nickname"),
    password: watch("password"),
    passwordCheck: watch("passwordCheck"),
  }

  const [guidelineOpen, setGuidelineOpen] = useState<GuidelineOpen>({
    email: false,
    nickname: false,
    password: false,
    passwordCheck: false,
  })

  const validator = new Validator()

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
    passwordCheck,
    image_url,
  }: SignupHookFormData) => {
    // submit시 이전 값을 보존하기 위해 설정
    // 하지 않을 경우 포커스 같은 유저 액션이 있기 전까지는
    // 해당 필드가 빈 값이기 때문에 가이드라인에서 valid가 false로 됨
    reset({ email, nickname, password, passwordCheck, image_url })

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
      sleep(3000).then(() => replace("/"))
    } catch (error) {
      setStep("fail")
    }
  }

  const handleFocus = (e: React.FocusEvent<HTMLDivElement, Element>) => {
    const targetField = e.currentTarget.dataset.field!

    // focus된 필드의 guideline만 open
    setGuidelineOpen((prev) => ({
      email: false,
      nickname: false,
      password: false,
      passwordCheck: false,
      [targetField]: true,
    }))
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const targetField = e.currentTarget.dataset.field!

    /*
      중복체크, 
      비밀번호 보여주기/감추기 버튼 클릭시
      바로 버튼클릭 로직이 수행될 수 있도록 하기 위해 적용
      (적용하지 않을 경우, blur 된 이후 한번 더 클릭해야 함)
    */
    if (e.relatedTarget?.tagName === "BUTTON") {
      return
    }

    setGuidelineOpen((prev) => ({
      ...prev,
      [targetField]: false,
    }))
  }

  useEffect(() => {
    return () => {
      // reset
      resetSignupDuplicate()
      resetCheckDuplicateField()
    }
  }, []) /* eslint-disable-line */

  return (
    <div className="flex w-full h-full min-h-[100dvh] justify-center items-center box-border p-4">
      <form className="border p-4 rounded-lg" onSubmit={handleSubmit(onSubmit)}>
        {/* <h3 className="text-3xl font-bold text-center">회원가입</h3> */}
        <section className="w-full flex justify-center items-center">
          <Link href={"/"} className="flex gap-2 items-center">
            <Logo className="text-[40px]" />
            <h3 className="text-center text-2xl font-bold text-secondary">
              <span className="font-bold">KERNEL</span>&nbsp;
              <span className="font-bold">SQUARE</span>
            </h3>
          </Link>
        </section>
        <Spacing size={14} />
        {/* email field */}
        <DuplicateFieldLabel field="email" renderFieldName="이메일">
          이메일
        </DuplicateFieldLabel>
        <EmailInput
          data-field="email"
          id="email"
          autoComplete="off"
          spellCheck="false"
          placeholder="example@email.com"
          fullWidth
          trigger={trigger}
          error={!!errors.email}
          errorMessage={errors.email?.message}
          onAfterFocus={handleFocus}
          classNames={{
            wrapper: "aria-disabled:bg-colorsLightGray",
            input: "disabled:bg-transparent",
          }}
          {...register("email", {
            required: true,
            validate: (email) => {
              const { format, length } = validator.validateEmail(email)

              if (!format()) {
                return false
              }
              if (!length()) {
                return false
              }

              return true
            },
            onBlur: handleBlur,
            onChange(event) {
              setSignupCheckDuplicateField((prev) => ({
                ...prev,
                email: event.currentTarget.value,
              }))

              if (signupDuplicate.email.checkedDuplicate) {
                setSignupDuplicate((prev) => ({
                  ...prev,
                  email: {
                    ...duplicateDefaultState.email,
                  },
                }))
              }
            },
            disabled: isSubmitting,
          })}
        />
        <Guideline
          open={guidelineOpen.email}
          guildeline={[
            {
              label: "- 이메일 형식(ex. example@email.com)",
              valid: validator.validateEmail(field.email).format(),
            },
            {
              label: "- 6자 이상 40자 이하 입력(공백제외)",
              valid: validator.validateEmail(field.email).length(),
            },
            {
              label: "- 이메일 중복 체크",
              valid: signupDuplicate.email.checkedDuplicate,
            },
          ]}
          className="mt-1"
        />
        <Spacing size={12} />
        {/* nickname field */}
        <DuplicateFieldLabel field="nickname" renderFieldName="닉네임">
          닉네임
        </DuplicateFieldLabel>
        <NicknameInput
          data-field="nickname"
          id="nickname"
          autoComplete="off"
          spellCheck="false"
          placeholder="zl존"
          fullWidth
          trigger={trigger}
          error={!!errors.nickname}
          errorMessage={errors.nickname?.message}
          onAfterFocus={handleFocus}
          classNames={{
            wrapper: "aria-disabled:bg-colorsLightGray",
            input: "disabled:bg-transparent",
          }}
          {...register("nickname", {
            required: true,
            validate: (nickname) => {
              const { format, length } = validator.validateNickname(nickname)

              if (!format()) {
                return false
              }

              if (!length()) {
                return false
              }

              return true
            },
            onBlur: handleBlur,
            onChange(event) {
              setSignupCheckDuplicateField((prev) => ({
                ...prev,
                nickname: event.currentTarget.value,
              }))

              if (signupDuplicate.nickname.checkedDuplicate) {
                setSignupDuplicate((prev) => ({
                  ...prev,
                  nickname: {
                    ...duplicateDefaultState.nickname,
                  },
                }))
              }
            },
            disabled: isSubmitting,
          })}
        />
        <Guideline
          open={guidelineOpen.nickname}
          guildeline={[
            {
              label: "- 영문대소문자 / 완전한 한글 조합(ex. 가)",
              valid: validator.validateNickname(field.nickname).format(),
            },
            {
              label: "- 2자 이상 8자 이하 입력(공백제외)",
              valid: validator.validateNickname(field.nickname).length(),
            },
            {
              label: "- 닉네임 중복 체크",
              valid: signupDuplicate.nickname.checkedDuplicate,
            },
          ]}
          className="mt-1"
        />
        <Spacing size={12} />
        {/* password field */}
        <label htmlFor="password">비밀번호</label>
        <PasswordInput
          data-field="password"
          id="password"
          fullWidth
          placeholder="********"
          autoComplete="off"
          error={!!errors.password}
          errorMessage={errors.password?.message}
          onAfterFocus={handleFocus}
          classNames={{
            wrapper: "aria-disabled:bg-colorsLightGray",
            input: "disabled:bg-transparent",
          }}
          {...register("password", {
            required: true,
            validate: (password) => {
              const { format, length } = validator.validatePassword(password)

              if (!validator.noSpace(password)) return false

              if (!format()) {
                return false
              }

              if (!length()) {
                return false
              }

              return true
            },
            onChange() {
              // 비밀번호 확인을 같이 validate하여 동기화
              trigger("passwordCheck")
            },
            onBlur: handleBlur,
            disabled: isSubmitting,
          })}
        />
        <Guideline
          open={guidelineOpen.password}
          guildeline={[
            {
              label: Guideline.PasswordLabel,
              value: field.password,
              valid: validator.validatePassword(field.password).format(),
            },
            {
              label: "- 공백제외",
              valid: validator.noSpace(field.password),
            },
            {
              label: "- 8자 이상 16자 이하 입력",
              valid: validator.validatePassword(field.password).length(),
            },
          ]}
          className="mt-1"
        />
        <Spacing size={12} />
        {/* password check field */}
        <label htmlFor="passwordCheck">비밀번호 확인</label>
        <PasswordInput
          data-field="passwordCheck"
          id="passwordCheck"
          fullWidth
          placeholder="********"
          error={!!errors.passwordCheck}
          errorMessage={errors.passwordCheck?.message}
          onAfterFocus={handleFocus}
          classNames={{
            wrapper: "aria-disabled:bg-colorsLightGray",
            input: "disabled:bg-transparent",
          }}
          {...register("passwordCheck", {
            required: true,
            validate: (passwordCheck) => {
              const password = getValues("password")

              if (password !== passwordCheck) return false

              return true
            },
            onBlur: handleBlur,
            disabled: isSubmitting,
          })}
        />
        <Guideline
          open={guidelineOpen.passwordCheck}
          guildeline={[
            {
              label: "- 입력한 비밀번호와 같음",
              valid: field.password === field.passwordCheck,
            },
          ]}
          className="mt-1"
        />
        <Spacing size={24} />
        <div>
          <Button
            type="submit"
            fullWidth
            buttonTheme="primary"
            disabled={disableCase || isSubmitting}
            className="p-2 text-lg disabled:bg-colorsGray disabled:hover:bg-colorsGray"
            onClick={() => {
              setGuidelineOpen((prev) => ({
                email: false,
                nickname: false,
                password: false,
                passwordCheck: false,
              }))
            }}
          >
            {isSubmitting ? "가입 진행 중" : "가입하기"}
          </Button>
        </div>
        {/* <Spacing size={12} /> */}
        {/* social signup */}
        {/* <LabelDivider label={"간편 회원가입"} />
        <div className="flex w-full justify-center items-center gap-2">
          <SocialButton social="github" action="signup" />
        </div> */}
      </form>
      <ProgressModalView />
    </div>
  )
}

export default Signup
