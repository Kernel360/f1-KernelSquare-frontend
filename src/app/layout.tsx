import type { Metadata } from "next"
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

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: {
    template: "%s - 커널스퀘어",
    default: "커널스퀘어",
  },
}

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
            <ScrollTop />
            <Layout>{children}</Layout>
            <Modal />
            <ToastContainer />
          </ReactQueryProvider>
        </RecoilProvider>
      </body>
    </html>
  )
}
