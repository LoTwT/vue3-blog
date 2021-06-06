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
            <div class="field is-grouped">
              <div class="control">
                <button type="button" class="button is-small" @click="modal.showModal">
                  <span class="icon">
                    <i class="fa fa-user-plus"></i>
                  </span>
                  <span>注册</span>
                </button>
              </div>

              <div class="control">
                <button type="button" class="button is-small is-info is-outlined">
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
      注册
    </teleport>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useModal } from "@/utils/useModal"

export default defineComponent({
  name: "Navbar",
  setup() {
    return {
      modal: useModal()
    }
  },
});
</script>
