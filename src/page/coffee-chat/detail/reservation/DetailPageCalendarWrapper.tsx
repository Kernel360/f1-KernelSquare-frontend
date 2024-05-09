import { twMerge } from "tailwind-merge"

interface DetailPageCalendarWrapperProps {
  calendarComponent: React.ReactNode
  dataComponent: React.ReactNode
  classNames?: {
    dataComponent?: {
      container?: string
      wrapper?: string
    }
  }
}

function DetailPageCalendarWrapper({
  calendarComponent,
  dataComponent,
  classNames,
}: DetailPageCalendarWrapperProps) {
  return (
    <section className="flex flex-col sm:flex-row">
      <CalendarWrapper>{calendarComponent}</CalendarWrapper>
      <DataWrapper classNames={classNames?.dataComponent}>
        {dataComponent}
      </DataWrapper>
    </section>
  )
}

export default DetailPageCalendarWrapper

const CalendarWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full justify-center sm:shrink-0 sm:flex-1 sm:flex sm:justify-start">
      {children}
    </div>
  )
}

const DataWrapper = ({
  classNames,
  children,
}: {
  children: React.ReactNode
  classNames?: { container?: string; wrapper?: string }
}) => {
  const containerClassNames = twMerge([
    "w-full sm:flex-1 sm:flex sm:justify-end xl:justify-center",
    classNames?.container,
  ])

  const wrapperClassNames = twMerge([
    "w-full mx-auto sm:max-w-[350px] xl:max-w-[450px] sm:m-0",
    classNames?.wrapper,
  ])

  return (
    <div className={containerClassNames}>
      <div className={wrapperClassNames}>{children}</div>
    </div>
  )
}
