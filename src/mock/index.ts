import moment from "moment"
import { Post } from "@/types/index"

moment.locale("zh-cn")

export const basePost: Post = {
  id: 1,
  title: "blog",
  markdown: "article",
  html: "<p>article</p>",
  authorId: 1,
  created: moment()
}

export const todayPost: Post = {
  ...basePost,
  title: "今天"
}

export const thisWeekPost: Post = {
  ...basePost,
  id: 2,
  title: "本周",
  created: moment().subtract(2, "day")
}

export const thisMonthPost: Post = {
  ...basePost,
  id: 3,
  title: "本月",
  created: moment().subtract(2, "weeks")
}