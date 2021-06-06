<template>
  <PostWriter :post="post" @updatePost="dealSave" />
</template>

<script lang="ts">
import { defineComponent } from "vue"
import PostWriter from "@/components/PostWriter.vue"
import { useRoute, useRouter } from "vue-router";
import { useStore } from "@/store";
import { Post } from "@/types";

export default defineComponent({
  name: "PostEditor",
  components: { PostWriter },
  async setup() {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()

    const id = route.params.id as string

    // 加载数据
    if (!store.getState().posts.isLoaded) {
      await store.fetchPosts()
    }

    const post = store.getState().posts.all[id]

    const dealSave = async (newpost: Post) => {
      // 存储到 store 中
      await store.updatePost(newpost)
      // 路由跳转
      router.push("/")
    }

    return {
      post,
      dealSave
    }
  }
})

</script>