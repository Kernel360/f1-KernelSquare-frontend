import type { Metadata } from "next"
import "./globals.css"
import RecoilProvider from "@/recoil/RecoilProvider"
import Layout from "@/components/layout/Layout"
import Modal from "@/components/shared/Modal"
import ReactQueryProvider from "@/react-query/ReactQueryProvider"
import MSW from "@/msw/MSW"

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
            <Layout>{children}</Layout>
            <Modal />
          </ReactQueryProvider>
        </RecoilProvider>
      </body>
    </html>
  )
}
