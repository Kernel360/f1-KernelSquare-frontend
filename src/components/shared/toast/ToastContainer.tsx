"use client"

import {
  ToastContainer as ReactToastifyContainer,
  ToastContainerProps,
} from "react-toastify"

function ToastContainer({
  hideProgressBar = true,
  pauseOnFocusLoss = false,
  pauseOnHover = false,
  closeButton = false,
  closeOnClick = false,
  className,
  toastClassName,
  bodyClassName,
  draggable = false,
  autoClose = 2000,
  ...props
}: Partial<Omit<ToastContainerProps, "icon">>) {
  return (
    <ReactToastifyContainer
      hideProgressBar={hideProgressBar}
      pauseOnFocusLoss={pauseOnFocusLoss}
      pauseOnHover={pauseOnHover}
      closeButton={closeButton}
      closeOnClick={closeOnClick}
      className={className ?? "toastify:!px-2.5"}
      toastClassName={
        toastClassName ??
        "!px-1 !py-0 text-sm !min-h-[34px] !mb-4 !rounded-[30px] !justify-center !bg-[rgba(69,69,69,0.8)] ![animation-duration:200ms]"
      }
      bodyClassName={bodyClassName ?? "!flex-[0_1_fit-content] text-white"}
      icon={(props) => null}
      draggable={draggable}
      // 닫히는 시간 기본 2초로 설정
      autoClose={autoClose}
      {...props}
    />
  )
}

export default ToastContainer
