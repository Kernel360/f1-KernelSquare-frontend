"use client"

import { Icons } from "@/components/icons/Icons"
import Button from "@/components/shared/button/Button"
import { Input } from "@/components/shared/input/Input"
import HashTag from "@/components/shared/tag/HashTag"
import { CodingMeetingFormData, HashTagFormData } from "@/interfaces/form"
import {
  HashTagListRuleValidateType,
  HashTagRuleValidateType,
  hashTagRules,
} from "@/page/coffee-chat/create/controls/rules/hashtag-rules"
import { useId } from "react"
import {
  FieldError,
  FieldErrors,
  useController,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form"
import { toast } from "react-toastify"
import CodingMeetingSection from "../../CodingMeetingSection"
import Limitation from "@/constants/limitation"

interface HashTagsControllerProps {
  initialHashTags?: CodingMeetingFormData["hashtags"]
}

function HashTagsController({ initialHashTags }: HashTagsControllerProps) {
  const { control } = useFormContext<CodingMeetingFormData>()
  const { field } = useController({
    control,
    name: "hashtags",
    defaultValue: initialHashTags ?? [],
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: "hashtags",
  })

  const uniqueId = useId()

  return (
    <CodingMeetingSection>
      <CodingMeetingSection.Label htmlFor="hashTag">
        <span>해시태그</span>
        <span>&nbsp;&#40;&nbsp;</span>
        <span
          className={`${
            fields.length <= Limitation.hashtags_cnt
              ? "text-primary"
              : "text-danger"
          }`}
        >
          {fields.length}
        </span>
        <span>&nbsp;/&nbsp;</span>
        <span>{Limitation.hashtags_cnt}</span>
        <span>&nbsp;&#41;</span>
      </CodingMeetingSection.Label>
      <div>
        <HashTagField
          hashTagListValue={fields ?? []}
          onValidHashTag={(hashTag) => {
            append({ tag: hashTag })
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
          {fields.map(({ tag }, index) => (
            <div
              key={`${uniqueId}-${tag}`}
              className="inline-flex rounded-lg items-center bg-colorsLightGray pr-2"
            >
              <HashTag className="bg-transparent shadow-none">{tag}</HashTag>
              <div
                className="cursor-pointer transition-colors w-5 h-5 p-1 rounded-full border flex justify-center items-center bg-white hover:bg-secondary hover:text-white"
                onClick={() => remove(index)}
              >
                <Icons.Close />
              </div>
            </div>
          ))}
        </div>
      </div>
    </CodingMeetingSection>
  )
}

export default HashTagsController

const HashTagField = ({
  hashTagListValue,
  onValidHashTag,
  onInvalidHashTagList,
}: {
  hashTagListValue: CodingMeetingFormData["hashtags"]
  onValidHashTag: (hashTag: string) => void
  onInvalidHashTagList: (error: FieldError) => void
}) => {
  const { resetField, control } = useForm<HashTagFormData>({
    defaultValues: { hashTag: "" },
  })
  const { field } = useController({
    control,
    name: "hashTag",
    rules: hashTagRules({
      hashTagList: hashTagListValue.map(({ tag }) => tag),
    }),
  })

  const onSubmit = ({ hashTag }: HashTagFormData) => {
    resetField("hashTag")
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

    if (errors.hashTag?.type === HashTagRuleValidateType.WhiteSpace) {
      toast.error(errors.hashTag.message, {
        position: "top-center",
        toastId: "invalidHashTagWhiteSpace",
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
}
