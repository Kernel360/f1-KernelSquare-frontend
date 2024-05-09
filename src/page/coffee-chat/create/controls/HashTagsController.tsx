"use client"

import { CoffeeChatFormData, HashTagFormData } from "@/interfaces/form"
import {
  Control,
  Controller,
  FieldError,
  FieldErrors,
  useForm,
} from "react-hook-form"
import {
  HashTagListField,
  HashTagListRuleValidateType,
  HashTagRuleValidateType,
  hashTagRules,
} from "./rules/hashtag-rules"
import { Input } from "@/components/shared/input/Input"
import Button from "@/components/shared/button/Button"
import { useSetRecoilState } from "recoil"
import { HashTagList } from "@/recoil/atoms/coffee-chat/hashtags"
import { toast } from "react-toastify"
import HashTag from "@/components/shared/tag/HashTag"
import { Icons } from "@/components/icons/Icons"
import { useId } from "react"

interface HashTagsControllerProps {
  control: Control<CoffeeChatFormData, any>
}

function HashTagsController({ control }: HashTagsControllerProps) {
  const uniqueId = useId()

  const setHashTagList = useSetRecoilState(HashTagList)

  const handleDeleteHashTags = ({
    field,
    hashTag,
  }: {
    field: HashTagListField
    hashTag: string
  }) => {
    const hashTagList = field.value!.filter((_hashTag) => _hashTag !== hashTag)

    field.onChange(hashTagList)
    setHashTagList(hashTagList)
  }

  return (
    <Controller
      control={control}
      name="hashTags"
      render={({ field: hashTagListField, fieldState }) => {
        return (
          <div>
            <HashTagField
              hashTagListValue={hashTagListField.value ?? []}
              onValidHashTag={(hashTag) => {
                const hashTagList = hashTagListField.value
                  ? [...hashTagListField.value, hashTag]
                  : [hashTag]

                hashTagListField.onChange(hashTagList)
                setHashTagList(hashTagList)
              }}
              onInvalidHashTagList={(error) => {
                if (error.type === HashTagListRuleValidateType.Maximum) {
                  toast.error(error.message, {
                    position: "top-center",
                    toastId: "maxLengthHashTagList",
                  })

                  return
                }

                if (error.type === HashTagListRuleValidateType.Duplicate) {
                  toast.error(error.message, {
                    position: "top-center",
                    toastId: "duplicateHashTag",
                  })

                  return
                }
              }}
            />
            <div className="min-h-[30px] mt-5 flex flex-wrap gap-3">
              {hashTagListField.value?.map((hashTag) => (
                <div
                  key={`${uniqueId}-${hashTag}`}
                  className="inline-flex rounded-lg items-center bg-colorsLightGray pr-2"
                >
                  <HashTag className="bg-transparent shadow-none">
                    {hashTag}
                  </HashTag>
                  <div
                    className="cursor-pointer transition-colors w-5 h-5 p-1 rounded-full border flex justify-center items-center bg-white hover:bg-secondary hover:text-white"
                    onClick={() =>
                      handleDeleteHashTags({ field: hashTagListField, hashTag })
                    }
                  >
                    <Icons.Close />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      }}
    />
  )
}

export default HashTagsController

const HashTagField = ({
  hashTagListValue,
  onValidHashTag,
  onInvalidHashTagList,
}: {
  hashTagListValue: string[]
  onValidHashTag: (hashTag: string) => void
  onInvalidHashTagList: (error: FieldError) => void
}) => {
  const { resetField, control } = useForm<HashTagFormData>()

  const onSubmit = ({ hashTag }: HashTagFormData) => {
    resetField("hashTag", { defaultValue: "" })
    onValidHashTag(hashTag)
  }

  const onInvalid = (errors: FieldErrors<HashTagFormData>) => {
    // hashTagList (hashTagList 콘트롤러에서 처리)
    if (errors.hashTag?.type === HashTagListRuleValidateType.Maximum) {
      onInvalidHashTagList(errors.hashTag)
      return
    }
    if (errors.hashTag?.type === HashTagListRuleValidateType.Duplicate) {
      onInvalidHashTagList(errors.hashTag)
      return
    }

    // hashtag
    if (errors.hashTag?.type === "required") {
      toast.error(errors.hashTag.message, {
        position: "top-center",
        toastId: "emptyHashTag",
      })

      return
    }

    if (errors.hashTag?.type === HashTagRuleValidateType.InvalidFormat) {
      toast.error(errors.hashTag.message, {
        position: "top-center",
        toastId: "invalidHashTagFormat",
      })

      return
    }

    if (errors.hashTag?.type === "maxLength") {
      toast.error(errors.hashTag.message, {
        position: "top-center",
        toastId: "maxLengthHashTag",
      })

      return
    }
  }

  const controlHashTagData = control.handleSubmit(onSubmit, onInvalid)

  return (
    <Controller
      control={control}
      name="hashTag"
      defaultValue={""}
      rules={hashTagRules({ hashTagList: hashTagListValue })}
      render={({ field, fieldState }) => {
        return (
          <div className="flex gap-3">
            <Input
              ref={field.ref}
              id={field.name}
              spellCheck="false"
              autoComplete="off"
              wrapperClassName="max-w-[282px] w-[64%]"
              className="rounded-none border-r-0 border-l-0 border-t-0 text-sm"
              placeholder="해시태그를 추가해보세요"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
            />
            <div className="flex flex-col justify-center">
              <Button
                type="button"
                buttonTheme="primary"
                className="px-5 py-2 w-max shrink-0"
                onClick={controlHashTagData}
              >
                추가
              </Button>
            </div>
          </div>
        )
      }}
    />
  )
}
