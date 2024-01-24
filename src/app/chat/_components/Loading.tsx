"use client"

import ListLoading from "@/components/shared/animation/ListLoading"

function CoffeeChatPageLoading({ page }: { page: "main" | "detail" }) {
  const label = {
    main: `커피챗 리스트`,
    detail: `커피챗 상세 페이지`,
  }

  return (
    <div className="flex flex-col w-full justify-center items-center box-border p-1">
      <h3 className="w-full mt-6 flex justify-center items-center">
        <span className="inline-flex align-top justify-center items-center w-max break-all text-sm box-border px-2 py-0.5 rounded-lg border border-colorsGray bg-colorsLightGray">
          {label[page]}
        </span>
        &nbsp;를 로딩하고 있어요
      </h3>
      <div className="h-full">
        <ListLoading
          style={{
            width: "calc(100% - 80px)",
            maxWidth: "400px",
            margin: "0 auto",
            opacity: "0.5",
          }}
        />
      </div>
    </div>
  )
}

export default CoffeeChatPageLoading
