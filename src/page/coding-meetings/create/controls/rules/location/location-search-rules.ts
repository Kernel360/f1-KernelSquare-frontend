import { CodingMeetingLocationSearchFormData } from "@/interfaces/form"
import { RegisterOptions } from "react-hook-form"

type LocationSearchRules = Omit<
  RegisterOptions<CodingMeetingLocationSearchFormData, "keyword">,
  "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
>

export const locationSearchRules: LocationSearchRules = {
  required: true,
}
