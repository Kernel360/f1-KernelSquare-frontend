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
        <main className="min-h-screen flex-1">{children}</main>
      </Inner>
      <Footer />
    </>
  )
}

export default Layout
