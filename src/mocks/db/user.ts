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
    experience: 2000,
    level: 4,
    authorities: ["ROLE_USER", "ROLE_MENTOR"],
    account_status: ACCOUNT_STATUS.TRUE,
    introduction:
      "안녕하세요, 홍주광입니다. Spring Boot를 사용하는 백엔드 개발자입니다.주로 RESTful API를 개발하며, 효율적이고 확장 가능한 솔루션을 찾는 것을 즐깁니다. 테스트 주도 개발과 코드 품질에 중점을 두어 유지보수가 용이하고 안정적인 코드를 작성하는 것이 제 목표입니다. 새로운 기술에 대한 학습과 협업을 중요시하며, 함께 성장하고자 합니다. ~",
  },
] as Array<User & { id: number; password: string }>
