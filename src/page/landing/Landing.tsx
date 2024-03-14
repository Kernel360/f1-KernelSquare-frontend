import Image from "next/image"
import LandingContainer from "./components/LandingContainer"
import LandingHeader from "./components/LandingHeader"
import LandingSearchBar from "./components/LandingSearchBar"
import landing_main_image from "@/assets/landing/graph.svg"
import landing_main_text from "@/assets/landing/main_text.svg"
import LandingCodingMeeting from "./components/sections/LandingCodingMeeting"
import LandingCoffeeChat from "./components/sections/LandingCoffeeChat"
import LandingQnA from "./components/sections/LandingQnA"
import LandingTeam from "./components/sections/LandingTeam"
import LandingLogIn from "./components/sections/LandingLogIn"

const LandingPage: React.FC = () => {
  return (
    <div>
      <div>
        <video
          width={"100%"}
          height={"100vh"}
          preload="auto"
          autoPlay
          muted
          loop
          className="object-cover h-screen w-full grayscale-[50%] contrast-[90%] brightness-50"
        >
          <source src="/video/landing_video.webm" type="video/webm" />
          <source src="/video/landing_video.mp4" type="video/mp4" />
        </video>
        <LandingHeader />
        <div className="absolute left-0 top-0 w-full h-full flex flex-col items-center justify-center text-center">
          <div className="font-bold text-[36px] sm:text-5xl text-white">
            지속 가능한 개발자 커뮤니티,
          </div>
          <div className="text-[60px] sm:text-[90px] font-black text-primary italic">
            Kernel Square
          </div>
          <LandingSearchBar />
        </div>
      </div>
      <LandingContainer className="flex flex-col sm:flex-row gap-10 justify-center items-center">
        <Image
          src={landing_main_image}
          alt="landing_main_image"
          width={500}
          data-aos="fade-up"
          data-aos-anchor-placement="top-bottom"
          className="w-[300px] sm:w-[500px]"
        />
        <Image
          src={landing_main_text}
          alt="landing_main_text"
          width={500}
          data-aos="fade-up"
          data-aos-anchor-placement="top-bottom"
          className="w-[300px] sm:w-[500px]"
        />
      </LandingContainer>
      <LandingQnA />
      <LandingCoffeeChat />
      <LandingCodingMeeting />
      <LandingTeam />
      <LandingLogIn />
    </div>
  )
}

export default LandingPage
