"use client"

import Funnel from "@/components/shared/funnel/Funnel"
import IntroStep from "./IntroStep"

function DeleteMemberModal() {
  return (
    <Funnel steps={["intro", "reason"]}>
      <Funnel.Step stepName="intro">{(props) => IntroStep(props)}</Funnel.Step>
      <Funnel.Step stepName="reason">{(props) => <div>hello</div>}</Funnel.Step>
    </Funnel>
  )
}

export default DeleteMemberModal
