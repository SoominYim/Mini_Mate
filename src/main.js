import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import { createMetaManager, defaultConfig, plugin as metaPlugin } from "vue-meta";

loadFonts();

const metaManager = createMetaManager(false, {
  ...defaultConfig,
  meta: { tag: "meta", nameless: true },
});

createApp(App).use(router).use(store).use(metaManager).use(metaPlugin).use(vuetify).mount("#app");
