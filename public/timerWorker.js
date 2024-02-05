importScripts(
  "https://cdnjs.cloudflare.com/ajax/libs/dayjs/1.11.10/dayjs.min.js",
)

let timer = {
  startDate: null,
  targetDate: null,
  intervalId: null,
}

let timePayload = {
  diff: {
    hour: 0,
    minute: 0,
    second: 0,
  },
}

self.addEventListener("message", (e) => {
  const { cmd, startDate, seconds } = e.data

  if (cmd === "init") {
    timer.startDate = dayjs(startDate)
    timer.targetDate = !seconds
      ? timer.startDate
      : dayjs(startDate).add(seconds, "seconds")

    return
  }

  if (cmd === "start") {
    if (!timer.startDate || !timer.targetDate) return

    timer.intervalId = setInterval(() => {
      const now = dayjs()

      const diffSeconds = timer.targetDate.diff(now, "second")

      const hour = Math.floor(Math.abs(diffSeconds) / 3600)
      const minute = Math.floor((Math.abs(diffSeconds) - hour * 3600) / 60)
      const second = Math.abs(diffSeconds) - hour * 3600 - minute * 60

      timePayload.diff = {
        hour,
        minute,
        second,
      }

      self.postMessage({
        type: "diff",
        isAfter: diffSeconds <= 0,
        ...timePayload.diff,
      })
    }, 1000)

    return
  }

  if (cmd === "stop") {
    const intervalId = timer.intervalId

    if (intervalId) {
      clearInterval(intervalId)
    }

    return
  }
})
