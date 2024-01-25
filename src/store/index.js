import { createStore } from "vuex";
import weatherStore from "@/store/modules/weather";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    weatherStore: weatherStore,
  },
});
