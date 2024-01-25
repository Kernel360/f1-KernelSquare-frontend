import CoffeeChatPageLayout from "./_components/Layout"

interface CoffeeChatLayoutProps {
  children: React.ReactNode
}

export default function CoffeeChatLayout({ children }: CoffeeChatLayoutProps) {
  return <CoffeeChatPageLayout>{children}</CoffeeChatPageLayout>
}
