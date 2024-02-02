import { useRef, useState } from "react"
import Button from "@/components/shared/button/Button"
import Tab from "@/components/shared/tab/Tab"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import nightOwl from "react-syntax-highlighter/dist/esm/styles/prism/night-owl"
import CodeLanguageSelect, {
  SyntaxHighlightCodeLanguage,
} from "./CodeLanguageSelect"
import Spacing from "@/components/shared/Spacing"
import useModal from "@/hooks/useModal"

type TabLabel = "write" | "preview"

export interface InsertCodePayload {
  message: string
}

export const insertCodeEventName = "kernel-square-insert-code"

function CodeEditor() {
  return (
    <>
      <div className="[&_pre::-webkit-scrollbar]:!w-0 [&_pre::-webkit-scrollbar]:!h-0">
        <CodeEditor.Tab />
      </div>
    </>
  )
}

export default CodeEditor

CodeEditor.TabContent = function CodeEditorTabContent({
  tab,
  language,
  onCodeChange,
}: {
  tab: TabLabel
  language: SyntaxHighlightCodeLanguage
  onCodeChange: (code: string) => void
}) {
  const [code, setCode] = useState("")

  if (tab === "write") {
    return (
      <textarea
        className="w-full h-full p-4 box-border resize-none outline-none border border-colorsGray [tab-size:4]"
        defaultValue={code}
        onKeyDown={(e) => {
          // insert Tab space
          if (e.key === "Tab") {
            e.preventDefault()

            e.currentTarget.setRangeText(
              "    ",
              e.currentTarget.selectionStart,
              e.currentTarget.selectionEnd,
              "end",
            )
          }
        }}
        onChange={(e) => {
          setCode(e.currentTarget.value)

          onCodeChange(e.currentTarget.value)
        }}
      />
    )
  }

  return (
    <SyntaxHighlighter
      customStyle={{
        height: "100%",
      }}
      language={language}
      style={nightOwl}
      wrapLongLines={true}
    >
      {code}
    </SyntaxHighlighter>
  )
}

CodeEditor.Tab = function CodeEditorTab() {
  const [tab, setTab] = useState<TabLabel>("write")
  const [language, setLanguage] =
    useState<SyntaxHighlightCodeLanguage>("javascript")

  const codeValueRef = useRef("")

  const { closeModal } = useModal()

  const insertCode = () => {
    window.dispatchEvent(
      new CustomEvent(insertCodeEventName, {
        detail: {
          message: `+${language}+${codeValueRef.current}`,
        } as InsertCodePayload,
      }),
    )

    closeModal()
  }

  return (
    <div className="relative max-w-full w-[320px] sm:w-[480px] h-[360px] max-h-full">
      <div className="sticky top-0 bg-white">
        <Tab
          classNames={{
            wrapper: "w-full",
            tab: "flex-1",
          }}
          tabs={[
            {
              label: "write",
              content: <Button className="w-full">작성하기</Button>,
            },
            {
              label: "preview",
              content: <Button className="w-full">미리보기</Button>,
            },
          ]}
          onTab={(label) => setTab(label as TabLabel)}
        />
        <Spacing size={16} />
        <div className="flex justify-between items-center">
          <CodeLanguageSelect
            onLanguageChange={(language) => {
              setLanguage(language)
            }}
          />
          <Button buttonTheme="primary" onClick={insertCode}>
            코드 작성
          </Button>
        </div>
      </div>
      <div className="mt-2 pb-1 h-[calc(100%-64px)]">
        <CodeEditor.TabContent
          tab={tab}
          language={language}
          onCodeChange={(code) => {
            codeValueRef.current = code
          }}
        />
      </div>
    </div>
  )
}
