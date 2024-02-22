<template>
  <v-app class="h-100">
    <div id="header">
      <mini-header></mini-header>
    </div>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import MiniHeader from "./components/common/MiniHeader.vue";

export default {
  name: "App",
  components: {
    MiniHeader,
  },
  data: () => ({
    //
  }),
};
</script>

<style lang="scss">
@import "@/css/common/reset.css";

/* 추가한 스타일 */
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

#app {
  height: 100%;
}

.v-application {
  height: 100%;
}
</style>
