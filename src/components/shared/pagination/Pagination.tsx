"use client"

import Paginate, { ReactPaginateProps } from "react-paginate"
import { twMerge } from "tailwind-merge"
import { HiOutlineDotsHorizontal } from "react-icons/hi"
import Button from "../button/Button"
import {
  RiArrowLeftDoubleFill,
  RiArrowLeftSLine,
  RiArrowRightDoubleFill,
  RiArrowRightSLine,
} from "react-icons/ri"
import { createPortal } from "react-dom"
import { useSearchParams } from "next/navigation"
import { useLayoutEffect, useState } from "react"

interface PaginationProps
  extends Omit<
    ReactPaginateProps,
    | "containerClassName"
    | "previousClassName"
    | "previousLinkClassName"
    | "nextClassName"
    | "nextLinkClassName"
    | "pageClassName"
    | "pageLinkClassName"
    | "activeClassName"
    | "activeLinkClassName"
    | "breakClassName"
    | "breakLinkClassName"
    | "breakLabel"
    | "previousLabel"
    | "nextLabel"
  > {
  onSkip?: (args: { type: "prevSkip" | "nextSkip"; pageCount: number }) => void
}

export function Pagination({ onClick, onSkip, ...props }: PaginationProps) {
  const pageButtonWrapperClassNames = (
    type: "page" | "active" | "next" | "prev" | "break",
  ) =>
    twMerge([
      "text-secondary font-medium rounded-md transition-colors border border-colorsGray bg-transparent shrink-0",
      type === "break"
        ? "cursor-default"
        : "cursor-pointer hover:bg-colorsLightGray",
      type === "active" &&
        "!bg-primary border-primary text-white hover:text-white hover:bg-primary hover:border-primary",
    ])

  const pageButtonClassNames = (type: "page" | "next" | "prev" | "break") =>
    twMerge([
      "w-7 h-7 text-sm editor:text-base editor:w-8 editor:h-8 flex justify-center items-center box-border p-0 editor:p-1",
      type === "break" && "cursor-default",
    ])

  return (
    <>
      <Paginate
        previousLabel={<RiArrowLeftSLine className="shrink-0 text-[#828282]" />}
        nextLabel={<RiArrowRightSLine className="shrink-0 text-[#828282]" />}
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        containerClassName="flex flex-wrap gap-1 w-fit mx-auto justify-start"
        previousClassName={pageButtonWrapperClassNames("prev")}
        previousLinkClassName={pageButtonClassNames("prev")}
        nextClassName={pageButtonWrapperClassNames("next")}
        nextLinkClassName={pageButtonClassNames("next")}
        pageClassName={pageButtonWrapperClassNames("page")}
        pageLinkClassName={pageButtonClassNames("page")}
        activeClassName={pageButtonWrapperClassNames("active")}
        activeLinkClassName={pageButtonClassNames("page")}
        breakClassName={pageButtonWrapperClassNames("break")}
        breakLinkClassName={pageButtonClassNames("break")}
        breakLabel={<HiOutlineDotsHorizontal className="text-colorsDarkGray" />}
        onClick={(e) => {
          if (e.isBreak) return false

          onClick && onClick(e)
        }}
        {...props}
      />
      {onSkip && (
        <SkipButtonGroup pageCount={props.pageCount} onSkip={onSkip} />
      )}
    </>
  )
}

export default Pagination

function SkipButtonGroup({
  pageCount,
  onSkip,
}: Pick<PaginationProps, "pageCount" | "onSkip">) {
  const [container, setContainer] = useState<HTMLUListElement | null>(
    document.querySelector(
      'ul[aria-label="Pagination"]',
    ) as HTMLUListElement | null,
  )

  const searchParams = useSearchParams()
  const page = searchParams.get("page") ?? "0"
  const pageNumber = Number(page)

  useLayoutEffect(() => {
    setContainer(
      document.querySelector(
        'ul[aria-label="Pagination"]',
      ) as HTMLUListElement | null,
    )
  }, [])

  const SkipButton = ({
    type,
    pageCount,
  }: {
    type: "prevSkip" | "nextSkip"
    pageCount: number
  }) => {
    const handleSkip = (e: React.MouseEvent<HTMLDivElement>) => {
      onSkip && onSkip({ type, pageCount })
    }

    if (type === "prevSkip" && (pageCount < 10 || pageNumber - 10 < 0)) {
      return null
    }
    if (
      type === "nextSkip" &&
      (pageCount < 10 || pageCount - 1 - pageNumber < 10)
    ) {
      return null
    }

    return (
      <div
        className={`text-secondary font-medium rounded-md transition-colors border bg-transparent shrink-0 border-colorsGray hover:bg-colorsLightGray ${
          type === "prevSkip" ? "order-[-1]" : "order-1"
        }`}
        onClick={handleSkip}
      >
        <Button className="w-7 h-7 text-sm editor:text-base editor:w-8 editor:h-8 flex justify-center items-center box-border p-0 editor:p-1">
          {type === "prevSkip" ? (
            <RiArrowLeftDoubleFill className={`text-[#828282]`} />
          ) : (
            <RiArrowRightDoubleFill className={`text-[#828282]`} />
          )}
        </Button>
      </div>
    )
  }

  return container
    ? createPortal(
        <>
          <SkipButton type="prevSkip" pageCount={pageCount} />
          <SkipButton type="nextSkip" pageCount={pageCount} />
        </>,
        container,
      )
    : null
}
