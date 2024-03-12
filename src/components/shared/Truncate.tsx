"use client"

import { Dispatch, SetStateAction, useState } from "react"
import TruncateMarkup, { TruncateProps } from "react-truncate-markup"
import Button from "./button/Button"

interface TruncateComponentProps extends Omit<TruncateProps, "ellipsis"> {
  ellipsis?: (props: {
    isTruncated: boolean
    showMore: () => void
  }) => React.ReactNode
  less?: (props: {
    isTruncated: boolean
    showLess: () => void
  }) => React.ReactNode
}

function Truncate({
  lines = 2,
  ellipsis,
  less,
  children,
  ...props
}: TruncateComponentProps) {
  const [shouldTruncate, setShouldTruncate] = useState(true)

  const Elipsis = ellipsis ? (
    ellipsis({
      isTruncated: shouldTruncate,
      showMore: () => {
        setShouldTruncate(false)
      },
    })
  ) : (
    <DefaultEllipsis setShouldTruncate={setShouldTruncate} />
  )

  const Less = less ? (
    less({
      isTruncated: shouldTruncate,
      showLess: () => {
        setShouldTruncate(true)
      },
    })
  ) : (
    <DefaultLess setShouldTruncate={setShouldTruncate} />
  )

  if (shouldTruncate)
    return (
      <TruncateMarkup lines={lines} ellipsis={Elipsis} {...props}>
        {children}
      </TruncateMarkup>
    )

  return (
    <>
      {children}
      {Less}
    </>
  )
}

export default Truncate

function DefaultEllipsis({
  setShouldTruncate,
}: {
  setShouldTruncate: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <Button
      className="ml-1 text-xs text-[#828282] font-medium"
      onClick={() => setShouldTruncate(false)}
    >
      ... 더보기
    </Button>
  )
}

function DefaultLess({
  setShouldTruncate,
}: {
  setShouldTruncate: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <Button
      className="text-xs text-[#828282] font-medium"
      onClick={() => setShouldTruncate(true)}
    >
      접기
    </Button>
  )
}
