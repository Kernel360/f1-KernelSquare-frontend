const Limitation = {
  hashtags_cnt: 10,
  hashtags_word: 10,
  mentoring_time: 10,
  image_size: 3 * 1024 * 1024,
  title_limit_under: 5,
  content_limit_under: 10,
  introduction_limit_under: 10,
  introduction_limit_over: 1000,
} as const

export default Limitation
