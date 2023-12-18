import { ACCOUNT_STATUS, User } from "@/interfaces/user"

export const mockUsers = [
  {
    id: 1,
    email: "testUser1@email.com",
    password: "Password1!",
    nickname: "zi존",
    experience: 0,
    level: 1,
    authorities: ["ROLE_USER"],
    account_status: ACCOUNT_STATUS.FALSE,
    image_url:
      "https://mobirise.com/bootstrap-template//profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg",
  },
  {
    id: 2,
    email: "testMentor1@email.com",
    password: "Mentor1!",
    nickname: "홍주광",
    experience: 4000,
    level: 4,
    authorities: ["ROLE_USER", "ROLE_MENTOR"],
    account_status: ACCOUNT_STATUS.TRUE,
  },
] as Array<User & { id: number; password: string }>
