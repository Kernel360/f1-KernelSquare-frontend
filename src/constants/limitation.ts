import { baseImageLimitInstance } from "./image/image-limit"

const Limitation = {
  title_limit_under: 5,
  title_limit_over: 100,
  content_limit_under: 10,
  content_limit_over: 10000,
  answer_limit_under: 10,
  answer_limit_over: 10000,
  introduction_limit_under: 10,
  introduction_limit_over: 1000,
} as const

export default Limitation

export const USER_PROFILE_LIMITS = {
  introduction: {
    minLength: 10,
    maxLength: 1000,
  },
  image: {
    maxLength: 1,
    maxSize: baseImageLimitInstance.getSize(),
    accept: baseImageLimitInstance.accept,
  },
}

export const HASHTAG_LIMITS = {
  tag: {
    maxLength: 10,
  },
  tags: {
    maxLength: 10,
  },
}

export const QUESTION_LIMITS = {
  title: {
    minLength: 5,
    maxLength: 100,
  },
  skill: {
    maxLength: 5,
  },
  content: {
    minLength: 10,
    maxLength: 10000,
  },
  image: {
    maxLength: baseImageLimitInstance.maximumLength,
    maxSize: baseImageLimitInstance.getSize(),
    accept: baseImageLimitInstance.accept,
  },
}

export const QUESTION_ANSWER_LIMITS = {
  content: {
    minLength: 10,
    maxLength: 10000,
  },
  image: {
    maxLength: baseImageLimitInstance.maximumLength,
    maxSize: baseImageLimitInstance.getSize(),
    accept: baseImageLimitInstance.accept,
  },
}

export const COFFEE_CHAT_LIMITS = {
  title: {
    minLength: 5,
    maxLength: 100,
  },
  introduction: {
    minLength: 10,
    maxLength: 150,
  },
  content: {
    minLength: 10,
    maxLength: 1000,
  },
  mentoringTime: {
    maxLength: 10,
  },
}

export const CODING_MEETING_LIMITS = {
  title: {
    minLength: 5,
    maxLength: 100,
  },
  memberCount: {
    min: 3,
    max: 6,
  },
  content: {
    minLength: 10,
    maxLength: 10000,
  },
}
