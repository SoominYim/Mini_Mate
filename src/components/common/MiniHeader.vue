<template>
  <v-toolbar density="compact" border :elevation="8" theme="dark" with-background fixed app>
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    <img class="ml-3" :src="require('@/assets/mini_small.png')" height="40" />
    <v-toolbar-title class="text-h4">미니 기여어</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-snackbar :timeout="1500" variant="tonal" rounded="pill">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" @click="copyText" icon>
          <v-icon>mdi-reply</v-icon>
          <v-tooltip class="text-h4" activator="parent" location="start"><strong>공유하기</strong></v-tooltip>
        </v-btn>
      </template>
      <div class="text-center text-h4"><strong>주소가 클립보드에 복사되었습니다.</strong></div>
    </v-snackbar>
  </v-toolbar>
  <v-navigation-drawer v-model="drawer" color="#424242">
    <v-list>
      <v-list-item class="mb-2" :prepend-avatar="require('@/assets/mini_profile.png')">
        <v-list-item-title class="미니기여어"> 미니 기여어 </v-list-item-title>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item
        v-for="(item, index) in menuItems"
        :key="index"
        :prepend-icon="item.icon"
        :to="item.link"
        @click="navigate(item)"
        :class="[{ 'v-list-item--active': item.link === $route.path }]"
      >
        <v-list-item-title>
          {{ item.title }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <div class="d-flex justify-space-around">
        <v-btn
          v-for="item in aboutItems"
          :href="item.link"
          target="_blank"
          :key="item.icon"
          :icon="item.icon"
          variant="text"
        ></v-btn>
      </div>
      <div class="d-flex text-h6 justify-center">
        © {{ new Date().getFullYear() }}. S-o-o-Min . All rights reserved.
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      menuItems: [
        { icon: "mdi-home", link: "/", title: "홈" },
        { icon: "mdi-food", link: "/lunch", title: "뭐 먹 지" },
        { icon: "mdi-coffee", link: "/coffee", title: "커 피 사 줘" },
      ],
      aboutItems: [
        { icon: "mdi-github", link: "https://github.com/SoominYim" },
        { icon: "mdi-instagram", link: "https://www.instagram.com/_soo_min_/" },
        {
          icon: "mdi-facebook",
          link: "https://www.facebook.com/profile.php?id=100002681110982",
        },
        {
          icon: "mdi-alpha-t-circle-outline",
          link: "https://s-o-o-min.tistory.com/",
        },
      ],
    };
  },
  methods: {
    navigate(item) {
      this.$router.push(item.link);
    },
    copyText() {
      navigator.clipboard.writeText("https://mini-mate.vercel.app/");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/css/common/font.css";

div {
  font-family: "UhBeemysen";
}

.v-list-item-title {
  font-size: 1.7rem !important;
}
.미니기여어 {
  font-size: 2.2rem !important;
}

.v-spacer {
  flex-grow: 0 !important;
}

.v-list-item--active {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
