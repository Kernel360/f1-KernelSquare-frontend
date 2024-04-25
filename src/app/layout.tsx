import type { Metadata } from "next"
import dynamicComponent from "next/dynamic"
import "./globals.css"
import "rc-dropdown/assets/index.css"
import "react-loading-skeleton/dist/skeleton.css"
import "react-toastify/dist/ReactToastify.css"
import RecoilProvider from "@/recoil/RecoilProvider"
import Layout from "@/components/layout/Layout"
import Modal from "@/components/shared/Modal"
import ReactQueryProvider from "@/react-query/ReactQueryProvider"
import MSW from "@/msw/MSW"
import "@toast-ui/editor/dist/toastui-editor.css"
import ToastContainer from "@/components/shared/toast/ToastContainer"
import ScrollTop from "@/components/shared/ScrollTop"
import ToastDismissEventListener from "@/components/layout/ToastDismissListener"
import GoogleAnalyticsProvider from "@/google-analytics/GoogleAnalyticsProvider"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  metadataBase: new URL("https://kernelsquare.live"),
  title: {
    template: "%s - 커널스퀘어",
    default: "커널스퀘어",
  },
  verification:
    process.env.NEXT_PUBLIC_GA_ACTIVE === "enabled"
      ? {
          google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
          other: {
            "naver-site-verification":
              process.env.NEXT_PUBLIC_NAVER_VERIFICATION!,
          },
        }
      : undefined,
  openGraph: {
    images: {
      url: "/og.png",
      alt: "Kernel Square",
    },
  },
  twitter: {
    images: {
      url: "/og.png",
      alt: "Kernel Square",
    },
  },
}

const PopupEventListener = dynamicComponent(
  () => import("@/components/layout/PopupEventListener"),
  { ssr: false },
)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>
        <GoogleAnalyticsProvider />
        <RecoilProvider>
          <ReactQueryProvider>
            <MSW />
            <PopupEventListener />
            <ScrollTop />
            <Layout>{children}</Layout>
            <Modal />
            <ToastContainer limit={1} />
            <ToastDismissEventListener />
          </ReactQueryProvider>
        </RecoilProvider>
      </body>
    </html>
  )
}
