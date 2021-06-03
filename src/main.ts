import { createApp } from 'vue'
import App from './App.vue'

import axios from "axios"
import * as MockData from "./mock"
import { promiseTimeout } from "@vueuse/core"

axios.get = async (url: string): Promise<any> => {
  await promiseTimeout(1000)
  return Promise.resolve({ data: url === "/mockposts" ? [MockData.todayPost, MockData.thisWeekPost, MockData.thisMonthPost] : [] })
}

createApp(App).mount('#app')
