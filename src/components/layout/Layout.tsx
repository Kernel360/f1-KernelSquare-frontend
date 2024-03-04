import ScrollToTop from "../shared/scroll-to-top/ScrollToTop"
import LayoutInner from "./LayoutInner"
import Footer from "./footer/Footer"
import Header from "./header/Header"
import Navigation from "./navigation/Navigation"

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <LayoutInner>
        <Navigation />
        <main className="min-h-screen flex-1">{children}</main>
      </LayoutInner>
      <ScrollToTop />
      <Footer />
    </>
  )
}

export default Layout
