import { CodingMeetingFormData } from "@/interfaces/form"
import MemberCountController from "../../../controls/MemberCountController"
import CodingMeetingSection from "../../CodingMeetingSection"

interface MemberCountSectionProps {
  initialMemberCount?: CodingMeetingFormData["member_upper_limit"]
}

function MemberCountSection({ initialMemberCount }: MemberCountSectionProps) {
  return (
    <CodingMeetingSection>
      <CodingMeetingSection.Label htmlFor="meeting-member-count">
        모집인원
      </CodingMeetingSection.Label>
      <MemberCountController initialMemberCount={initialMemberCount} />
    </CodingMeetingSection>
  )
}

export default MemberCountSection
