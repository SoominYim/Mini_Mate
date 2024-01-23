<template>
  <v-app>
    <div id="header">
      <mini-header></mini-header>
    </div>
    <div id="content">
      <v-main>
        <router-view />
        asd <br>
        asd
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
@import "@/css/common/reset.css";


#footer {
  position: absolute;
  width: 100%;
  height: 45px;
  box-sizing: border-box;
  background: #333;
  padding-top: 3.5px;
  bottom: 0;
  left: 0;
}
</style>