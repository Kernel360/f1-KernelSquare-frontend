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

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: {
    template: "%s - 커널스퀘어",
    default: "커널스퀘어",
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
