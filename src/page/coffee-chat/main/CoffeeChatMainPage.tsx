"use client"

import ListPage from "@/components/shared/page-template/ListPage"
import CoffeeChatListContainer from "./CoffeeChatListContainer"
import CoffeeChatWelcome from "./CoffeeChatWelcome"
import Image from "next/image"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/PopOver"
import { Icons } from "@/components/icons/Icons"
import { PopoverClose } from "@radix-ui/react-popover"

function CoffeeChatMainPage() {
  return (
    <>
      <section className="sticky z-[7] top-[--height-header] sm:relative sm:top-0 sm:mt-0 sm:z-0 w-full h-40 pc:h-60 bg-white">
        <section className="relative z-[2] box-border w-full h-full flex flex-col justify-center px-6 tabletDevice:px-12 pc:px-[120px] text-white">
          <section className="w-full flex items-center gap-1">
            <h3 className="text-2xl font-semibold pc:text-[32px]">커피 챗</h3>
            <Popover>
              <PopoverTrigger>
                <Icons.Info className="text-base" />
              </PopoverTrigger>
              <PopoverContent
                hideWhenDetached={true}
                side="right"
                align="start"
                sticky="always"
                alignOffset={4}
                className="min-w-[84px] max-w-[calc(100vw-160px)] sm:max-w-none sm:w-[260px] tabletDevice:w-[340px] pc:!w-[400px] border border-[#828282] bg-white rounded-lg text-base p-4"
              >
                <section className="relative">
                  <PopoverClose className="absolute -top-2 -right-2">
                    <Icons.Close className="text-sm" />
                  </PopoverClose>
                  <h4 className="font-bold text-xs">커피 챗 ☕</h4>
                  <article className="text-sm">
                    커피 챗은 정보 교환을 목적으로 가볍게 한 잔의 커피를 마시며
                    <br />
                    진행하는 비공식적인 대화 또는 네트워킹 미팅입니다.
                  </article>
                </section>
              </PopoverContent>
            </Popover>
          </section>
          <CoffeeChatWelcome section="main" className="text-white mt-2" />
        </section>
        <Image
          priority
          src="/coffee.png"
          alt="coffee"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </section>
      <ListPage section="coffeeChat">
        <CoffeeChatListContainer />
      </ListPage>
    </>
  )
}

export default CoffeeChatMainPage
