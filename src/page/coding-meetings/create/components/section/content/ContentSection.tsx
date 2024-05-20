import { CodingMeetingFormData } from "@/interfaces/form"
import ContentController from "../../../controls/ContentController"
import CodingMeetingSection from "../../CodingMeetingSection"

interface ContentSectionProps {
  initialContent?: CodingMeetingFormData["content"]
}

function ContentSection({ initialContent }: ContentSectionProps) {
  return (
    <CodingMeetingSection>
      <CodingMeetingSection.Label htmlFor="meeting-content">
        모집글
      </CodingMeetingSection.Label>
      <ContentController initialContent={initialContent} />
    </CodingMeetingSection>
  )
}

export default ContentSection
