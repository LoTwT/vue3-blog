<template>
  <nav class="navbar is-dark topNav">
    <div class="container">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item">
          <i class="fa fa-home"></i>
        </router-link>
      </div>

      <div class="navbar-menu" id="topNav">
        <div class="navbar-start">
          <router-link to="/" class="navbar-item">博客</router-link>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="field is-grouped" v-if="auth">
              <div class="control">
                <button type="button" class="button is-small">
                  <span class="icon">
                    <i class="fa fa-user-plus"></i>
                  </span>
                  <span>Admin</span>
                </button>
              </div>

              <div class="control">
                <button type="button" class="button is-small is-info is-outlined" @click="logout">
                  <span class="icon">
                    <i class="fa fa-user"></i>
                  </span>
                  <span>退出</span>
                </button>
              </div>
            </div>
            <div class="field is-grouped" v-else>
              <div class="control">
                <button type="button" class="button is-small" @click="register">
                  <span class="icon">
                    <i class="fa fa-user-plus"></i>
                  </span>
                  <span>注册</span>
                </button>
              </div>

              <div class="control">
                <button type="button" class="button is-small is-info is-outlined" @click="login">
                  <span class="icon">
                    <i class="fa fa-user"></i>
                  </span>
                  <span>登录</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <teleport to="#modal" v-if="modal.visible">
      <!-- 插入组件 / 动态组件 -->
      <component :is="component" />
    </teleport>
  </nav>
</template>

<script lang="ts">
import { computed, defineComponent, shallowRef } from "vue";
import { useModal } from "@/utils/useModal"
import Register from "@/views/Register.vue"
import Login from "@/views/Login.vue"
import { useStore } from "@/store";

export default defineComponent({
  name: "Navbar",
  components: {},
  setup() {
    const component = shallowRef()
    const modal = useModal()
    const store = useStore()

    const auth = computed(() => store.getState().loginUsers.currentUserId)

    const register = () => {
      component.value = Register
      modal.showModal()
    }
    const login = () => {
      component.value = Login
      modal.showModal()
    }

    const logout = async () => {
      await store.logout()
    }

    return {
      modal,
      component,
      auth,
      register,
      login,
      logout,
    }
  },
});
</script>
