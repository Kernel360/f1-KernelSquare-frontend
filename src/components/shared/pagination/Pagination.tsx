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
      containerClassName="flex justify-center gap-1"
      previousClassName="box-border border border-colorsGray p-1 rounded-md hover:bg-colorsLightGray"
      nextClassName="box-border border border-colorsGray p-1 rounded-md hover:bg-colorsLightGray"
      pageClassName="box-border border border-colorsGray min-w-[32px] bg-transparent transition-colors rounded-md hover:bg-colorsLightGray cursor-pointer"
      pageLinkClassName="w-full h-full flex justify-center items-center"
      activeClassName="!bg-primary border-primary text-white hover:bg-primary hover:border-primary"
      activeLinkClassName="w-full h-full flex justify-center items-center"
      breakClassName="min-w-[32px] flex justify-center items-center"
      breakLinkClassName="cursor-text"
      onClick={(e) => {
        if (e.isBreak) return false

        onClick && onClick(e)
      }}
      {...props}
    />
  )
}

export default Pagination
