<template>
  <section class="container">
    <div class="columns">
      <div class="column is-3">
        <aside class="menu">
          <p class="manu-label">标签</p>
          <ul class="menu-list">
            <li>
              <span class="tag is-primary is-medium">标签</span>
            </li>
          </ul>
        </aside>
      </div>
      <div class="column is-9">
        <div class="box content">
          <article class="post">
            <h4>{{ post.title }}</h4>
            <div class="media">
              <div class="media-left">
                <p class="is-32x32">
                  <i class="fa fa-bold"></i>
                </p>
              </div>
              <div class="media-content">
                <div v-html="post.html" />
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
  <br />
  <br />
  <br />

  <router-link to="/" class="button is-rounded is-link">
    返回
    <i class="fa fa-back"></i>
  </router-link>

  <router-link :to="gotoEdit" class="button is-rounded is-link is-pulled-right">
    编辑&nbsp;
    <i class="fa fa-edit"></i>
  </router-link>
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
      gotoEdit: `/posts/${post.id}/edit`
    };
  },
});
</script>
