"use client"

import Prism from "prismjs"
import "prismjs/themes/prism-tomorrow.css"
import "@toast-ui/editor/dist/toastui-editor.css"
import { Viewer } from "@toast-ui/react-editor"
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css"
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js"
import copy from "copy-to-clipboard"
import { handleViewerLink } from "@/util/editor"
import { twJoin } from "tailwind-merge"
import { ReactPortal, useLayoutEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { toast } from "react-toastify"
import { TbSourceCode } from "react-icons/tb"
import { FcCheckmark } from "react-icons/fc"

export interface ViewerProps {
  domain: "question" | "chat" | "profile"
  content: string
}

function ContentViewer({ domain, content }: ViewerProps) {
  const viewerWrapperRef = useRef<HTMLDivElement>(null)

  const [codeSyntaxToolbars, setCodeSyntaxToolbars] = useState<
    ReactPortal[] | null
  >(null)

  const viewerClassName = twJoin([
    "[&_.toastui-editor-contents]:text-base",
    "[&_.toastui-editor-contents_h1]:leading-snug",
    "[&_.toastui-editor-contents_h2]:leading-snug",
    "[&_.toastui-editor-contents_h3]:leading-snug",
    "[&_.toastui-editor-contents_h4]:leading-snug",
    "[&_.toastui-editor-contents_h5]:leading-snug",
    "[&_.toastui-editor-contents_h6]:leading-snug",
    "[&_.toastui-editor-contents_pre]:rounded-sm",
    "[&_.toastui-editor-contents_pre]:!bg-[#002451]",
    "[&_.toastui-editor-contents_pre]:relative",
    "[&_.toastui-editor-contents_pre_code]:text-[#ccc]",
    "[&_.toastui-editor-contents_pre_code_.token.operator]:bg-transparent",
  ])

  useLayoutEffect(() => {
    const preElements = viewerWrapperRef.current?.querySelectorAll("pre")

    if (preElements?.length) {
      setCodeSyntaxToolbars(
        Array.from(preElements).map((preElement, index) => {
          let lang = "plainText"

          const langClassName = Array.from(preElement.classList.values()).find(
            (className) => className.startsWith("lang-"),
          )
          if (langClassName) {
            const targetLang = langClassName.replace(/^lang-/, "")
            if (targetLang) lang = targetLang
          }

          return createPortal(
            <CodeSyntaxToolbar
              lang={lang}
              preElement={preElement}
              index={index}
            />,
            preElement,
            `codeSyntaxToolbar-${index}`,
          )
        }),
      )
    }
  }, [])

  return (
    <div>
      <div
        ref={viewerWrapperRef}
        className={viewerClassName}
        onClick={handleViewerLink(domain)}
      >
        <Viewer
          initialValue={content || " "}
          /*@ts-ignore*/
          plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
        />
        {codeSyntaxToolbars?.length ? <>{codeSyntaxToolbars}</> : null}
      </div>
    </div>
  )
}

export default ContentViewer

const CodeSyntaxToolbar = ({
  lang,
  preElement,
  index,
}: {
  lang: string
  preElement: HTMLPreElement
  index: number
}) => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur()

    const copyText = Array.from(preElement.children)
      .slice(0, -1)
      .map((child) => child.textContent ?? "")
      .join("")

    const copySuccess = copy(copyText)

    if (copySuccess) {
      toast.success("클립보드 복사 성공", {
        position: "bottom-center",
        toastId: `codeSyntax-${index}-copy`,
      })

      setCopied((prev) => true)
      setTimeout(() => {
        setCopied((prev) => false)
      }, 4000)
    }
  }

  return (
    <div className="absolute top-0 right-0 inline-flex align-top py-0.5 px-2 gap-x-1">
      <div className="bg-[hsl(210,21%,29%)] text-colorsGray text-xs font-bold rounded-md px-2">
        {lang}
      </div>
      {copied ? (
        <button className="align-top rounded-md px-1 cursor-default">
          <FcCheckmark />
        </button>
      ) : (
        <button
          className="group relative rounded-md px-1 align-top pointerhover:hover:bg-[hsl(210,21%,29%)] transition-colors"
          onClick={copyToClipboard}
        >
          <TbSourceCode className="text-colorsGray group-hover:text-white transition-colors" />
          <div className="hidden group-focus:block group-hover:block absolute left-1/2 top-0 -translate-x-1/2 -translate-y-[calc(100%+4px)] rounded-sm font-bold bg-secondary text-white text-xs px-1">
            코드 복사
          </div>
        </button>
      )}
    </div>
  )
}
