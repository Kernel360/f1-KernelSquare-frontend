import LandingHeader from "./components/LandingHeader"
import LandingSearchBar from "./components/LandingSearchBar"

const LandingPage: React.FC = () => {
  return (
    <>
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
    </>
  )
}

export default LandingPage
