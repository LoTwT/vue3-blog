import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router"

// 模拟数据请求
import axios from "axios"
import * as MockData from "./mock"
import { promiseTimeout } from "@vueuse/core"

axios.get = async (url: string): Promise<any> => {
  await promiseTimeout(1000)
  return Promise.resolve({ data: url === "/mockposts" ? [MockData.todayPost, MockData.thisWeekPost, MockData.thisMonthPost] : [] })
}

createApp(App).use(router).mount('#app')
