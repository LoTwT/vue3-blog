import { createRouter, createWebHistory } from "vue-router"
import Home from "@/views/Home.vue"
import { useStore } from "@/store"

const router = createRouter({
  history: createWebHistory("/"),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/posts/new",
      name: "NewPost",
      component: () => import("@/views/NewPost.vue"),
      meta: {
        requireAuth: true
      }
    },
    {
      path: "/posts/:id",
      name: "ShowPost",
      component: () => import("@/views/ShowPost.vue"),
    },
    {
      path: "/posts/:id/edit",
      name: "EditPost",
      component: () => import("@/views/EditPost.vue"),
      meta: {
        requireAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const store = useStore()
  if (to.meta.requireAuth && !store.getState().loginUsers.currentUserId) {
    next({ name: "Home" })
  } else {
    next()
  }
})

export default router