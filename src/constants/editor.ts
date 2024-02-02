import type { EditorProps } from "@toast-ui/react-editor"
import type { TechTag } from "@/interfaces/tech-tag"
import { SyntaxHighlightCodeLanguage } from "@/socket/client/code/CodeLanguageSelect"

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
  "JAVA",
  "Spring",
  "SpringBoot",
  "Python",
  "MySql",
  "JavaScript",
  "TypeScript",
  "React",
  "Nextjs",
  "CI/CD",
]

export const MAXIMUM_SELECT_TAG_LENGTH = 5

export const USER_LOCAL_STORAGE_KEY = "user"

export const DELETE_IMAGE_LOCAL_STORAGE_KEY = "delete_list"

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
