import Inner from "../shared/Inner"
import Footer from "./footer/Footer"
import Header from "./header/Header"
import Navigation from "./navigation/Navigation"

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <Inner className="flex w-full flex-col sm:flex-row">
        <Navigation />
        <div className="min-h-screen flex-1">{children}</div>
      </Inner>
      <Footer />
    </>
  )
}

export default Layout
