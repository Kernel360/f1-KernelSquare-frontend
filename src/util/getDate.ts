import dayjs from "dayjs"

interface dateProps {
  date: string
}

const getDate = ({ date }: dateProps) => dayjs(date).format("YYYY년 MM월 DD일")

const getDeadline = ({ date }: dateProps) =>
  dayjs(date).add(7, "day").format("YYYY년 MM월 DD일")

const getNow = () => {
  let now = dayjs()
  return now.format()
}

export { getDate, getDeadline, getNow }
