import Paginate, { ReactPaginateProps } from "react-paginate"

interface PaginationProps
  extends Omit<
    ReactPaginateProps,
    | "containerClassName"
    | "previousClassName"
    | "nextClassName"
    | "pageClassName"
    | "pageLinkClassName"
    | "activeLinkClassName"
    | "breakClassName"
    | "breakLinkClassName"
  > {}

export function Pagination({ onClick, ...props }: PaginationProps) {
  return (
    <Paginate
      containerClassName="flex w-full justify-center gap-1"
      previousClassName="box-border border border-colorsGray p-1 rounded-md hover:bg-colorsLightGray w-max min-w-[32px] shrink-0"
      nextClassName="box-border border border-colorsGray p-1 rounded-md hover:bg-colorsLightGray w-max min-w-[32px] shrink-0"
      pageClassName="box-border border border-colorsGray bg-transparent transition-colors rounded-md hover:bg-colorsLightGray cursor-pointer w-max"
      pageLinkClassName="min-w-[32px] h-full flex justify-center items-center shrink-0"
      activeClassName="!bg-primary border-primary text-white hover:bg-primary hover:border-primary w-max"
      activeLinkClassName="min-w-[32px] h-full flex justify-center items-center shrink-0"
      breakClassName="min-w-[32px] flex justify-center items-center shrink-0"
      breakLinkClassName="cursor-text shrink-0"
      onClick={(e) => {
        if (e.isBreak) return false

        onClick && onClick(e)
      }}
      {...props}
    />
  )
}

export default Pagination
