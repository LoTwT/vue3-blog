import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router"
import "highlight.js/styles/github.css"

// 模拟数据请求
import axios from "axios"
import * as MockData from "./mock"
import { promiseTimeout } from "@vueuse/core"
import { Post } from './types'
import { v4 as uuidv4 } from "uuid"

axios.get = async (url: string): Promise<any> => {
  await promiseTimeout(1000)
  return Promise.resolve({ data: url === "/mockposts" ? [MockData.todayPost, MockData.thisWeekPost, MockData.thisMonthPost] : [] })
}

axios.post = async (url: string, payload: Post): Promise<any> => {
  await promiseTimeout(1000)
  const id = uuidv4()
  return Promise.resolve({ data: url === "/mockposts" ? { ...payload, id } : {} })
}

createApp(App).use(router).mount('#app')
