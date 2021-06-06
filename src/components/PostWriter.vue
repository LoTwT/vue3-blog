<template>
  <div>
    <div class="columns">
      <div class="column">
        <div class="fields">
          <div class="label">博客标题</div>
          <div class="control">
            <input data-test="post-title" type="text" v-model="title" class="input" />
          </div>
        </div>
      </div>
    </div>

    <!-- 写的内容 & 展示内容 -->
    <div class="columns">
      <div class="column is-one-half">
        <div>编辑</div>
        <div
          contenteditable
          id="markdown"
          ref="contentEditable"
          @input="handleEdit"
          data-test="markdown"
          class="area-box"
        />
      </div>
      <div class="column is-one-half">
        <div>预览</div>
        <div v-html="html" class="area-box" />
      </div>
    </div>

    <!-- 保存 -->
    <div class="columns">
      <div class="column">
        <button class="button is-primary is-pull-right" @click="handleSave" data-test="save-post">保存</button>
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
  setup(props, ctx) {
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

    // 保存
    const handleSave = () => {
      // 将数据提交到父级
      const newpost: Post = {
        ...props.post,
        title: post.title.value,
        markdown: post.markdown.value,
        html: post.markdown.value,
      };

      ctx.emit("updatePost", newpost);
    };

    return {
      title: post.title,
      contentEditable,

      handleEdit,
      markdown: post.markdown,

      html: post.html,

      handleSave,
    };
  },
});
</script>

<style scoped>
.area-box {
  border: 1px solid #000;
  padding: 10px;
}
</style>
