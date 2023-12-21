"use client"

import { PropsWithChildren, useState } from "react"
import { twMerge } from "tailwind-merge"

type TabItem = {
  label: string
  content: React.ReactNode
  active?: boolean
}

interface TabProps {
  className?: string
  defaultTab?: string
  tabs: Array<TabItem>
  onTab?: (tabLabel: string) => void
}

interface TabItemProps extends PropsWithChildren {
  active?: boolean
  onClick?: () => void
}

function Tab({ className, tabs, defaultTab, onTab }: TabProps) {
  const [selectedTab, setTab] = useState(() => {
    if (defaultTab) {
      const target = tabs.find((tab) => tab.label === defaultTab)

      return target?.label ?? tabs[0].label
    }

    return tabs[0].label
  })

  const classNames = twMerge([
    "grid grid-rows-1 [grid-template-columns:repeat(auto-fit,minmax(0,auto))] border-b border-b-colorsGray bg-white",
    className,
  ])

  return (
    <ul className={classNames}>
      {tabs.map(({ label, content, active }) => {
        return (
          <li key={`tab-component-${label}`}>
            <TabItem
              active={active !== undefined ? active : selectedTab === label}
              onClick={() => {
                setTab(label)
                onTab && onTab(label)
              }}
            >
              {content}
            </TabItem>
          </li>
        )
      })}
    </ul>
  )
}

function TabItem({ children, active, onClick }: TabItemProps) {
  const classNames = twMerge([
    "text-colorsGray flex flex-col w-full",
    active && "text-black",
  ])

  const gutterClassNames = twMerge([
    "mt-4 w-full h-0.5 bg-transparent",
    active && "bg-black",
  ])

  return (
    <div className={classNames} onClick={onClick}>
      <div className="flex w-full items-center justify-center">{children}</div>
      <div className={gutterClassNames} />
    </div>
  )
}

export default Tab
