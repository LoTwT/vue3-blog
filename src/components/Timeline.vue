<template>
  <nav class="is-primary panel">
    <p class="panel-tabs">
      <a
        @click="changePeriod(period)"
        :class="[selectedPeriod === period ? 'is-active' : '']"
        data-test="period"
        v-for="(period, index) in periods"
        :key="index"
        >{{ period }}</a
      >
    </p>

    <TimelinePost
      v-for="showPost in showPosts"
      :key="showPost.id"
      :showPost="showPost"
    />
  </nav>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { Period, MockPost } from "@/types/index";
import { todayPost, thisWeekPost, thisMonthPost } from "@/mock";
import moment from "moment";
import TimelinePost from "./TimelinePost.vue";

export default defineComponent({
  name: "Timeline",
  components: { TimelinePost },
  setup() {
    const periods: Period[] = ["今天", "本周", "本月"];
    const selectedPeriod = ref<Period>("今天");

    // tabs 切换
    const changePeriod = (period: Period) => {
      selectedPeriod.value = period;
    };

    const postData: MockPost[] = [todayPost, thisWeekPost, thisMonthPost];

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
