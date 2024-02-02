import SelectableTagList from "@/components/shared/tag/SelectableTagList"
import CoffeeChatSection from "./CoffeeChatSection"
import { MAXIMUM_SELECT_TAG_LENGTH, techTagList } from "@/constants/editor"
import type { EditMode } from "@/page/askQuestion/components/AskQuestionPageControl"
import { CoffeeChatFormProps } from "../CreateCoffeeChatReservationPage.types"

const SkillsSection = ({ initialValues, post_id }: CoffeeChatFormProps) => {
  const editMode: EditMode = initialValues && post_id ? "update" : "create"

  return (
    <CoffeeChatSection>
      <div className="flex w-full align-top gap-1 max-w-full justify-center items-start flex-col md:flex-row md:justify-start md:items-center">
        <CoffeeChatSection.Label className="block w-max">
          기술 스택
        </CoffeeChatSection.Label>
        <SelectableTagList.SummarizedSelectedTagList
          uniqueKey={editMode}
          initialTagList={techTagList}
          {...(initialValues?.skills && {
            initialSelectedTagList: [...initialValues.skills],
          })}
        />
      </div>
      <SelectableTagList
        searchable
        uniqueKey={editMode}
        tagList={techTagList}
        {...(initialValues?.skills && {
          initialSelectedTagList: [...initialValues.skills],
        })}
        maximumLength={MAXIMUM_SELECT_TAG_LENGTH}
      />
    </CoffeeChatSection>
  )
}

export default SkillsSection
