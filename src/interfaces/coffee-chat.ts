import { TechTag } from "./tech-tag"
import { User } from "./user"

/**
 * CoffeeChat(커피챗)
 *
 * ---
 *
 * **nickname** 유저 닉네임(string) : User
 *
 * **image_url** 유저 프로필 이미지 주소(string) : User
 *
 * **badge_url** 뱃지 이미지 주소(string)
 *
 * **post_intro** 커피챗 소개글(string)
 *
 * **tags** 커피챗 기술 태그 : TechTag[]
 */
export interface CoffeeChat extends Pick<User, "nickname" | "image_url"> {
  badge_url: string
  post_intro: string
  tags: Array<TechTag>
}
