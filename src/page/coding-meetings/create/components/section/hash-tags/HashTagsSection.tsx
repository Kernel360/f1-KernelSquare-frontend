"use client"

import { CodingMeetingFormData } from "@/interfaces/form"
import HashTagsController from "./HashTagsController"

interface HashTagSectionProps {
  initialHashTags?: CodingMeetingFormData["hashtags"]
}

const HashTagsSection = ({ initialHashTags }: HashTagSectionProps) => {
  return <HashTagsController initialHashTags={initialHashTags} />
}

export default HashTagsSection
