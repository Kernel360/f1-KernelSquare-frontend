import { Question } from "@/interfaces/question"
import Link from "next/link"
import Tag from "../tag/Tag"
import { getKorRelativeTime } from "@/util/getDate"
import dayjs from "dayjs"
import { useClientSession } from "@/hooks/useClientSession"
import Profile from "../Profile"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface OneQnAProps {
  question: Question
}

const OneQnA = ({ question }: OneQnAProps) => {
  const {
    id,
    title,
    skills,
    member_id,
    nickname,
    member_image_url,
    level_image_url,
    created_date,
    level,
  } = question
  const now = dayjs().format()
  const { user } = useClientSession()
  const { push } = useRouter()

  return (
    <li
      key={title + id}
      className={`shadow-sm hover:shadow-md transition-shadow max-w-full box-border border border-colorsGray rounded-lg p-2`}
    >
      <h3 className="w-fit">
        <Link
          href={`/question/${id}`}
          className="max-w-full line-clamp-2 text-ellipsis text-blue-400"
        >
          {title}
        </Link>
      </h3>
      <ul className="flex gap-2 flex-wrap my-1">
        {skills.map((skill, index) => {
          return <Tag key={`${id}-${index}-${skill}`}>{skill}</Tag>
        })}
      </ul>
      <div className="flex h-full">
        <div className="flex flex-1 justify-end self-end">
          <time className="text-sm">
            {getKorRelativeTime({ now, targetDate: created_date })}
          </time>
        </div>
        <div
          className={`shrink-0 flex h-max max-h-14 items-center gap-1 ml-4 rounded-lg ${
            user
              ? "cursor-pointer relative outline outline-[2px] outline-transparent transition-colors hover:outline hover:outline-primary outline-offset-1"
              : "cursor-default"
          } `}
          {...(user && {
            onClick: (e) => push(`/profile/${member_id}`),
            title: "유저 프로필로 이동",
          })}
        >
          <div className="h-full box-border m-1 shrink-0 translate-x-0 translate-y-0">
            <Profile
              profileImage={member_image_url}
              className="align-top m-0.5 cursor-default"
            />
          </div>
          <div className="w-16 h-full flex flex-col justify-center items-start shrink-0">
            <div className="text-sm">{nickname}</div>
            <div className="flex justify-start items-center gap-1">
              <div className="relative w-4 h-4 my-1">
                <Image
                  src={level_image_url}
                  alt="level badge"
                  fill
                  style={{
                    objectFit: "scale-down",
                    objectPosition: "center",
                  }}
                  sizes="auto"
                />
              </div>
              <div className="text-xs">LV.{level}</div>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

export default OneQnA
