import { baseImageLimitInstance } from "./image/image-limit"

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
