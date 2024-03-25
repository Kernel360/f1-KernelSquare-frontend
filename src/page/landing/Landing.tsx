import LandingHeader from "./components/LandingHeader"
import LandingSearchBar from "./components/LandingSearchBar"
import LandingCodingMeeting from "./components/sections/LandingCodingMeeting"
import LandingCoffeeChat from "./components/sections/LandingCoffeeChat"
import LandingQnA from "./components/sections/LandingQnA"
import LandingTeam from "./components/sections/LandingTeam"
import LandingLogIn from "./components/sections/LandingLogIn"
import LandingVideo from "./components/sections/LandingVideo"
import LandingGraph from "./components/sections/LandingGraph"
import AOSProvider from "@/components/layout/AOSProvider"

const LandingPage: React.FC = () => {
  return (
    <>
      <AOSProvider />
      <div className="bg-[#303030]">
        <div>
          <LandingVideo />
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
        <LandingGraph />
        <LandingQnA />
        <LandingCoffeeChat />
        <LandingCodingMeeting />
        <LandingTeam />
        <LandingLogIn />
      </div>
    </>
  )
}

export default LandingPage
