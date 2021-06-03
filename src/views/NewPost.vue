<template>
  <PostWriter :post="post" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PostWriter from "@/components/PostWriter.vue";
import { Post } from "@/types";
import moment from "moment";

export default defineComponent({
  name: "NewPost",
  components: { PostWriter },
  setup() {
    const post: Post = {
      id: -1,
      title: "blog",
      markdown: "## new blog \n write here",
      html: "",
      authorId: 0,
      created: moment(),
    };

    return {
      post,
    };
  },
});
</script>
