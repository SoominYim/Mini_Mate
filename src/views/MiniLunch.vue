<template lang="">
  <div class="swappy-radios" role="radiogroup" aria-labelledby="swappy-radios-label">
    <h3 id="swappy-radios-label">Select an option</h3>
    <label v-for="(option, index) in options" :key="index" @click="handleChange(option)">
      <input type="radio" v-model="selectedOption" :value="option" />
      <span class="radio" :class="{ active: selectedOption === option }"></span>
      <span>{{ option.label }}</span>
    </label>
  </div>
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

      options: [
        { label: "First option", value: 1 },
        { label: "Second option", value: 2 },
        { label: "Third option", value: 3 },
        { label: "Fourth option", value: 4 },
        { label: "Last option", value: 5 },
      ],
      selectedOption: null,
      currentValue: 1,
      timeout: 0.75,
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
    handleChange(option) {
      if (this.selectedOption !== option) {
        this.temporarilyDisable();
        this.animateRadio(option.value);
      }
    },
    animateRadio(nextValue) {
      const dirDown = nextValue > this.currentValue;
      // const yDiff = Math.abs((nextValue - this.currentValue) * this.indicativeDistance);
      const othersToMove = this.range(
        Math.min(this.currentValue, nextValue),
        Math.max(this.currentValue, nextValue),
        dirDown
      );
      let othersCss = "";

      othersToMove.forEach((option) => {
        const staggerDelay = othersToMove.length > 1 ? (0.1 / othersToMove.length) * option : 0;
        othersCss += `
          [data-index="${option}"] .radio {
            animation: moveOthers ${this.timeout - staggerDelay}s ${staggerDelay}s;
          }
        `;
      });

      const css = `
        ${othersCss}
        [data-index="${this.currentValue}"] .radio { 
          animation: moveIt ${this.timeout}s; 
        }
      `;
      this.appendStyles(css);
      this.currentValue = nextValue;
    },
    appendStyles(css) {
      const head = document.head;
      const style = document.createElement("style");
      style.type = "text/css";
      style.id = "swappy-radio-styles";
      style.appendChild(document.createTextNode(css));
      head.appendChild(style);
    },
    range(start, end, dirDown) {
      let extra = 1;
      if (dirDown) {
        extra = 0;
      }
      return [...Array(end - start).keys()].map((v) => start + v + extra);
    },
    temporarilyDisable() {
      if (this.$refs.radioInputs) {
        this.$refs.radioInputs.forEach((item) => {
          item.setAttribute("disabled", true);
          setTimeout(() => {
            item.removeAttribute("disabled");
          }, this.timeout * 1000);
        });
      }
    },
  },
  created() {},
  computed: {
    // 라디오 체크 되어있나 확인
    selectActive() {
      return this.selectedCountry !== "";
    },
    indicativeDistance() {
      const firstRadioY = this.$refs.radioLabels[0].getBoundingClientRect().y;
      const secondRadioY = this.$refs.radioLabels[1].getBoundingClientRect().y;
      return Math.abs(secondRadioY - firstRadioY);
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
<style lang="scss">
h3 {
  font-size: 2.5rem;
  font-weight: bold;
}

.swappy-radios {
  label {
    display: block;
    position: relative;
    padding-left: 4rem;
    margin-bottom: 1.5rem;
    cursor: pointer;
    font-size: 2rem;
    user-select: none;
    color: #555;
    &:hover .radio {
      opacity: 0.8;
    }
  }
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  .radio {
    position: absolute;
    top: 0;
    left: 0;
    height: 2.5rem;
    width: 2.5rem;
    background: #c9ded6;
    border-radius: 50%;
    &::after {
      display: block;
      content: "";
      position: absolute;
      opacity: 0;
      top: 0.5rem;
      left: 0.5rem;
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;
      background: #fff;
    }
  }
  .radio.active {
    background-color: #0ac07d;
    &::after {
      opacity: 1;
    }
  }
}
</style>
