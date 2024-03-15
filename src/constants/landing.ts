import landing_create_coffeechat from "@/assets/landing/create_coffeechat.svg"
import landing_reserve_coffeechat from "@/assets/landing/reserve_coffeechat.svg"
import landing_enter_coffeechat from "@/assets/landing/enter_coffeechat.svg"

const enum ROLE {
  BE = "Back-End Developer",
  FE = "Front-End Developer",
  DE = "Designer",
}

const TeamKernelSqaure = [
  {
    name: "Wonsang.K",
    profile: "https://avatars.githubusercontent.com/u/92242326?v=4",
    role: ROLE.BE,
    github: "https://github.com/RossKWSang",
  },
  {
    name: "Byungryong.K",
    profile: "https://avatars.githubusercontent.com/u/54776553?v=4",
    role: ROLE.BE,
    github: "https://github.com/fingersdanny",
  },
  {
    name: "Jukwang.H",
    profile: "https://avatars.githubusercontent.com/u/59231743?v=4",
    role: ROLE.BE,
    github: "https://github.com/Hju95",
  },
  {
    name: "Chanwook.M",
    profile: "https://avatars.githubusercontent.com/u/97713997?v=4",
    role: ROLE.BE,
    github: "https://github.com/mooncw",
  },
  {
    name: "Daesung.O",
    profile: "https://avatars.githubusercontent.com/u/110394773?v=4",
    role: ROLE.FE,
    github: "https://github.com/Ryan-TheLion",
  },
  {
    name: "Jeongwoo.H",
    profile: "https://avatars.githubusercontent.com/u/123251211?v=4",
    role: ROLE.FE,
    github: "https://github.com/JeongwooHam",
  },
  // {
  //   name: "NaeKyung.L",
  //   profile: undefined,
  //   role: ROLE.DE,
  //   github: undefined,
  // },
]

export default TeamKernelSqaure

export const CoffeeChatProcessSlide = [
  landing_create_coffeechat,
  landing_reserve_coffeechat,
  landing_enter_coffeechat,
]

export const HeaderTab = [
  {
    title: "개발자 Q&A",
    url: "/qna",
  },
  {
    title: "커피챗",
    url: "/chat",
  },
  {
    title: "모각코",
    url: "/coding-meetings",
  },
]
