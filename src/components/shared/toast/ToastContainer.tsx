"use client"

import {
  ToastContainer as ReactToastifyContainer,
  ToastContainerProps,
} from "react-toastify"

function ToastContainer(props: Partial<Omit<ToastContainerProps, "icon">>) {
  return (
    <ReactToastifyContainer
      hideProgressBar
      pauseOnFocusLoss={false}
      pauseOnHover={false}
      closeButton={false}
      closeOnClick={false}
      className={"toastify:!px-2.5"}
      toastClassName={
        "!px-1 !py-0 text-sm !min-h-[34px] !mb-4 !rounded-[30px] !justify-center !bg-[rgba(69,69,69,0.8)]"
      }
      bodyClassName={"!flex-[0_1_fit-content] text-white"}
      icon={(props) => null}
      // 닫히는 시간 기본 2초로 설정
      autoClose={2000}
      {...props}
    />
  )
}

export default ToastContainer
