"use client"

import SocialButton from "@/components/SocialButton"
import Spacing from "@/components/shared/Spacing"
import Button from "@/components/shared/button/Button"
import LabelDivider from "@/components/shared/divider/LabelDivider"
import Guideline from "@/components/shared/input/Guideline"
import { Input } from "@/components/shared/input/Input"
import PasswordField from "@/components/shared/input/PasswordField"
import { SignupFormData } from "@/interfaces/form"
import { signup } from "@/service/auth"
import { Validator } from "@/util/validate"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"

interface GuidelineOpen {
  nickname: boolean
  password: boolean
}

// [TODO] 이미지 업로드

function Signup() {
  const { replace } = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<SignupFormData>()

  const passwordField = watch("password")
  const nicknameField = watch("nickname")

  const [guidelineOpen, setGuidelineOpen] = useState<GuidelineOpen>({
    nickname: false,
    password: false,
  })

  const validator = new Validator()

  const onSubmit = async ({
    email,
    nickname,
    password,
    image_url,
  }: SignupFormData) => {
    await signup({ email, password, nickname, image_url })

    replace("/")
  }

  return (
    <div className="flex w-full h-screen justify-center items-center box-border p-4">
      <form className="border p-4 rounded-lg" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="text-3xl font-bold text-center">회원가입</h3>
        <Spacing size={14} />
        <div>
          <label htmlFor="email">이메일</label>
          <Input
            id="email"
            fullWidth
            autoComplete="off"
            spellCheck="false"
            placeholder="example@email.com"
            error={!!errors.email}
            errorMessage={errors.email?.message}
            {...register("email", {
              required: "이메일을 입력해주세요",
              validate: (email) => {
                const { format, length } = validator.validateEmail(email)

                if (!format()) {
                  return "이메일 형식으로 입력해주세요"
                }
                if (!length()) {
                  return "이메일은 최대 40자까지 입력 가능합니다"
                }

                return true
              },
            })}
          />
        </div>
        <Spacing size={12} />
        <div
          onFocus={() =>
            setGuidelineOpen((prev) => ({ ...prev, nickname: true }))
          }
          onBlur={() =>
            setGuidelineOpen((prev) => ({ ...prev, nickname: false }))
          }
        >
          <label htmlFor="nickname">닉네임</label>
          <Input
            id="nickname"
            fullWidth
            autoComplete="off"
            spellCheck="false"
            placeholder="zl존"
            error={!!errors.nickname}
            errorMessage={errors.nickname?.message}
            {...register("nickname", {
              required: "닉네임을 입력해주세요",
              validate: (nickname) => {
                const { format, length } = validator.validateNickname(nickname)

                if (!format()) {
                  return "닉네임 형식이 아닙니다"
                }

                if (!length()) {
                  return "닉네임은 최소 2자 최대 8자 이하 입력 가능합니다"
                }

                return true
              },
            })}
          />
        </div>
        <Guideline
          open={guidelineOpen.nickname}
          guildeline={[
            {
              label: "- 영문대소문자 / 완전한 한글 조합(ex. 가)",
              valid: validator.validateNickname(nicknameField).format(),
            },
            {
              label: "- 2자 이상 8자 이하 입력(공백제외)",
              valid: validator.validateNickname(nicknameField).length(),
            },
          ]}
          className="mt-1"
        />
        <Spacing size={12} />
        <div
          onFocus={() => {
            setGuidelineOpen((prev) => ({ ...prev, password: true }))
          }}
          onBlur={() => {
            setGuidelineOpen((prev) => ({ ...prev, password: false }))
          }}
        >
          <label htmlFor="password">비밀번호</label>
          <PasswordField
            id="password"
            fullWidth
            placeholder="********"
            error={!!errors.password}
            errorMessage={errors.password?.message}
            {...register("password", {
              required: "비밀번호를 입력해주세요",
              validate: (password) => {
                const { format, length } = validator.validatePassword(password)

                if (!format()) {
                  return "영문대소문자/숫자/특수문자 1개 이상"
                }

                if (!length()) {
                  return "비밀번호는 최소 8자 최대 16자 이하 입력 가능합니다"
                }

                return true
              },
            })}
          />
        </div>
        <Guideline
          open={guidelineOpen.password}
          guildeline={[
            {
              label: "- 영문대소문자/숫자/특수문자 1자이상 포함",
              valid: validator.validatePassword(passwordField).format(),
            },
            {
              label: "- 8자 이상 16자 이하 입력(공백제외)",
              valid: validator.validatePassword(passwordField).length(),
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
            disabled={!isValid}
            className="p-2 text-lg disabled:bg-colorsGray disabled:hover:bg-colorsGray"
          >
            가입하기
          </Button>
        </div>
        <Spacing size={12} />
        {/* social signup */}
        <LabelDivider label={"간편 회원가입"} />
        <div className="flex w-full justify-center items-center gap-2">
          <SocialButton social="github" action="signup" />
        </div>
      </form>
    </div>
  )
}

export default Signup
