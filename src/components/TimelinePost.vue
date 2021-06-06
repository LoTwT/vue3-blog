<template>
  <router-link :to="gotoDetail" data-test="dataPost" class="panel-block">
    <div>
      <a>{{ showPost.title }}</a>
      <div>{{ showPost.created.format("yyyy-MM-DD") }}</div>
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Post } from "@/types";

export default defineComponent({
  name: "TimelinePost",
  props: {
    showPost: {
      type: Object as () => Post,
      required: true,
    },
  },
  setup(props) {
    return {
      gotoDetail: `/posts/${props.showPost.id}`,
    };
  },
});
</script>