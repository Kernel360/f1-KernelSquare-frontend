"use client"

import { ErrorBoundary } from "react-error-boundary"
import KakakoMapError from "./KakaoMapError"

interface MapContainerProps {
  children: React.ReactNode
}

function MapContainer({ children }: MapContainerProps) {
  return (
    <ErrorBoundary FallbackComponent={KakakoMapError}>{children}</ErrorBoundary>
  )
}

export default MapContainer
