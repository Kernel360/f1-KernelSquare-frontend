"use client"

import { CodingMeetingFormData } from "@/interfaces/form"
import { usePathname } from "next/navigation"
import { FormProvider, useForm } from "react-hook-form"

function CodingMeetingFormProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const methods = useForm<CodingMeetingFormData>()

  if (
    pathname === "/coding-meetings/create" ||
    pathname.startsWith("/coding-meetings/post/")
  ) {
    return <FormProvider {...methods}>{children}</FormProvider>
  }

  return children
}

export default CodingMeetingFormProvider
