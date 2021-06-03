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

    <!-- 写的内容 & 展示内容 -->
    <div class="columns">
      <div class="column is-one-half">
        <div
          contenteditable
          id="markdown"
          ref="contentEditable"
          @input="handleEdit"
        />
      </div>
      <div class="column is-one-half">
        <div v-html="html" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Post } from "@/types";
import { defineComponent, onMounted, reactive, ref, toRefs, watch } from "vue";
// @ts-ignore
import { parse } from "marked";

export default defineComponent({
  name: "PostWriter",
  props: {
    post: {
      type: Object as () => Post,
      required: true,
    },
  },
  setup(props) {
    const post = toRefs(reactive(props.post));
    const contentEditable = ref<HTMLDivElement | null>(null);

    watch(
      post.markdown,
      (newValue) => {
        post.html.value = parse(newValue);
      },
      { immediate: true }
    );

    onMounted(
      () =>
        contentEditable.value &&
        (contentEditable.value.innerText = post.markdown.value)
    );

    const handleEdit = () =>
      contentEditable.value &&
      (post.markdown.value = contentEditable.value.innerText);

    return {
      title: post.title,
      contentEditable,

      handleEdit,
      markdown: post.markdown,

      html: post.html,
    };
  },
});
</script>
