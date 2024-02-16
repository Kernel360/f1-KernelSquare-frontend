import Paginate, { ReactPaginateProps } from "react-paginate"
import { twMerge } from "tailwind-merge"
import { HiOutlineDotsHorizontal } from "react-icons/hi"

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
  > {}

export function Pagination({ onClick, ...props }: PaginationProps) {
  const pageButtonWrapperClassNames = (
    type: "page" | "active" | "next" | "prev" | "break",
  ) =>
    twMerge([
      "text-secondary font-medium rounded-md transition-colors border bg-transparent shrink-0",
      type === "break"
        ? "cursor-default"
        : "cursor-pointer hover:bg-colorsLightGray",
      (type === "prev" || type === "next") && "w-max",
      type === "break" || type === "prev" || type === "next"
        ? "border-none"
        : "border-colorsGray",
      type === "active" &&
        "!bg-primary border-primary text-white hover:text-white hover:bg-primary hover:border-primary",
    ])

  const pageButtonClassNames = (type: "page" | "next" | "prev" | "break") =>
    twMerge([
      "w-7 h-7 text-sm editor:text-base editor:w-8 editor:h-8 flex justify-center items-center box-border p-0 editor:p-1",
      (type === "prev" || type === "next") &&
        "w-max editor:w-max px-2 py-0 text-sm",
      type === "break" && "cursor-default",
    ])

  return (
    <Paginate
      pageRangeDisplayed={2}
      marginPagesDisplayed={1}
      containerClassName="flex flex-wrap w-fit justify-start gap-1 mx-auto"
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
  )
}

export default Pagination
