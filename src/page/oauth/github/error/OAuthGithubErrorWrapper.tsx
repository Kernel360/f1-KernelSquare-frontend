import GithubIcon from "@/components/icons/social/Github"
import Inner from "@/components/shared/Inner"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface OAuthGithubErrorWrapperProps {
  children: React.ReactNode
}

function OAuthGithubErrorWrapper({ children }: OAuthGithubErrorWrapperProps) {
  return (
    <Inner>
      <div className="box-border p-4 w-full min-h-screen flex flex-col justify-center items-center">
        <section className="w-full max-w-[320px] flex flex-col justify-center items-center p-4 bg-white border border-colorsGray rounded-lg">
          <section className="flex items-center gap-4 mb-4">
            <div className="bg-socialGithub p-3 rounded-md">
              <GithubIcon />
            </div>
            <h3 className="font-bold text-secondary text-xl">
              Github Login Fail
            </h3>
          </section>
          <section className="w-full">{children}</section>
          <Link href={"/qna?page=0"} className="mt-4">
            <Button>개발자 Q&A로 이동</Button>
          </Link>
        </section>
      </div>
    </Inner>
  )
}

export default OAuthGithubErrorWrapper
