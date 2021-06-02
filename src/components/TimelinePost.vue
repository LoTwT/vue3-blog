<template>
  <a data-test="dataPost" class="panel-block">
    <div>
      <a>{{ showPost.title }}</a>
      <div>{{ showPost.created.format("yyyy-MM-DD") }}</div>
    </div>
  </a>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { MockPost } from "@/types";

export default defineComponent({
  name: "TimelinePost",
  props: {
    showPost: {
      type: Object as () => MockPost,
      required: true,
    },
  },
  setup() {},
});
</script>