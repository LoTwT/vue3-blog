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
                <router-link to="/register" class="button is-small">
                  <span class="icon">
                    <i class="fa fa-user-plus"></i>
                  </span>
                  <span>注册</span>
                </router-link>
              </div>

              <div class="control">
                <router-link to="/register" class="button is-small is-info is-outlined">
                  <span class="icon">
                    <i class="fa fa-user"></i>
                  </span>
                  <span>登录</span>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Navbar",
  setup() { },
});
</script>
