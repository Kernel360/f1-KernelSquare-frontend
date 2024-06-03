import type { EditorProps } from "@toast-ui/react-editor"
import type { TechTag } from "@/interfaces/tech-tag"
import { SyntaxHighlightCodeLanguage } from "@/socket/client/code/CodeLanguageSelect"
import { QUESTION_ANSWER_LIMITS, USER_PROFILE_LIMITS } from "./limitation"

export const TOAST_UI_EDITOR_TOOLBAR_NAME = {
  HEADING: "heading",
  BOLD: "bold",
  ITALIC: "italic",
  STRIKE: "strike",
  HR: "hr",
  TABLE: "table",
  IMAGE: "image",
  LINK: "link",
  QUOTE: "quote",
  CODE: "code",
  CODE_BLOCK: "codeblock",
  UL: "ul",
  OL: "ol",
  INDENT: "indent",
  OUTDENT: "outdent",
  TASK: "task",
  SCORLL_SYNC: "scrollSync",
}

export const contentEditorToolbarItemsWithImage: EditorProps["toolbarItems"] = [
  [TOAST_UI_EDITOR_TOOLBAR_NAME.CODE, TOAST_UI_EDITOR_TOOLBAR_NAME.CODE_BLOCK],
  [
    TOAST_UI_EDITOR_TOOLBAR_NAME.IMAGE,
    TOAST_UI_EDITOR_TOOLBAR_NAME.LINK,
    TOAST_UI_EDITOR_TOOLBAR_NAME.QUOTE,
    TOAST_UI_EDITOR_TOOLBAR_NAME.UL,
    TOAST_UI_EDITOR_TOOLBAR_NAME.OL,
    TOAST_UI_EDITOR_TOOLBAR_NAME.TASK,
  ],
  [
    TOAST_UI_EDITOR_TOOLBAR_NAME.HEADING,
    TOAST_UI_EDITOR_TOOLBAR_NAME.BOLD,
    TOAST_UI_EDITOR_TOOLBAR_NAME.ITALIC,
    TOAST_UI_EDITOR_TOOLBAR_NAME.STRIKE,
    TOAST_UI_EDITOR_TOOLBAR_NAME.HR,
    TOAST_UI_EDITOR_TOOLBAR_NAME.TABLE,
  ],
]

export const contentEditorToolbarItemsWithoutImage: EditorProps["toolbarItems"] =
  [
    [
      TOAST_UI_EDITOR_TOOLBAR_NAME.CODE,
      TOAST_UI_EDITOR_TOOLBAR_NAME.CODE_BLOCK,
    ],
    [
      TOAST_UI_EDITOR_TOOLBAR_NAME.LINK,
      TOAST_UI_EDITOR_TOOLBAR_NAME.QUOTE,
      TOAST_UI_EDITOR_TOOLBAR_NAME.UL,
      TOAST_UI_EDITOR_TOOLBAR_NAME.OL,
      TOAST_UI_EDITOR_TOOLBAR_NAME.TASK,
    ],
    [
      TOAST_UI_EDITOR_TOOLBAR_NAME.HEADING,
      TOAST_UI_EDITOR_TOOLBAR_NAME.BOLD,
      TOAST_UI_EDITOR_TOOLBAR_NAME.ITALIC,
      TOAST_UI_EDITOR_TOOLBAR_NAME.STRIKE,
      TOAST_UI_EDITOR_TOOLBAR_NAME.HR,
      TOAST_UI_EDITOR_TOOLBAR_NAME.TABLE,
    ],
  ]

export const techTagList: Array<TechTag> = [
  "JavaScript",
  "Python",
  "JAVA",
  "Spring",
  "SpringBoot",
  "MySql",
  "TypeScript",
  "React",
  "Nextjs",
  "CI/CD",
  "c#",
  "php",
  "android",
  "html",
  "jquery",
  "c++",
  "css",
  "ios",
  "sql",
  "r",
  "reactjs",
  "node.js",
  "arrays",
  "c",
  "asp.net",
  "json",
  "python-3.x",
  "ruby-on-rails",
  ".net",
  "sql-server",
  "swift",
  "django",
  "angular",
  "objective-c",
  "pandas",
  "excel",
  "angularjs",
  "regex",
  "ruby",
]

export const SYNTAX_HIGHLIGHT_LANGUAGES: Array<SyntaxHighlightCodeLanguage> = [
  "bash",
  "c",
  "cpp",
  "dart",
  "docker",
  "go",
  "graphql",
  "java",
  "javascript",
  "json",
  "jsonp",
  "jsx",
  "kotlin",
  "markdown",
  "markup",
  "nginx",
  "php",
  "python",
  "r",
  "rust",
  "sass",
  "scss",
  "sql",
  "swift",
  "toml",
  "tsx",
  "typescript",
  "yaml",
]

// answer editor placeholder
export const ANSWER_EDITOR_PLACEHOLDER = `답변을 작성해주세요 (${
  QUESTION_ANSWER_LIMITS.content.minLength
}자 이상 ${new Intl.NumberFormat("ko-KR").format(
  QUESTION_ANSWER_LIMITS.content.maxLength,
)}자 이하)`

// introduction editor placeholder
export const INTRODUCTION_EDITOR_PLACEHOLDER = `자기소개를 작성해주세요 (${
  USER_PROFILE_LIMITS.introduction.minLength
}자 이상 ${new Intl.NumberFormat("ko-KR").format(
  USER_PROFILE_LIMITS.introduction.maxLength,
)}자 이하)`
