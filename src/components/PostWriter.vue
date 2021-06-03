<template>
  <div>
    <div class="columns">
      <div class="column">
        <div class="fields">
          <div class="label">博客标题</div>
          <div class="control">
            <input type="text" v-model="title" class="input" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Post } from "@/types";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "PostWriter",
  props: {
    post: {
      type: Object as () => Post,
      required: true,
    },
  },
  setup(props) {
    const title = ref(props.post.title);

    return {
      title,
    };
  },
});
</script>
