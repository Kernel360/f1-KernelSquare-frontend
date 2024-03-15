"use client"

import Image from "next/image"
import LandingContainer from "../LandingContainer"
import landing_coffeechat_image from "@/assets/landing/coffeechat_image.svg"
import landing_coffeechat_text from "@/assets/landing/coffeechat_text.svg"
import landing_coffeechat_process from "@/assets/landing/coffeechat_process.svg"
import square_line from "@/assets/landing/square_line.svg"
import Spacing from "@/components/shared/Spacing"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/Carousel"
import Autoplay from "embla-carousel-autoplay"
import { useEffect, useRef } from "react"
import { CoffeeChatProcessSlide } from "@/constants/landing"
import { useSetRecoilState } from "recoil"
import landingTabAtom from "@/recoil/atoms/landingTab"

const LandingCoffeeChat = () => {
  const autoplay = useRef(Autoplay({ delay: 1500, stopOnInteraction: true }))
  const setLandingTab = useSetRecoilState(landingTabAtom)

  const coffeechatRef = useRef<HTMLImageElement>(null)
  const processRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let observer: IntersectionObserver
    if (coffeechatRef.current || processRef.current) {
      observer = new IntersectionObserver(
        () => {
          setLandingTab("커피챗")
        },
        { threshold: 0.5 },
      )
      if (coffeechatRef.current) observer.observe(coffeechatRef.current)
      if (processRef.current) observer.observe(processRef.current)
    }
  }, [coffeechatRef, processRef, setLandingTab])

  return (
    <>
      <LandingContainer className="flex justify-center items-center gap-10">
        <div className="hidden sm:block">
          <Image
            src={square_line}
            alt="square_line"
            height={600}
            data-aos="fade-down"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-10">
          <Image
            src={landing_coffeechat_image}
            alt="landing_qna_image"
            width={600}
            data-aos="fade-up"
            className="w-[400px] sm:w-[600px]"
            ref={coffeechatRef}
          />
          <Image
            src={landing_coffeechat_text}
            alt="landing_qna_text"
            width={600}
            data-aos="fade-up"
            className="mt-10 w-[400px] sm:w-[600px]"
          />
        </div>
      </LandingContainer>
      <LandingContainer className="flex flex-col justify-center items-center">
        <div
          className="text-center"
          data-aos="fade-up"
          data-aos-anchor-placement="top-bottom"
          ref={processRef}
        >
          <div className="text-2xl font-bold">Coffee Chat Process</div>
          <div className="text-4xl font-bold text-primary">
            커피챗은 이렇게 진행됩니다
          </div>
        </div>
        <Spacing size={80} />
        <Image
          src={landing_coffeechat_process}
          alt="landing_coffeechat_process"
          width={900}
          data-aos="fade-up"
          data-aos-anchor-placement="top-bottom"
          className="hidden sm:block"
        />
        <div className="flex sm:hidden">
          <Carousel
            plugins={[autoplay.current]}
            className="w-full max-w-xs"
            onMouseEnter={autoplay.current.stop}
            onMouseLeave={autoplay.current.reset}
          >
            <CarouselContent>
              {CoffeeChatProcessSlide.map((image, i) => (
                <CarouselItem
                  key={Math.random() * 10000 + i}
                  className="w-full m-auto"
                >
                  <Image
                    src={image}
                    alt={image}
                    width={200}
                    className="w-full"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-transparent text-white" />
            <CarouselNext className="bg-transparent text-white" />
          </Carousel>
        </div>
      </LandingContainer>
    </>
  )
}

export default LandingCoffeeChat
