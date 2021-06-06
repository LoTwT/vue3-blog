<template>
  <form @submit.prevent="handleLogin">
    <FormInput type="text" name="用户名" v-model="username" :error="usernameStatus" />
    <FormInput type="password" name="密码" v-model="password" :error="passwordStatus" />

    <div class="select">
      <select v-model="rule">
        <option value="user">用户</option>
        <option value="vistor">游客</option>
      </select>
    </div>

    <button
      type="submit"
      class="button is-primary is-pulled-right"
      :disabled="!usernameStatus.valid || !passwordStatus.valid"
    >登录</button>
  </form>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue"
import FormInput from "@/components/FormInput.vue"
import { length, required, Status, validate } from "@/utils/validators";
import { User } from "@/types";
import { useStore } from "@/store";
import { useModal } from "@/utils/useModal"

export default defineComponent({
  name: "handleLogin",
  components: { FormInput },
  setup: () => {
    const username = ref("username")
    const usernameStatus = computed<Status>(() => validate(username.value, [required(), length({ min: 5, max: 10 })]))

    const password = ref("password")
    const passwordStatus = computed<Status>(() => validate(password.value, [required(), length({ min: 5, max: 20 })]))

    const rule = ref("user")

    const store = useStore()
    const modal = useModal()

    const handleLogin = async () => {
      const user: User = {
        id: -1,
        username: username.value,
        password: password.value,
        rule: rule.value
      }

      store.createUser(user)
      modal.hideModel()
    }

    return {
      username,
      usernameStatus,

      password,
      passwordStatus,

      rule,

      handleLogin
    }
  }
})
</script>

<style scoped>
form {
  background: white;
  padding: 15px;
}
</style>
