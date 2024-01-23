<template>
  <v-app>
    <div id="header">
      <mini-header></mini-header>
    </div>
    <div id="content">
      <v-main>
        <router-view />
      </v-main>
    </div>
    <div id="footer">
      <mini-footer></mini-footer>
    </div>
  </v-app>
</template>

<script>
import MiniFooter from './components/common/MiniFooter.vue';
import MiniHeader from './components/common/MiniHeader.vue';
export default {
  name: 'App',
  components: {
    MiniFooter,
    MiniHeader,
  }
  ,
  data: () => ({
    //
  }),
}
</script>
<style lang="scss">
@import "@/css/reset.css";


#footer {
  position: fixed;
  width: 100%;
  height: 100px;
  box-sizing: border-box;
  background: #333;
  padding: 15px 30px 30px 30px;
  bottom: 0;
  left: 0;
}
</style>