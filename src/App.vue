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
.v-app {
  position: relative;
}
</style>
