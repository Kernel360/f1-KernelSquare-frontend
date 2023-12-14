import { layoutMeta } from "@/constants/layoutMeta"
import Signup from "@/page/Signup"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: `${layoutMeta["signup"].title}`,
  description: `${layoutMeta["signup"].description}`,
}

export default function SignupPage() {
  return <Signup />
}
