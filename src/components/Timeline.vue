<template>
  <nav class="navbar is-white">
    <div class="container">
      <div class="navbar-menu">
        <div class="navbar-start">
          <a
            class="navbar-item"
            @click="changePeriod(period)"
            :class="[selectedPeriod === period ? 'is-active' : '']"
            data-test="period"
            v-for="(period, index) in periods"
            :key="index"
          >{{ period }}</a>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <router-link class="button is-primary is-alt" to="/posts/new">添加博客</router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <TimelinePost v-for="showPost in showPosts" :key="showPost.id" :showPost="showPost" />
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { Period, Post } from "@/types/index";
// import { todayPost, thisWeekPost, thisMonthPost } from "@/mock";
import moment from "moment";
import TimelinePost from "./TimelinePost.vue";
import { useStore } from "@/store/index";

// const delayLoad = (ms: number) => new Promise((res) => setTimeout(res, ms));

export default defineComponent({
  name: "Timeline",
  components: { TimelinePost },
  async setup() {
    const periods: Period[] = ["今天", "本周", "本月"];
    const selectedPeriod = ref<Period>("今天");

    // tabs 切换
    const changePeriod = (period: Period) => {
      selectedPeriod.value = period;
    };

    const store = useStore();

    if (!store.getState().posts.isLoaded) {
      await store.fetchPosts();
    }

    const postData = store
      .getState()
      .posts.ids.reduce<Post[]>((arr: Post[], id: string) => {
        const post = store.getState().posts.all[id];
        return arr.concat(post);
      }, []);

    // const postData: Post[] = [todayPost, thisWeekPost, thisMonthPost];

    // await delayLoad(2000);

    const showPosts = computed(() =>
      postData.filter((post) => {
        if (
          selectedPeriod.value === "今天" &&
          post.created.isAfter(moment().subtract(1, "day"))
        )
          return true;
        if (
          selectedPeriod.value === "本周" &&
          post.created.isAfter(moment().subtract(1, "week"))
        )
          return true;
        if (
          selectedPeriod.value === "本月" &&
          post.created.isAfter(moment().subtract(1, "month"))
        )
          return true;
        return false;
      })
    );

    return {
      periods,
      selectedPeriod,
      changePeriod,
      showPosts,
    };
  },
});
</script>
