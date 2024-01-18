"use client"

import { useState } from "react"
import { twMerge } from "tailwind-merge"

type TabItem = {
  label: string
  content: React.ReactNode
  active?: boolean
}

interface TabProps {
  defaultTab?: string
  tabs: Array<TabItem>
  onTab?: (tabLabel: string) => void
  classNames?: {
    wrapper?: string
    tab?: string
    gutter?: string
  }
  activeClassNames?: {
    tab?: string
    gutter?: string
  }
}

function Tab({
  tabs,
  defaultTab,
  onTab,
  classNames,
  activeClassNames,
}: TabProps) {
  const [selectedTab, setTab] = useState(() => {
    if (defaultTab) {
      const target = tabs.find((tab) => tab.label === defaultTab)

      return target?.label ?? tabs[0].label
    }

    return tabs[0].label
  })

  const wrapperClassNames = twMerge([
    "w-full flex border-b border-b-colorsGray bg-white overflow-x-auto justify-between",
    classNames?.wrapper,
  ])

  const listItemClassNames = ({ active }: { active: boolean }) =>
    twMerge([
      "relative h-full cursor-pointer box-border w-max transition-colors duration-150",
      classNames?.tab,
      active ? activeClassNames?.tab ?? "text-black" : "text-colorsGray",
    ])

  const handleScrollIntoView = (e: React.MouseEvent<HTMLUListElement>) => {
    /*
      scrollIntoView 함수 호출시 sticky top일 경우 
      상하 스크롤도 같이 움직일 수 있어서
      스크롤 생길 경우
      타겟 주변(좌우)으로 스크롤이 이동하는 핸들러 함수를 구현
    */

    const target = e.target as HTMLElement
    const listItem = target.closest("li")

    if (listItem) {
      e.currentTarget.scroll({
        left:
          listItem.offsetLeft -
          e.currentTarget.offsetLeft -
          Math.min(listItem.clientWidth / 2, 40),
        behavior: "smooth",
      })
    }
  }

  return (
    <ul className={wrapperClassNames} onClick={handleScrollIntoView}>
      {tabs.map(({ label, content, active }) => {
        return (
          <li
            key={`tab-component-${label}`}
            className={listItemClassNames({
              active: active ?? selectedTab === label,
            })}
            onClick={() => {
              setTab(label)

              onTab && onTab(label)
            }}
          >
            {content}
            <Gutter
              className={classNames?.gutter}
              activeClassName={activeClassNames?.gutter}
              active={active ?? selectedTab === label}
            />
          </li>
        )
      })}
    </ul>
  )
}

function Gutter({
  className,
  activeClassName,
  active,
}: {
  className?: string
  activeClassName?: string
  active?: boolean
}) {
  const classNames = twMerge([
    "absolute left-0 bottom-0 w-full h-0.5 bg-transparent transition-colors duration-150",
    className,
    active && (activeClassName ?? "bg-black"),
  ])

  return <div className={classNames} />
}

export default Tab
