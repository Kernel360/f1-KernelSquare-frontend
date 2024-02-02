import { usePathname } from "next/navigation"
import { useEffect, useRef, useState, cloneElement } from "react"
import { twMerge } from "tailwind-merge"

const chatNoticeList = [
  <div key={0} className="line-clamp-1">
    커피챗 채팅 페이지에 오신것을 환영합니다
  </div>,
  <div key={1} className="line-clamp-1">
    최대 30분까지 멘토와 채팅이 가능합니다
  </div>,
  <div key={2} className="line-clamp-1">
    지속가능한 성장을 위한 커피챗!
  </div>,
]

const noticeList = [
  <div key={0} className="line-clamp-1">
    커피챗 메인 페이지에 오신것을 환영합니다
  </div>,
  <div key={1} className="line-clamp-1">
    지속가능한 성장을 위한 커피챗!
  </div>,
]

function CoffeeChatWelcome() {
  const pathname = usePathname()

  const targetNoticeList = (() => {
    if (pathname.startsWith("/chat/room/")) return chatNoticeList

    return noticeList
  })()
  const length = targetNoticeList.length

  const wrapperRef = useRef<HTMLDivElement>(null)

  const [top, setTop] = useState(0)
  const [index, setIndex] = useState(0)
  const [shouldMoveFirst, setShouldMoveFirst] = useState(false)

  const classNames = twMerge([
    `relative flex flex-col gap-2`,
    !shouldMoveFirst && `transition-[top] duration-700`,
  ])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((current) => {
        const next = current + 1

        return next > length ? 1 : next
      })
    }, 4000)

    return () => {
      clearInterval(intervalId)
    }
  }, [pathname]) /* eslint-disable-line */

  useEffect(() => {
    if (!wrapperRef?.current) return

    if (index === length) {
      setTimeout(() => {
        setShouldMoveFirst(true)
        setTop(0)
      }, 1400)
    }

    const target = wrapperRef.current.children[index] as HTMLElement

    if (index === 1) {
      setShouldMoveFirst(false)
    }
    setTop(index === 0 ? 0 : target.offsetTop * -1)
  }, [index]) /* eslint-disable-line */

  return (
    <div ref={wrapperRef} className={classNames} style={{ top: `${top}px` }}>
      {targetNoticeList}
      {cloneElement(targetNoticeList[0], {
        key: length,
      })}
    </div>
  )
}

export default CoffeeChatWelcome
