import { VoteStatus, type Answer } from "@/interfaces/answer"
import badge_url from "@/assets/images/badges"

const mockAnswers: Answer[] = [
  {
    answer_id: 1,
    question_id: 1,
    answer_member_id: 0,
    content:
      "Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus.",
    author_level: 1,
    rank_image_url: null,
    rank_name: 1,
    member_image_url: null,
    member_nickname: "zi존",
    answer_image_url: null,
    created_date: "2023-10-07 10:02:46",
    modified_date: "2023-10-07 10:02:47",
    vote_count: 0,
    vote_status: VoteStatus.NONE,
  },
  {
    answer_id: 2,
    question_id: 1,
    answer_member_id: 1,
    content: "[네이버](www.naver.com)",
    author_level: 2,
    rank_image_url: null,
    rank_name: 1,
    member_image_url:
      "https://mobirise.com/bootstrap-template//profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg",
    member_nickname: "홍주광",
    answer_image_url:
      "https://mobirise.com/bootstrap-template//profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg",
    created_date: "2023-10-07 10:02:46",
    modified_date: "2023-10-07 10:02:46",
    vote_count: -10,
    vote_status: VoteStatus.NONE,
  },
  {
    answer_id: 3,
    question_id: 1,
    answer_member_id: 4,
    content:
      "Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus.",
    author_level: 3,
    rank_image_url: badge_url[3],
    rank_name: 3,
    member_image_url:
      "https://mobirise.com/bootstrap-template//profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg",
    member_nickname: "Mocks",
    answer_image_url:
      "https://mobirise.com/bootstrap-template//profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg",
    created_date: "2023-10-07 10:02:46",
    modified_date: "2023-10-07 10:02:46",
    vote_count: 53,
    vote_status: VoteStatus.LIKED,
  },
  {
    answer_id: 4,
    question_id: 1,
    answer_member_id: 3,
    content:
      "Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus.",
    author_level: 4,
    rank_image_url: badge_url[4],
    rank_name: 4,
    member_image_url:
      "https://mobirise.com/bootstrap-template//profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg",
    member_nickname: "RyanOh",
    answer_image_url:
      "https://mobirise.com/bootstrap-template//profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg",
    created_date: "2023-10-07 10:02:46",
    modified_date: "2023-10-07 10:02:46",
    vote_count: 53,
    vote_status: VoteStatus.NONE,
  },
  {
    answer_id: 5,
    question_id: 1,
    answer_member_id: 5,
    content:
      "Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus.",
    author_level: 5,
    rank_image_url: badge_url[5],
    rank_name: 5,
    member_image_url:
      "https://mobirise.com/bootstrap-template//profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg",
    member_nickname: "Mocks",
    answer_image_url:
      "https://mobirise.com/bootstrap-template//profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg",
    created_date: "2023-10-07 10:02:46",
    modified_date: "2023-10-07 10:02:46",
    vote_count: 53,
    vote_status: VoteStatus.LIKED,
  },
  {
    answer_id: 6,
    question_id: 1,
    answer_member_id: 1,
    content:
      "Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus.",
    author_level: 6,
    rank_image_url: badge_url[6],
    rank_name: 6,
    member_image_url:
      "https://mobirise.com/bootstrap-template//profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg",
    member_nickname: "zi존",
    answer_image_url:
      "https://mobirise.com/bootstrap-template//profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg",
    created_date: "2023-10-07 10:02:46",
    modified_date: "2023-10-07 10:02:46",
    vote_count: 53,
    vote_status: VoteStatus.DISLIKED,
  },
  {
    answer_id: 7,
    question_id: 1,
    answer_member_id: 2,
    content:
      "Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus.",
    author_level: 7,
    rank_image_url: badge_url[7],
    rank_name: 7,
    member_image_url:
      "https://mobirise.com/bootstrap-template//profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg",
    member_nickname: "홍주광",
    answer_image_url:
      "https://mobirise.com/bootstrap-template//profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg",
    created_date: "2023-10-07 10:02:46",
    modified_date: "2023-10-07 10:02:47",
    vote_count: 53,
    vote_status: VoteStatus.LIKED,
  },
  {
    answer_id: 8,
    question_id: 1,
    answer_member_id: 3,
    content:
      "Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus.",
    author_level: 8,
    rank_image_url: badge_url[8],
    rank_name: 8,
    member_image_url:
      "https://mobirise.com/bootstrap-template//profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg",
    member_nickname: "RyanOh",
    answer_image_url:
      "https://mobirise.com/bootstrap-template//profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg",
    created_date: "2023-10-07 10:02:46",
    modified_date: "2023-10-07 10:02:46",
    vote_count: 53,
    vote_status: VoteStatus.LIKED,
  },
  {
    answer_id: 9,
    question_id: 1,
    answer_member_id: 4,
    content:
      "Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus.",
    author_level: 9,
    rank_image_url: badge_url[9],
    rank_name: 9,
    member_image_url:
      "https://mobirise.com/bootstrap-template//profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg",
    member_nickname: "Mocks",
    answer_image_url:
      "https://mobirise.com/bootstrap-template//profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg",
    created_date: "2023-10-07 10:02:46",
    modified_date: "2023-10-07 10:02:46",
    vote_count: 53,
    vote_status: VoteStatus.DISLIKED,
  },
  {
    answer_id: 10,
    question_id: 1,
    answer_member_id: 5,
    content:
      "Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus.",
    author_level: 10,
    rank_image_url: badge_url[10],
    rank_name: 10,
    member_image_url:
      "https://mobirise.com/bootstrap-template//profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg",
    member_nickname: "Mocks",
    answer_image_url:
      "https://mobirise.com/bootstrap-template//profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg",
    created_date: "2023-10-07 10:02:46",
    modified_date: "2023-10-07 10:02:46",
    vote_count: 53,
    vote_status: VoteStatus.NONE,
  },
  {
    answer_id: 11,
    question_id: 1,
    answer_member_id: 6,
    content:
      "Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus.",
    author_level: 1,
    rank_image_url: badge_url[1],
    rank_name: 1,
    member_image_url:
      "https://mobirise.com/bootstrap-template//profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg",
    member_nickname: "chatchat",
    answer_image_url:
      "https://mobirise.com/bootstrap-template//profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg",
    created_date: "2023-10-07 10:02:46",
    modified_date: "2023-10-07 10:02:46",
    vote_count: 53,
    vote_status: VoteStatus.DISLIKED,
  },
  {
    answer_id: 12,
    question_id: 1,
    answer_member_id: 1,
    content:
      "Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus.",
    author_level: 2,
    rank_image_url: badge_url[2],
    rank_name: 2,
    member_image_url:
      "https://mobirise.com/bootstrap-template//profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg",
    member_nickname: "zi존",
    answer_image_url:
      "https://mobirise.com/bootstrap-template//profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg",
    created_date: "2023-10-07 10:02:46",
    modified_date: "2023-10-07 10:02:46",
    vote_count: 53,
    vote_status: VoteStatus.DISLIKED,
  },
  {
    answer_id: 13,
    question_id: 3,
    answer_member_id: 2,
    content:
      "Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus.",
    author_level: 3,
    rank_image_url: badge_url[3],
    rank_name: 3,
    member_image_url:
      "https://mobirise.com/bootstrap-template//profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg",
    member_nickname: "홍주광",
    answer_image_url:
      "https://mobirise.com/bootstrap-template//profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg",
    created_date: "2023-10-07 10:02:46",
    modified_date: "2023-10-07 10:02:46",
    vote_count: 53,
    vote_status: VoteStatus.DISLIKED,
  },
  {
    answer_id: 14,
    question_id: 3,
    answer_member_id: 3,
    content:
      "Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus.",
    author_level: 4,
    rank_image_url: badge_url[4],
    rank_name: 4,
    member_image_url:
      "https://mobirise.com/bootstrap-template//profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg",
    member_nickname: "v",
    answer_image_url:
      "https://mobirise.com/bootstrap-template//profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg",
    created_date: "2023-10-07 10:02:46",
    modified_date: "2023-10-07 10:02:46",
    vote_count: 53,
    vote_status: VoteStatus.NONE,
  },
  {
    answer_id: 15,
    question_id: 4,
    answer_member_id: 4,
    content:
      "Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus.",
    author_level: 5,
    rank_image_url: badge_url[5],
    rank_name: 5,
    member_image_url:
      "https://mobirise.com/bootstrap-template//profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg",
    member_nickname: "Mocks",
    answer_image_url:
      "https://mobirise.com/bootstrap-template//profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg",
    created_date: "2023-10-07 10:02:46",
    modified_date: "2023-10-07 10:02:46",
    vote_count: 53,
    vote_status: VoteStatus.NONE,
  },
  {
    answer_id: 16,
    question_id: 5,
    answer_member_id: 5,
    content:
      "Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus.",
    author_level: 6,
    rank_image_url: badge_url[6],
    rank_name: 6,
    member_image_url:
      "https://mobirise.com/bootstrap-template//profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg",
    member_nickname: "Mocks",
    answer_image_url:
      "https://mobirise.com/bootstrap-template//profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg",
    created_date: "2023-10-07 10:02:46",
    modified_date: "2023-10-07 10:02:46",
    vote_count: 53,
    vote_status: VoteStatus.NONE,
  },
  {
    answer_id: 17,
    question_id: 5,
    answer_member_id: 6,
    content:
      "Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus.",
    author_level: 7,
    rank_image_url: badge_url[7],
    rank_name: 7,
    member_image_url:
      "https://mobirise.com/bootstrap-template//profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg",
    member_nickname: "chatchat",
    answer_image_url:
      "https://mobirise.com/bootstrap-template//profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg",
    created_date: "2023-10-07 10:02:46",
    modified_date: "2023-10-07 10:02:46",
    vote_count: 53,
    vote_status: VoteStatus.NONE,
  },
  {
    answer_id: 18,
    question_id: 6,
    answer_member_id: 1,
    content:
      "Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus.",
    author_level: 8,
    rank_image_url: badge_url[8],
    rank_name: 8,
    member_image_url:
      "https://mobirise.com/bootstrap-template//profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg",
    member_nickname: "zi존",
    answer_image_url:
      "https://mobirise.com/bootstrap-template//profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg",
    created_date: "2023-10-07 10:02:46",
    modified_date: "2023-10-07 10:02:46",
    vote_count: 53,
    vote_status: VoteStatus.NONE,
  },
  {
    answer_id: 19,
    question_id: 6,
    answer_member_id: 2,
    content:
      "Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus.",
    author_level: 9,
    rank_image_url: badge_url[9],
    rank_name: 9,
    member_image_url:
      "https://mobirise.com/bootstrap-template//profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg",
    member_nickname: "홍주광",
    answer_image_url:
      "https://mobirise.com/bootstrap-template//profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg",
    created_date: "2023-10-07 10:02:46",
    modified_date: "2023-10-07 10:02:46",
    vote_count: 53,
    vote_status: VoteStatus.NONE,
  },
  {
    answer_id: 20,
    question_id: 7,
    answer_member_id: 3,
    content:
      "Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus.",
    author_level: 10,
    rank_image_url: badge_url[10],
    rank_name: 10,
    member_image_url:
      "https://mobirise.com/bootstrap-template//profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg",
    member_nickname: "RyanOh",
    answer_image_url:
      "https://mobirise.com/bootstrap-template//profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg",
    created_date: "2023-10-07 10:02:46",
    modified_date: "2023-10-07 10:02:46",
    vote_count: 53,
    vote_status: VoteStatus.NONE,
  },
  {
    answer_id: 21,
    question_id: 7,
    answer_member_id: 4,
    content:
      "Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus.",
    author_level: 1,
    rank_image_url: badge_url[1],
    rank_name: 1,
    member_image_url:
      "https://mobirise.com/bootstrap-template//profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg",
    member_nickname: "Mocks",
    answer_image_url:
      "https://mobirise.com/bootstrap-template//profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg",
    created_date: "2023-10-07 10:02:46",
    modified_date: "2023-10-07 10:02:46",
    vote_count: 53,
    vote_status: VoteStatus.NONE,
  },
]

export default mockAnswers
