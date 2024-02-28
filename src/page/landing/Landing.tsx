import LandingHeader from "./components/LandingHeader"
import LandingSearchBar from "./components/LandingSearchBar"

const LandingPage: React.FC = () => {
  return (
    <div className="w-full h-screen">
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
      <div className="absolute w-full flex-col items-center justify-center top-[30%] text-center">
        <div className="font-bold text-5xl text-white">
          지속 가능한 개발자 커뮤니티,
        </div>
        <div className="text-[100px] font-black text-primary italic">
          Kernel Square
        </div>
        <LandingSearchBar />
      </div>
    </div>
  )
}

export default LandingPage
