import { CodingMeetingFormData } from "@/interfaces/form"
import TitleController from "../../../controls/TitleController"

interface TitleSectionProps {
  initialTitle?: CodingMeetingFormData["title"]
}

function TitleSection({ initialTitle }: TitleSectionProps) {
  return <TitleController initialTitle={initialTitle} />
}

export default TitleSection
