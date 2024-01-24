import { useEffect, useRef, useState, cloneElement } from "react"
import { twMerge } from "tailwind-merge"

const noticeList = [
  <div key={1} className="line-clamp-1">
    커피챗 메인 페이지에 오신것을 환영합니다
  </div>,
  <div key={2} className="line-clamp-1">
    지속가능한 성장을 위한 커피챗!
  </div>,
]

function CoffeeChatWelcome() {
  const wrapperRef = useRef<HTMLDivElement>(null)

  const length = noticeList.length

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
  }, []) /* eslint-disable-line */

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
      {noticeList}
      {cloneElement(noticeList[0], {
        key: length,
      })}
    </div>
  )
}

export default CoffeeChatWelcome
