interface DetailPageCalendarWrapperProps {
  calendarComponent: React.ReactNode
  dataComponent: React.ReactNode
}

function DetailPageCalendarWrapper({
  calendarComponent,
  dataComponent,
}: DetailPageCalendarWrapperProps) {
  return (
    <section className="flex flex-col sm:flex-row">
      <CalendarWrapper>{calendarComponent}</CalendarWrapper>
      <DataWrapper>{dataComponent}</DataWrapper>
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

const DataWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full sm:flex-1 sm:flex sm:justify-end xl:justify-center">
      <div className="w-full mx-auto sm:max-w-[350px] xl:max-w-[450px] sm:m-0">
        {children}
      </div>
    </div>
  )
}
