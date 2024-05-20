import CodingMeetingSection from "../../CodingMeetingSection"
import LocationController from "../../../controls/LocationController"
import { CodingMeetingFormData } from "@/interfaces/form"

interface LocationSectionProps {
  initialLocation?: CodingMeetingFormData["location"]
}

function LocationSection({ initialLocation }: LocationSectionProps) {
  return (
    <CodingMeetingSection>
      <CodingMeetingSection.Label
        htmlFor="meeting-location"
        verticalAlign="center"
      >
        위치
      </CodingMeetingSection.Label>
      <LocationController initialLocation={initialLocation} />
    </CodingMeetingSection>
  )
}

export default LocationSection
