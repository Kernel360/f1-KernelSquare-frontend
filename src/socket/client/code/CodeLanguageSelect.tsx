"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select"
import { SYNTAX_HIGHLIGHT_LANGUAGES } from "@/constants/editor"

export type SyntaxHighlightCodeLanguage =
  | "bash"
  | "c"
  | "cpp"
  | "dart"
  | "docker"
  | "go"
  | "graphql"
  | "java"
  | "javascript"
  | "json"
  | "jsonp"
  | "jsx"
  | "kotlin"
  | "markdown"
  | "markup"
  | "nginx"
  | "php"
  | "python"
  | "r"
  | "rust"
  | "sass"
  | "scss"
  | "sql"
  | "swift"
  | "toml"
  | "tsx"
  | "typescript"
  | "yaml"

interface CodeLanguageSelectProps {
  defaultLanguage?: SyntaxHighlightCodeLanguage
  onLanguageChange?: (language: SyntaxHighlightCodeLanguage) => void
}

function CodeLanguageSelect({
  defaultLanguage = "javascript",
  onLanguageChange,
}: CodeLanguageSelectProps) {
  return (
    <Select defaultValue={defaultLanguage} onValueChange={onLanguageChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent
        style={{
          maxHeight: "calc(40px * 5)",
        }}
      >
        {SYNTAX_HIGHLIGHT_LANGUAGES.map((language) => {
          return (
            <SelectItem key={language} value={language}>
              {language}
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}

export default CodeLanguageSelect
