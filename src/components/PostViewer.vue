<template>
  <div>博客标题: {{ post?.title }}</div>
  <div v-html="post?.html"></div>
  <div>markdown: {{ post?.markdown }}</div>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { defineComponent } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "PostViewer",
  async setup() {
    const store = useStore();
    const route = useRoute();
    const id = route.params.id as string;

    if (!store.getState().posts.isLoaded) {
      await store.fetchPosts()
    }

    const post = store.getState().posts.all[id];

    return {
      post,
    };
  },
});
</script>
