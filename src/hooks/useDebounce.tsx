import { useEffect, useState } from "react"

const useDebounce = (value: string, delay: number) => {
  const [valueWithDebounce, setValueWithDebounce] = useState(value)

  useEffect(() => {
    const debounceHandler = setTimeout(() => {
      setValueWithDebounce(value)
    }, delay)

    return () => clearTimeout(debounceHandler)
  }, [value])

  return valueWithDebounce
}

export default useDebounce
