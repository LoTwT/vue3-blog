<template>
  <nav class="is-primary panel">
    <p class="panel-tabs">
      <a
        @click="changePeriod(period)"
        :class="[selectedPeriod === period ? 'is-active' : '']"
        data-test="period"
        v-for="(period, index) in periods"
        :key="index"
      >{{ period }}</a>
    </p>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Period } from "@/types/index";

export default defineComponent({
  name: "Timeline",
  setup() {
    const periods: Period[] = ["今天", "本周", "本月"];
    const selectedPeriod = ref<Period>("今天")
    const changePeriod = (period: Period) => {
      selectedPeriod.value = period
    }

    return {
      periods,
      selectedPeriod,
      changePeriod
    };
  },
});
</script>
