<template>
  <metainfo />
  <v-app>
    <div id="header">
      <mini-header></mini-header>
    </div>
    <v-main :style="{ backgroundColor: $route.path === '/pdf' ? '#ccc' : 'inherit' }">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import MiniHeader from "./components/common/MiniHeader.vue";
import { useMeta } from "vue-meta";

export default {
  name: "App",
  components: {
    MiniHeader,
  },
  data() {
    return {};
  },
  setup() {
    useMeta({
      title: "미니기여어",
      meta: [
        {
          vmid: "description",
          name: "description",
          content: "미니기여어는 다양한 도구를 제공합니다. 점심뽑기, 커피내기 등을 편리하게 이용할 수 있습니다.",
        },
        { vmid: "keywords", name: "keywords", content: "tools, 점심뽑기, 커피내기" },
        { vmid: "og:type", name: "og:type", content: "website" },
        { vmid: "og:title", name: "og:title", content: "미니기여어" },
        {
          vmid: "og:description",
          name: "og:description",
          content: "미니기여어는 다양한 도구를 제공합니다. 점심뽑기, 커피내기 등을 편리하게 이용할 수 있습니다.",
        },
        { vmid: "og:url", name: "og:url", content: "https://mini-mate.vercel.app/" },
        { vmid: "robots", name: "robots", content: "All" },
        { vmid: "language", name: "language", content: "ko-KR" },
        { vmid: "og:locale", name: "og:locale", content: "ko_KR" },
        { vmid: "author", name: "author", content: "수빡이" },
        { vmid: "copyright", name: "copyright", content: `Copyright © ${new Date().getFullYear()} 수빡이` },
      ],
    });
  },
};
</script>

<style lang="scss">
@import "@/css/common/reset.css";

/* 추가한 스타일 */
html {
  background-color: #424242 !important;
}

body {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

#app {
  overflow: auto;
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
