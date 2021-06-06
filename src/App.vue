<template>
  <div class="modal" :style="modalStyle">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div id="modal"></div>
    </div>
    <button class="modal-close is-large" type="button" @click="modal.hideModel"></button>
  </div>

  <Navbar />
  <section class="section">
    <div class="container">
      <router-view />
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import Navbar from "@/components/Navbar.vue";
import { useModal } from "@/utils/useModal"

export default defineComponent({
  name: "App",
  components: { Navbar },
  setup() {
    const modal = useModal()

    const modalStyle = computed(() => ({
      display: modal.visible.value ? "block" : "none"
    }))

    return {
      modal,
      modalStyle
    }
  }
});
</script>

