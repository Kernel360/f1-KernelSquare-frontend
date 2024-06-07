"use client"

import { HashTagFormData } from "@/interfaces/form"
import { FieldError, FieldErrors } from "react-hook-form"
import {
  HashTagListRuleValidateType,
  HashTagRuleValidateType,
} from "./rules/hashtag-rules"
import { Input } from "@/components/shared/input/Input"
import Button from "@/components/shared/button/Button"
import { toast } from "react-toastify"
import HashTag from "@/components/shared/tag/HashTag"
import { Icons } from "@/components/icons/Icons"
import { useId } from "react"
import { useCoffeeChatFormContext } from "../../hooks/useCoffeeChatFormContext"

function HashTagsController() {
  const { hashTagFieldArray } = useCoffeeChatFormContext()

  const uniqueId = useId()

  const handleDeleteHashTags = ({ index }: { index: number }) => {
    hashTagFieldArray.remove(index)
  }

  return (
    <div>
      <HashTagField
        onValidHashTag={(hashTag) => {
          hashTagFieldArray.append({ content: hashTag })
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
        {hashTagFieldArray.fields?.map((hashTag, index) => (
          <div
            key={`${uniqueId}-${hashTag.content}`}
            className="inline-flex rounded-lg items-center bg-colorsLightGray pr-2"
          >
            <HashTag className="bg-transparent shadow-none">
              {hashTag.content}
            </HashTag>
            <div
              className="cursor-pointer transition-colors w-5 h-5 p-1 rounded-full border flex justify-center items-center bg-white hover:bg-secondary hover:text-white"
              onClick={() => handleDeleteHashTags({ index })}
            >
              <Icons.Close />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HashTagsController

const HashTagField = ({
  onValidHashTag,
  onInvalidHashTagList,
}: {
  onValidHashTag: (hashTag: string) => void
  onInvalidHashTagList: (error: FieldError) => void
}) => {
  const { hashTag: hashTagForm } = useCoffeeChatFormContext()

  const onSubmit = ({ hashTag }: HashTagFormData) => {
    hashTagForm.resetField("hashTag")

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

  const controlHashTagData = hashTagForm.handleSubmit(onSubmit, onInvalid)

  return (
    <div className="flex gap-3">
      <Input
        ref={hashTagForm.field.ref}
        id={hashTagForm.field.name}
        spellCheck="false"
        autoComplete="off"
        wrapperClassName="max-w-[282px] w-[64%]"
        className="rounded-none border-r-0 border-l-0 border-t-0 text-sm"
        placeholder="해시태그를 추가해보세요"
        value={hashTagForm.field.value}
        onChange={hashTagForm.field.onChange}
        onBlur={hashTagForm.field.onBlur}
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
}
