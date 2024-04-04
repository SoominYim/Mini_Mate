<template>
  <div class="container">
    <div class="form">
      <div class="result_box">
        <span>{{ displayText }}</span>
      </div>
      <!-- 전체 메뉴 -->
      <div class="radio-box-wrap">
        <div class="radio-box">
          <input
            type="radio"
            class="radio-btn"
            name="country_menu"
            id="all"
            value="all"
            @click="radioChange($event)"
            checked="checked"
          />
          <label class="radio-label" for="all">전체</label>
          <div class="spinner"></div>
        </div>
        <!-- 나라별 메뉴 -->
        <div class="radio-box" v-for="(country_menu, i) in Object.keys(groupedIndexes)" :key="i">
          <input
            type="radio"
            class="radio-btn"
            name="country_menu"
            :id="country_menu"
            @click="radioChange($event)"
            :value="country_menu"
          />
          <label class="radio-label" :for="country_menu">
            <span>
              {{
                country_menu === "korean"
                  ? "한식"
                  : country_menu === "chinese"
                  ? "중식"
                  : country_menu === "japanese"
                  ? "일식"
                  : country_menu === "western"
                  ? "양식"
                  : country_menu === "asian"
                  ? "아시안"
                  : "없는 나라"
              }}
            </span>
          </label>
        </div>
      </div>
      <span class="marker"></span>
      <!-- 결과값 -->
      <button :disabled="isButtonDisabled" type="button" @click="submitSelect()">{{ btnTitle }}</button>
    </div>
  </div>
</template>
<script>
import lunch_store from "@/store/modules/lunch";

export default {
  components: {},
  data() {
    const { allFood, menu, selectedFood } = lunch_store.state;

    return {
      // 음식
      foods: allFood.foods,
      selectedFood: selectedFood.selectedFood,
      selectedCountry: selectedFood.selectedCountry,
      groupedIndexes: menu.groupedIndexes,

      displayText: "종류를 선택하세요",
      isButtonDisabled: false,
      btnTitle: "뭐 먹지?",
    };
  },
  methods: {
    // 라디오 변경 이벤트 시 선택된 라디오 value 값 수정
    radioChange(event) {
      this.selectedCountry = event.target.value;
    },
    submitSelect() {
      const getRandomFood = (foods) => foods[Math.floor(Math.random() * foods.length)];

      const choices = ["all", "korean", "chinese", "japanese", "western", "asian"];
      choices.forEach((choice) => {
        this[`${choice}Foods`] = [];
        if (choice !== "all")
          this[`${choice}ChoiceFood`] = getRandomFood(this.foods.filter((food) => food.country === choice));
        else this.allChoiceFood = getRandomFood(this.foods);
      });

      this.selectedFood =
        this.selectedCountry === "all" ? this.allChoiceFood.food : this[`${this.selectedCountry}ChoiceFood`].food;

      this.displayText = "뽑는중...";
      this.btnTitle = "뽑는중...";
      this.isButtonDisabled = true;
      setTimeout(() => {
        this.displayText = this.selectedFood;
        this.isButtonDisabled = false;
        this.btnTitle = "다시 뽑기";
      }, 2000);
    },
  },
  created() {},
  computed: {
    // 라디오 체크 되어있나 확인
    selectActive() {
      return this.selectedCountry !== "";
    },
  },
  mounted() {
    // 새로운 나라 추가시 푸시 (store에 country 추가시 자동 푸시)
    const groupedIndexes = {};
    for (let i = 0; i < this.foods.length; i++) {
      const food = this.foods[i];
      const country = food.country;
      groupedIndexes[country] = [];
      groupedIndexes[country].push(i);
    }
    // 각 country 별 index 및 object data() 바인딩
    const menuIdx = Object.keys({ ...groupedIndexes }).length;
    this.menuIdx = menuIdx;
    this.groupedIndexes = { ...groupedIndexes };
  },
};
</script>
<style lang="scss" scoped>
@import url("../css/lunch.scss");
</style>
