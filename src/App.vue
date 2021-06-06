<template>
  <div class="modal" :style="modalStyle">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div id="modal"></div>
    </div>
    <button class="modal-close is-large" type="button" @click="modal.hideModel"></button>
  </div>

  <FormInput type="text" name="用户名" v-model="username" :error="usernameStatus" />

  <Navbar />
  <section class="section">
    <div class="container">
      <router-view />
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import Navbar from "@/components/Navbar.vue";
import { useModal } from "@/utils/useModal"
import FormInput from "@/components/FormInput.vue"
import { length, required, Status, validate } from "./utils/validators";

export default defineComponent({
  name: "App",
  components: { Navbar, FormInput },
  setup() {
    const modal = useModal()

    const username = ref("username")

    const usernameStatus = computed<Status>(() => validate(username.value, [required(), length({ min: 5, max: 10 })]))

    const modalStyle = computed(() => ({
      display: modal.visible.value ? "block" : "none"
    }))

    return {
      modal,
      modalStyle,
      username,
      usernameStatus
    }
  }
});
</script>

