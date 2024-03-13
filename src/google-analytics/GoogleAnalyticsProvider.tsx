import { GoogleAnalytics } from "@next/third-parties/google"

function GoogleAnalyticsProvider() {
  if (process.env.NEXT_PUBLIC_GA_ACTIVE !== "enabled") return null

  return <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
}

export default GoogleAnalyticsProvider
