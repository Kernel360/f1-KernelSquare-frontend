import { CodingMeetingFormData } from "@/interfaces/form"
import { RegisterOptions } from "react-hook-form"

export const locationRules: Omit<
  RegisterOptions<CodingMeetingFormData, "location">,
  "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
> = {
  required: "모임 위치를 설정해주세요",
}
