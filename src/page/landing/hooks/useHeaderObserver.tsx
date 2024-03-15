import landingTabAtom from "@/recoil/atoms/landingTab"
import { RefObject, useEffect, useMemo } from "react"
import { useSetRecoilState } from "recoil"

type ObserverProps = {
  keyword: string
  ref:
    | RefObject<HTMLDivElement>
    | RefObject<HTMLImageElement>
    | RefObject<HTMLVideoElement>
  threshold?: number
}

const useHeaderObserver = ({ ref, keyword, threshold }: ObserverProps) => {
  const setLandingTab = useSetRecoilState(landingTabAtom)

  const options = useMemo(() => ({ threshold }), [threshold])

  useEffect(() => {
    let observer: IntersectionObserver
    if (ref.current) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setLandingTab(keyword)
        })
      }, options)
      observer.observe(ref.current)
    }
    return () => {
      observer.disconnect()
    }
  }, [keyword, options, ref, setLandingTab])
}

export default useHeaderObserver
