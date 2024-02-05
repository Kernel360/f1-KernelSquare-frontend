"use client"

import { useCallback, useEffect, useRef, useState } from "react"

interface DiffTimePayload {
  hour: number
  minute: number
  second: number
  isAfter: boolean
}

interface UseStopwatchOption {
  startDate: string
  seconds: number
  callback?: (diffTime: DiffTimePayload) => void
  stopAfterTargetTime?: boolean
}

export function useStopwatch({
  startDate,
  seconds,
  callback,
  stopAfterTargetTime = true,
}: UseStopwatchOption) {
  const timerWorkerRef = useRef<Worker | null>(null)

  const [diffTime, setDiffTime] = useState<DiffTimePayload>({
    hour: 0,
    minute: 0,
    second: 0,
    isAfter: false,
  })

  const start = useCallback(() => {
    timerWorkerRef.current?.postMessage({ cmd: "start" })
  }, [])

  const stop = useCallback(() => {
    timerWorkerRef.current?.postMessage({ cmd: "stop" })
  }, [])

  useEffect(() => {
    if (!timerWorkerRef.current) {
      timerWorkerRef.current = new Worker("/timerWorker.js")
    }

    if (timerWorkerRef.current) {
      timerWorkerRef.current.onmessage = (ev) => {
        const { hour, minute, second, isAfter } = ev.data as DiffTimePayload

        callback && callback({ hour, minute, second, isAfter })

        if (isAfter && stopAfterTargetTime) {
          stop()

          setDiffTime((prev) => ({
            ...prev,
            hour: 0,
            minute: 0,
            second: 0,
            isAfter: true,
          }))

          return
        }

        setDiffTime((prev) => ({
          ...prev,
          hour,
          minute,
          second,
          isAfter,
        }))
      }
    }

    timerWorkerRef.current?.postMessage({
      cmd: "init",
      startDate,
      seconds,
    })

    return () => {
      const worker = timerWorkerRef.current

      worker?.terminate()
      timerWorkerRef.current = null
    }
  }, []) /* eslint-disable-line */

  return {
    diffTime,
    start,
    stop,
  }
}
