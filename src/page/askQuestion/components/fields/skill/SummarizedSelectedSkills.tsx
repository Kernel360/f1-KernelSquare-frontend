"use client"

import Tag from "@/components/shared/tag/Tag"
import { useQuestionFormContext } from "@/page/askQuestion/hooks/useQuestionFormContext"
import { useQueryClient } from "@tanstack/react-query"
import { useId, useLayoutEffect, useState } from "react"
import { MdClose } from "react-icons/md"
import { twMerge } from "tailwind-merge"

function SummarizedSelectedSkills() {
  const queryClient = useQueryClient()

  const idSeperator = useId()

  const {
    skillFieldArray,
    formState: { isLoading },
  } = useQuestionFormContext()

  const [isSearchingSkills, setIsSearchingSkills] = useState(false)

  useLayoutEffect(() => {
    // react query 의 useIsFetching 으로 대체 가능
    // queryObserver 로도 대체 가능(컴포넌트에 현재 검색API 관련 쿼리 키를 잘 공유할 수 있을 경우)
    const unsubscribe = queryClient.getQueryCache().subscribe(({ query }) => {
      const {
        options,
        state: { status },
      } = query

      if (
        Array.isArray(options.queryKey) &&
        options.queryKey.join(",").startsWith("techs,search")
      ) {
        setTimeout(() => {
          setIsSearchingSkills(status === "pending")
        }, 0)
      }
    })

    return () => {
      unsubscribe()
    }
  }, []) /* eslint-disable-line */

  if (isLoading) {
    return (
      <SelctedSkillSection>
        <SkillTagWithCloseButton loading />
      </SelctedSkillSection>
    )
  }

  if (!skillFieldArray.fields.length) {
    return (
      <SelctedSkillSection>
        <span className="block h-[26px]">선택된 기술 태그가 없습니다.</span>
      </SelctedSkillSection>
    )
  }

  return (
    <SelctedSkillSection>
      <ul className="flex flex-wrap w-full items-center gap-x-2 gap-y-1">
        {skillFieldArray.fields.map(({ skill }, index) => {
          return (
            <li key={`selected-skill${idSeperator}${skill}`}>
              <SkillTagWithCloseButton
                skill={skill}
                onClose={() => skillFieldArray.remove(index)}
                disabled={isSearchingSkills}
              />
            </li>
          )
        })}
      </ul>
    </SelctedSkillSection>
  )
}

export default SummarizedSelectedSkills

const SelctedSkillSection = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <div className="text-xs text-colorsDarkGray font-medium">
        선택된 기술 태그
      </div>
      <div className="p-1 bg-info">{children}</div>
    </section>
  )
}

const SkillTagWithCloseButton = ({
  skill,
  onClose,
  loading = false,
  disabled,
}: {
  skill?: React.ReactNode
  onClose?: () => void
  loading?: boolean
  disabled?: boolean
}) => {
  const tagContentClassNames = twMerge([
    "inline-flex align-top gap-x-2 justify-between items-center shadow-none group-disabled:bg-green-300",
    !loading && "bg-primary",
  ])

  const closeButtonClassNames = twMerge([
    "shrink-0 p-1 text-lg text-secondary !rounded-full",
    !disabled &&
      !loading &&
      "pointerhover:hover:bg-secondary pointerhover:hover:text-white pointerhover:hover:cursor-pointer",
    loading ? "skeleton" : "bg-white group-disabled:opacity-80",
  ])

  return (
    <Tag
      wrapperClassName="inline-flex align-top leading-none group"
      className={tagContentClassNames}
      disabled={disabled}
    >
      <span className="leading-none text-white">
        {loading ? (
          <span className="!bg-clip-text text-transparent inline-flex items-center align-top h-5 skeleton text-base">
            태그
          </span>
        ) : (
          skill
        )}
      </span>
      <MdClose
        className={closeButtonClassNames}
        onClick={loading || disabled ? undefined : onClose}
      />
    </Tag>
  )
}
