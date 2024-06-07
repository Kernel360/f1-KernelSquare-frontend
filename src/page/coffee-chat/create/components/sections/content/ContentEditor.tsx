"use client"

import { useCoffeeChatFormContext } from "@/page/coffee-chat/hooks/useCoffeeChatFormContext"
import { useController } from "react-hook-form"
import { chatContentRules } from "../../../controls/rules/chat-content-rules"
import CoffeeChatContentEditor from "@/components/shared/toast-ui-editor/editor/ContentEditor"

function ContentEditor() {
  const {
    control,
    editorRef,
    formState: { defaultValues },
  } = useCoffeeChatFormContext()
  const { field } = useController({
    control,
    name: "content",
    rules: chatContentRules,
  })

  return (
    <div tabIndex={0} ref={field.ref}>
      <CoffeeChatContentEditor
        ref={editorRef}
        initialValue={defaultValues?.content ?? ""}
        includeImageToolbarItem={false}
        placeholder="생성할 커피챗에 대해 설명해보세요."
        onChange={() => {
          field.onChange(editorRef?.current?.getInstance()?.getMarkdown() ?? "")
        }}
      />
    </div>
  )
}

export default ContentEditor
