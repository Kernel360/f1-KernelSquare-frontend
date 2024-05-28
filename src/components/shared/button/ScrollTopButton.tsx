"use client"

import { IoIosArrowUp } from "react-icons/io"
import { useEffect, useState } from "react"
import { debounce, throttle } from "lodash-es"
import buttonMessage from "@/constants/message/button"
import { twMerge } from "tailwind-merge"

interface ScrollTopButtonProps {
  wrapperClassName?: string
}

function ScrollTopButton({ wrapperClassName }: ScrollTopButtonProps) {
  const [show, setShow] = useState(false)

  const wrapperClassNames = twMerge([
    `fixed right-2 bottom-9 z-10 transition-opacity ease-in-out lg:right-20`,
    show ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
    wrapperClassName,
  ])

  const debounceHandleShow = debounce(() => {
    setShow(false)
  }, 3000)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    })
  }

  useEffect(() => {
    // 이전 변수를 활용하는 방법으로, 클로저 활용
    const handleScroll = (() => {
      let prevScrollY = 0

      return throttle((e: Event) => {
        const currentScrollY = window.scrollY

        if (currentScrollY === 0) {
          debounceHandleShow.cancel()

          setShow(false)

          prevScrollY = currentScrollY

          return
        }

        // 위로 스크롤 할 경우 버튼 노출
        // 아래로 스크롤 할 경우 버튼 숨김
        if (prevScrollY - currentScrollY > 0) {
          setShow(true)
        } else {
          setShow(false)
        }
        debounceHandleShow()

        prevScrollY = currentScrollY
      }, 400)
    })()

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, []) /* eslint-disable-line */

  return (
    <div className={wrapperClassNames}>
      <button
        className="shadow-[0_0_8px_0_rgba(0,0,0,.16)] flex flex-col justify-center items-center w-12 h-12 lg:w-16 lg:h-16 font-bold rounded-full outline-none box-border p-2 cursor-pointer bg-secondary"
        onClick={scrollToTop}
      >
        <IoIosArrowUp className="text-white text-xl shrink-0 -mt-1" />
        <span className="text-white text-sm">{buttonMessage.scrollToTop}</span>
      </button>
    </div>
  )
}

export default ScrollTopButton
