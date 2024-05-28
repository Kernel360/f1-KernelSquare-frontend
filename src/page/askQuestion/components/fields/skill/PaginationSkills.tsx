"use client"

import Button from "@/components/shared/button/Button"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import { twMerge } from "tailwind-merge"
import SelectableSkills from "./SelectableSkills"
import { useSearchSkillTag } from "./useSearchSkillTag"
import { Skill } from "@/interfaces/form/question-form"
import ContentLoading from "@/components/shared/animation/ContentLoading"
import Spacing from "@/components/shared/Spacing"
import { useQuestionFormContext } from "@/page/askQuestion/hooks/useQuestionFormContext"
import { QUESTION_LIMITS } from "@/constants/limitation"
import { toast } from "react-toastify"
import SelectableTag from "@/components/shared/tag/SelectableTag"
import { useController } from "react-hook-form"

function PaginationSkills() {
  const {
    searchSkillFormMethods: { control },
  } = useQuestionFormContext()
  const { field } = useController({ control, name: "keyword" })

  const { skills, status, error, prevPage, nextPage, pagination } =
    useSearchSkillTag({ keyword: field.value })

  const buttonClassNames = ({
    direction,
    isHidden,
  }: {
    direction: "prev" | "next"
    isHidden: boolean
  }) =>
    twMerge([
      "p-0 disabled:text-colorsGray",
      direction === "prev" && "-translate-x-2",
      direction === "next" && "translate-x-2",
      isHidden && "hidden",
    ])

  return (
    <>
      <div className="flex w-full items-center">
        {/* prev button */}
        <Button
          type="button"
          className={buttonClassNames({
            direction: "prev",
            isHidden: pagination.page === 0,
          })}
          disabled={status === "pending"}
          onClick={prevPage}
        >
          <IoIosArrowBack className="text-2xl" />
        </Button>
        {/* page */}
        <CurrentPageSelectableSkills
          loading={status === "pending"}
          skills={skills}
        />
        {/* next button */}
        <Button
          type="button"
          className={buttonClassNames({
            direction: "next",
            isHidden:
              pagination?.totalPage === 0 ||
              pagination.page === (pagination.totalPage ?? 0) - 1,
          })}
          disabled={status === "pending"}
          onClick={nextPage}
        >
          <IoIosArrowForward className="text-2xl" />
        </Button>
      </div>
      <Spacing size={16} />
      {/* page count */}
      <PageCount
        loading={status === "pending"}
        page={pagination.page}
        totalPage={pagination.totalPage ?? 0}
      />
    </>
  )
}

export default PaginationSkills

const CurrentPageSelectableSkills = ({
  loading,
  skills,
}: {
  loading: boolean
  skills: Skill[]
}) => {
  const {
    skillFieldArray,
    searchSkillFormMethods: { control },
  } = useQuestionFormContext()
  const { field } = useController({ control, name: "keyword" })

  if (loading)
    return (
      <div className="flex-1 h-7">
        <ul className="flex w-full flex-wrap gap-x-2 gap-y-2">
          {Array.from({ length: 10 }).map((_, index) => {
            return (
              <li key={`selectable-skill-skeleton-${index}`}>
                <SelectableTag.Loading />
              </li>
            )
          })}
        </ul>
      </div>
    )

  if (!skills.length) {
    return (
      <div className="flex-1 h-7">
        <div className="flex flex-wrap w-full h-full justify-center items-center gap-x-1 gap-y-2">
          <div className="inline-flex align-top items-center text-danger font-bold">
            <span>&#39;</span>
            <span className="max-w-[128px] whitespace-nowrap text-ellipsis overflow-hidden">
              {field.value}
            </span>
            <span>&#39;</span>
          </div>
          <span className="text-colorsGray font-bold">
            검색어 와 일치하는 결과가 없습니다
          </span>
        </div>
      </div>
    )
  }

  return (
    <SelectableSkills
      className="flex-1"
      skills={skills}
      highlightKeyword={{
        keyword: field.value,
      }}
      isSelected={(skill) =>
        !!skillFieldArray.fields.find(
          (skillField) => skillField.skill === skill.value,
        )
      }
      onSelect={({ willSelected, skill }) => {
        const targetSkillFieldIndex = skillFieldArray.fields.findIndex(
          (skillField) => skillField.skill === skill.value,
        )

        if (willSelected) {
          if (
            skillFieldArray.fields.length >= QUESTION_LIMITS.skill.maxLength
          ) {
            toast.error(
              `기술 태그는 최대 ${QUESTION_LIMITS.skill.maxLength}개 선택 가능합니다`,
              {
                position: "top-center",
                toastId: "question-skill-max-length",
              },
            )

            return false
          }

          skillFieldArray.append({ skill: skill.value })

          return true
        }

        if (targetSkillFieldIndex > -1) {
          skillFieldArray.remove(targetSkillFieldIndex)

          return true
        }

        return false
      }}
    />
  )
}

const PageCount = ({
  loading,
  page,
  totalPage,
}: {
  loading: boolean
  page: number
  totalPage: number
}) => {
  if (loading)
    return (
      <div className="w-full h-5 flex justify-end items-center overflow-hidden">
        <ContentLoading style={{ width: "80px", objectFit: "cover" }} />
      </div>
    )

  if (!totalPage) {
    return <div className="w-full h-5 flex justify-end items-center"></div>
  }

  return (
    <div className="w-full flex h-5 justify-end items-center">
      <div className="w-20 flex justify-center items-center">
        <span className="text-colorsDarkGray font-bold text-sm">
          {page + 1}
        </span>
        <span className="text-secondary text-xs">&nbsp;/&nbsp;</span>
        <span className="text-primary font-bold text-sm">{totalPage}</span>
      </div>
    </div>
  )
}
