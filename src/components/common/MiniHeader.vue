<template>
  <v-toolbar density="compact" border :elevation="8" theme="dark" with-background fixed app>
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    <img class="ml-3" :src="require('@/assets/mini_small.png')" height="40" />
    <v-toolbar-title class="text-h4">미니 기여어</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>mdi-reply</v-icon>
    </v-btn>
  </v-toolbar>
  <v-navigation-drawer v-model="drawer" color="#424242">
    <v-list>
      <v-list-item
        class="mb-2"
        title="미니 기여어"
        :prepend-avatar="require('@/assets/mini_profile.png')"
      ></v-list-item>
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
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      menuItems: [
        { icon: "mdi-home", link: "/", title: "홈" },
        { icon: "mdi-food", link: "/lunch", title: "뭐 먹 지" },
        { icon: "mdi-coffee", link: "/coffee", title: "커 피 사 줘" },
      ],
    };
  },
  methods: {
    navigate(item) {
      this.$router.push(item.link);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/css/common/font.css";
$list-item-title-font-size: 60px;
div {
  font-family: "UhBeemysen";
}

.v-list-item-title {
  font-size: 1.4rem !important;
}

.v-spacer {
  flex-grow: 0 !important;
}

.v-list-item--active {
  background-color: rgba(255, 255, 255, 0.1);
  /* or any other color you prefer */
}
</style>
