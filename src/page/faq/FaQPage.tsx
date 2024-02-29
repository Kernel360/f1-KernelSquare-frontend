import GithubIcon from "@/components/icons/social/Github"
import GoogleIcon from "@/components/icons/social/Google"
import Link from "next/link"

function FaQ() {
  return (
    <div className="w-full min-h-[400px] flex justify-center items-center">
      <div className="w-fit flex flex-col md:flex-row gap-2">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            target="_blank"
            href="https://github.com/Kernel360/f1-KernelSquare-backend/issues"
            className="w-44 h-[38px] flex gap-2 box-border px-2 py-1 justify-center items-center rounded-lg shadow-sm bg-socialGithub border border-colorsGray"
          >
            <div className="shrink-0">
              <GithubIcon />
            </div>
            <span className="text-white font-bold h-fit">
              Github 버그 리포트
            </span>
          </Link>
          <Link
            target="_blank"
            href="https://docs.google.com/forms/d/e/1FAIpQLSdUPyAFdRQJ9KmzKOr4QW92rCZxk022NC57jyov0GNrkjyuRw/viewform"
            className="w-44 h-[38px] flex gap-2 box-border px-2 py-1 justify-center items-center rounded-lg shadow-sm bg-socialGoogle border border-colorsGray"
          >
            <div className="shrink-0">
              <GoogleIcon />
            </div>
            <span className="text-secondary font-bold h-fit">Google Forms</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default FaQ
