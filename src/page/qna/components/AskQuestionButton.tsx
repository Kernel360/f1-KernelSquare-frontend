"use client"

import { Icons } from "@/components/icons/Icons"
import Button from "@/components/shared/button/Button"
import Link from "next/link"

interface AskQustionButtonProps {}

function AskQuestionButton(props: AskQustionButtonProps) {
  return (
    <Link href={"/question"}>
      <Button buttonTheme="secondary" className="gap-2.5">
        <Icons.PostQuestion className="text-xl" />
        질문하기
      </Button>
    </Link>
  )
}

export default AskQuestionButton
