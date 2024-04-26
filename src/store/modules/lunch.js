import { createStore } from "vuex";
import foods from "@/data/foods";

const lunchStore = createStore({
  state() {
    return {
      // 음식
      allFood: {
        foods: foods,
        koreanFoods: [],
        chineseFoods: [],
        japaneseFoods: [],
        westernFoods: [],
        asianFoods: [],
      },
      // 메뉴
      menu: {
        menuIdx: "",
        groupedIndexes: {},
      },
      // 최종 뽑은 음식
      selectedFood: {
        selectedFood: "",
        selectedCountry: "all",
      },
    };
  },
  mutations: {},
  actions: {},
  getters: {},
});

export default lunchStore;
