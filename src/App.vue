<template>
  <v-app>
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
html {
  background-color: #101010 !important;
}

body {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

#app {
  overflow: auto;
  height: 100vh;
  min-height: 100vh;
  position: relative; /* 부모의 높이 기준으로 설정 */
}

.v-application {
  min-height: 100vh;
  position: relative; /* 부모의 높이 기준으로 설정 */
}

/* 내용이 넘칠 때 스크롤바 디자인을 숨김 */
#app::-webkit-scrollbar {
  display: none;
}
</style>
