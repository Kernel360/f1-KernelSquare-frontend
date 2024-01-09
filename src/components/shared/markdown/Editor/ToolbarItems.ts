import { EditorProps } from "@toast-ui/react-editor"

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

export const contentEditorToolbarItems: EditorProps["toolbarItems"] = [
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
