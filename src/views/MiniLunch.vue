<template>
  <div class="container"></div>
</template>
<script>
import lunch_store from "@/store/modules/lunch";

export default {
  components: {},
  data() {
    const { allFood, randomSelectedFood, menu, selectedFood } = lunch_store.state;

    return {
      // 음식
      foods: allFood.foods,
      koreanFoods: allFood.koreanFoods,
      chineseFoods: allFood.chineseFoods,
      japaneseFoods: allFood.japaneseFoods,
      westernFoods: allFood.westernFoods,
      asianFoods: allFood.asianFoods,

      // 랜덤 선택된 음식
      allChoiceFood: randomSelectedFood.allChoiceFood,
      koreanChoiceFood: randomSelectedFood.koreanChoiceFood,
      chineseChoiceFood: randomSelectedFood.chineseChoiceFood,
      japaneseChoiceFood: randomSelectedFood.japaneseChoiceFood,
      westernChoiceFood: randomSelectedFood.westernChoiceFood,
      asianChoiceFood: randomSelectedFood.asianChoiceFood,

      // 메뉴
      menuActive: 0,
      menuIdx: menu.menuIdx,
      groupedIndexes: menu.groupedIndexes,

      // 최종 뽑은 음식
      selectedFood: selectedFood.selectedFood,
      selectedCountry: selectedFood.selectedCountry,
      // 음식 종료 ---------------------------------------
    };
  },
  methods: {
    // 라디오 변경 이벤트 시 선택된 라디오 value 값 수정
    radioChange(event) {
      this.selectedCountry = event.target.value;
    },
    // 선택된 country의 랜덤 음식 뽑아버리기
    submitSelect() {
      if (this.menuActive === 0) {
        switch (this.selectedCountry) {
          case "all":
            this.selectedFood = this.allChoiceFood.food;
            break;
          case "korean":
            this.selectedFood = this.koreanChoiceFood.food;
            break;
          case "chinese":
            this.selectedFood = this.chineseChoiceFood.food;
            break;
          case "japanese":
            this.selectedFood = this.japaneseChoiceFood.food;
            break;
          case "western":
            this.selectedFood = this.westernChoiceFood.food;
            break;
          case "asian":
            this.selectedFood = this.asianChoiceFood.food;
            break;
          default:
            // 기본값 설정 또는 오류 처리
            break;
        }
      }
      // if (this.menuActive === 4) {
      //     this.menuActive = 1
      // }
      this.menuActive++;
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
    // 전체 음식 초기화
    const foods = this.foods;
    // 나라별 음식 초기화
    const koreanFoods = [];
    const chineseFoods = [];
    const japaneseFoods = [];
    const westernFoods = [];
    const asianFoods = [];

    // 나라별 음식 푸시
    for (let i = 0; i < foods.length; i++) {
      const food = foods[i];
      const country = food.country;
      const foodName = food.food;

      switch (country) {
        case "korean":
          koreanFoods.push(foodName);
          break;
        case "chinese":
          chineseFoods.push(foodName);
          break;
        case "japanese":
          japaneseFoods.push(foodName);
          break;
        case "western":
          westernFoods.push(foodName);
          break;
        case "asian":
          asianFoods.push(foodName);
          break;
        default:
          break;
      }
    }

    // foods country 별로 data()바인딩
    const countries = ["korean", "chinese", "japanese", "western", "asian"];

    countries.forEach((country) => {
      if (this[`${country}Foods`].length === 0) {
        this[`${country}Foods`] = eval(`${country}Foods`);
      }
    });

    // 랜덤 선택 메소드
    const getRandomFood = (foods) => {
      const randomFood = foods[Math.floor(Math.random() * foods.length)];
      return {
        country: randomFood.country,
        food: randomFood.food,
      };
    };
    function getChoiceFood(foods, country) {
      return getRandomFood(foods.filter((food) => food.country === country));
    }

    // 랜덤 선택 음식 변수 data() 바인딩
    const choices = ["all", "korean", "chinese", "japanese", "western", "asian"];

    choices.forEach((choice) => {
      if (this[`${choice}ChoiceFood`] === "") {
        this[`${choice}ChoiceFood`] = choice === "all" ? getRandomFood(foods) : getChoiceFood(foods, choice);
      }
    });

    // 새로운 나라 추가시 푸시 (store에 country 추가시 자동 푸시)
    const groupedIndexes = {};
    for (let i = 0; i < foods.length; i++) {
      const food = foods[i];
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
.container {
  width: 100%;
  height: 100%;
  background: black;
  background-size: cover;
}
</style>
