import { VoteStatus, type Answer } from "@/interfaces/answer"
import badge_url from "@/assets/images/badges"

const mockAnswers: Answer[] = [
  {
    answer_id: 1,
    question_id: 1,
    content:
      "Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus.",
    author_level: 1,
    rank_image_url: null,
    member_image_url: null,
    created_by: "zi존",
    answer_image_url: null,
    created_date: "2023-10-07 10:02:46",
    modified_date: "2023-10-07 10:02:47",
    vote_count: 0,
    vote_status: VoteStatus.NONE,
  },
  {
    answer_id: 2,
    question_id: 1,
    content: "[네이버](www.naver.com)",
    author_level: 2,
    rank_image_url: null,
    member_image_url:
      "https://mobirise.com/bootstrap-template//profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg",
    created_by: "홍주광",
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
    content:
      "Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus.",
    author_level: 3,
    rank_image_url: badge_url[3],
    member_image_url:
      "https://mobirise.com/bootstrap-template//profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg",
    created_by: "Aerified",
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
    content:
      "Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus.",
    author_level: 4,
    rank_image_url: badge_url[4],
    member_image_url:
      "https://mobirise.com/bootstrap-template//profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg",
    created_by: "Aerified1",
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
    content:
      "Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus.",
    author_level: 5,
    rank_image_url: badge_url[5],
    member_image_url:
      "https://mobirise.com/bootstrap-template//profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg",
    created_by: "Aerified2",
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
    content:
      "Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus.",
    author_level: 6,
    rank_image_url: badge_url[6],
    member_image_url:
      "https://mobirise.com/bootstrap-template//profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg",
    created_by: "Aerified3",
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
    content:
      "Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus.",
    author_level: 7,
    rank_image_url: badge_url[7],
    member_image_url:
      "https://mobirise.com/bootstrap-template//profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg",
    created_by: "Aerified4",
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
    content:
      "Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus.",
    author_level: 8,
    rank_image_url: badge_url[8],
    member_image_url:
      "https://mobirise.com/bootstrap-template//profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg",
    created_by: "Aerified5",
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
    content:
      "Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus.",
    author_level: 9,
    rank_image_url: badge_url[9],
    member_image_url:
      "https://mobirise.com/bootstrap-template//profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg",
    created_by: "Aerified6",
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
    content:
      "Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus.",
    author_level: 10,
    rank_image_url: badge_url[10],
    member_image_url:
      "https://mobirise.com/bootstrap-template//profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg",
    created_by: "Aerified7",
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
    content:
      "Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus.",
    author_level: 1,
    rank_image_url: badge_url[1],
    member_image_url:
      "https://mobirise.com/bootstrap-template//profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg",
    created_by: "Aerified8",
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
    content:
      "Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus.",
    author_level: 2,
    rank_image_url: badge_url[2],
    member_image_url:
      "https://mobirise.com/bootstrap-template//profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg",
    created_by: "Aerified9",
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
    content:
      "Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus.",
    author_level: 3,
    rank_image_url: badge_url[3],
    member_image_url:
      "https://mobirise.com/bootstrap-template//profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg",
    created_by: "Aerified",
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
    content:
      "Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus.",
    author_level: 4,
    rank_image_url: badge_url[4],
    member_image_url:
      "https://mobirise.com/bootstrap-template//profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg",
    created_by: "Aerified1",
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
    content:
      "Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus.",
    author_level: 5,
    rank_image_url: badge_url[5],
    member_image_url:
      "https://mobirise.com/bootstrap-template//profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg",
    created_by: "Aerified",
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
    content:
      "Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus.",
    author_level: 6,
    rank_image_url: badge_url[6],
    member_image_url:
      "https://mobirise.com/bootstrap-template//profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg",
    created_by: "Aerified",
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
    content:
      "Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus.",
    author_level: 7,
    rank_image_url: badge_url[7],
    member_image_url:
      "https://mobirise.com/bootstrap-template//profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg",
    created_by: "Aerified1",
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
    content:
      "Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus.",
    author_level: 8,
    rank_image_url: badge_url[8],
    member_image_url:
      "https://mobirise.com/bootstrap-template//profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg",
    created_by: "Aerified",
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
    content:
      "Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus.",
    author_level: 9,
    rank_image_url: badge_url[9],
    member_image_url:
      "https://mobirise.com/bootstrap-template//profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg",
    created_by: "Aerified1",
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
    content:
      "Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus.",
    author_level: 10,
    rank_image_url: badge_url[10],
    member_image_url:
      "https://mobirise.com/bootstrap-template//profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg",
    created_by: "Aerified",
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
    content:
      "Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus.",
    author_level: 1,
    rank_image_url: badge_url[1],
    member_image_url:
      "https://mobirise.com/bootstrap-template//profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg",
    created_by: "Aerified1",
    answer_image_url:
      "https://mobirise.com/bootstrap-template//profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg",
    created_date: "2023-10-07 10:02:46",
    modified_date: "2023-10-07 10:02:46",
    vote_count: 53,
    vote_status: VoteStatus.NONE,
  },
]

export default mockAnswers
