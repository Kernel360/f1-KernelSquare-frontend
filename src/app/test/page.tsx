import { Metadata } from "next"
import dynamic from "next/dynamic"

export const metadata: Metadata = {
  title: "테스트",
  description: "test",
}

const Test = dynamic(() => import("./_components/Test"), { ssr: false })

export default function TestPage() {
  return <Test />
}
