<template>
  <form @submit.prevent="handleRegister">
    <FormInput type="text" name="用户名" v-model="username" :error="usernameStatus" />
    <FormInput type="text" name="邮箱" v-model="email" :error="emailStatus" />
    <FormInput type="password" name="密码" v-model="password" :error="passwordStatus" />
    <FormInput type="password" name="确认密码" v-model="password2" :error="password2Status" />

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
    >注册</button>
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
  name: "Register",
  components: { FormInput },
  setup: () => {
    const username = ref("username")
    const usernameStatus = computed<Status>(() => validate(username.value, [required(), length({ min: 5, max: 10 })]))

    const email = ref("email")
    const emailStatus = computed<Status>(() => validate(email.value, [required(), length({ min: 5, max: 40 })]))

    const password = ref("password")
    const passwordStatus = computed<Status>(() => validate(password.value, [required(), length({ min: 5, max: 20 })]))

    const password2 = ref("username")
    const password2Status = computed<Status>(() => validate(password2.value, [required(), length({ min: 5, max: 20 })]))

    const rule = ref("user")

    const store = useStore()
    const modal = useModal()

    const handleRegister = async () => {
      if (password.value !== password2.value) {
        return
      }

      const user: User = {
        id: -1,
        username: username.value,
        password: password.value,
        email: email.value,
        rule: rule.value
      }

      store.createUser(user)
      modal.hideModel()
    }

    return {
      username,
      usernameStatus,

      email,
      emailStatus,

      password,
      passwordStatus,

      password2,
      password2Status,

      rule,

      handleRegister
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
