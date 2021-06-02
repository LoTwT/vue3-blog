import moment from "moment"
import { MockPost } from "@/types/index"

export const basePost: MockPost = {
  id: 1,
  title: "blog",
  markdown: "article",
  html: "<p>article</p>",
  authorId: 1,
  created: moment()
}

export const todayPost: MockPost = {
  ...basePost,
  title: "今天"
}

export const thisWeekPost: MockPost = {
  ...basePost,
  title: "本周",
  created: moment().subtract(2, "day")
}

export const thisMonthPost: MockPost = {
  ...basePost,
  title: "本月",
  created: moment().subtract(2, "weeks")
}