"use client"

import { useEffect } from "react"
import AOS from "aos"
import "aos/dist/aos.css"

const AOSProvider = () => {
  useEffect(() => {
    AOS.init({
      duration: 1500,
    })
  }, [])
  return null
}

export default AOSProvider
