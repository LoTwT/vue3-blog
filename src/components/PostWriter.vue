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
import { MarkedOptions, parse } from "marked";
import HLJS from "highlight.js";
import debounce from "lodash/debounce";

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

    const markedOptions: MarkedOptions = {
      highlight: (code: string) => HLJS.highlightAuto(code).value,
    };

    const update = (newValue: string) =>
      (post.html.value = parse(newValue, markedOptions));

    watch(post.markdown, debounce(update, 500), { immediate: true });

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
