import { createRouter, createWebHistory } from "vue-router"
import Home from "@/views/Home.vue"

export default createRouter({
  history: createWebHistory("/"),
  routes: [
    { path: "/", component: Home, name: "Home" },
    { path: "/posts/new", component: () => import("@/views/NewPost.vue"), name: "NewPost" },
    { path: "/posts/:id", component: () => import("@/views/ShowPost.vue"), name: "ShowPost" }
  ]
})