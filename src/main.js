import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import { createMetaManager, plugin as metaPlugin } from "vue-meta";

loadFonts();

const metaManager = createMetaManager();

createApp(App).use(router).use(store).use(metaManager).use(metaPlugin).use(vuetify).mount("#app");
