<template>
  <div class="container">
    <span :style="{ fontSize: `30px` }">커피 살 사람을 뽑아주세요</span>
    <div
      class="input-box"
      :style="{ height: '50px', display: 'flex', justifyContent: `center`, alignItems: 'center', gap: `20px` }"
    >
      <input v-if="choice === ''" type="text" ref="peopleInput" @keydown.enter="addPeople" />
      <button v-if="choice === ''" @click="addPeople" :style="{ fontSize: `24px` }">추가</button>
    </div>
    <div v-if="choice === ''" ref="peopleBox" class="people-box">
      <p v-if="people.length <= 0" :style="{ fontSize: `30px`, display: 'block', margin: `0 auto` }">
        {{ "인원을 추가해주세요" }}
      </p>
      <div class="people_item" v-for="(p, i) in people" :key="i">
        <span :style="{ fontSize: `20px` }">{{ p }}</span>
        <div>
          <button :style="{ fontSize: `20px` }" @click="delPeople(i)">X</button>
        </div>
      </div>
    </div>
    <div v-else class="people-box" :style="{ height: `${boxHeight}px`, display: `flex`, justifyContent: `center` }">
      <span :style="{ fontSize: `30px`, alignItems: 'center' }">{{ choice }}</span>
    </div>
    <button v-if="choice === ''" @click="choicePeople">커피 살 사람?</button>
    <button :disabled="isButtonDisabled" v-else @click="rePeople">{{ reTitle }}</button>

    <p :style="{ fontSize: '24px', color: `red` }" v-if="isPeopleError">2명 이상이어야 합니다</p>
    <p :style="{ fontSize: '24px', color: `red` }" v-if="isDuplicationError">
      중복 이름은 구분지어 주세요 <br />(ex: 홍길동1,홍길동2)
    </p>
  </div>
</template>

<script>
export default {
  name: "MiniCoffee",
  components: {},
  data() {
    return {
      people: [],
      choice: "",
      reTitle: "커피 살 사람?",
      isButtonDisabled: false,
      boxHeight: 0,
      isPeopleError: false,
      isDuplicationError: false,
    };
  },
  computed: {},
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    addPeople() {
      if (this.$refs.peopleInput.value.length < 1) return;
      if (this.people.includes(this.$refs.peopleInput.value)) {
        this.isDuplicationError = true;
        return;
      } else {
        this.isDuplicationError = false;
      }

      if (this.$refs.peopleInput.value.length > 0) this.people.push(this.$refs.peopleInput.value.replaceAll(" ", ""));
      if (this.isPeopleError && this.people.length === 2) this.isPeopleError = false;
      this.$refs.peopleInput.value = "";
    },
    delPeople(i) {
      this.people.splice(i, 1);
    },
    choicePeople() {
      if (this.people.length < 2) return (this.isPeopleError = true);

      this.choice = "뽑는중...";
      this.isButtonDisabled = true;

      setTimeout(() => {
        this.choice = this.people[Math.floor(Math.random() * this.people.length)];
        this.reTitle = "다시 뽑기";
        this.isButtonDisabled = false;
      }, 2000);
      this.boxHeight = this.$refs.peopleBox.getBoundingClientRect().height;
    },
    rePeople() {
      this.choice = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  padding: 100px 0;
  gap: 30px;
  & > * {
    width: 50%;
    min-width: 350px;
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
  }
  .input-box {
    input {
      border: 3px #41b883 solid;
      border-radius: 5px;
      padding: 10px;
      font-size: 16px;
      outline: none;
    }
  }
  .people-box {
    padding: 20px 10px;
    height: auto;
    border: 3px #888 solid;
    border-radius: 10px;
    & > * {
      padding: 12px;
      display: flex;
      font-size: 15px;
      & > * {
        width: 50%;
      }
    }
    .people_item {
      position: relative;
      &::before {
        content: "";
        width: 80%;
        height: 1px;
        position: absolute;
        bottom: 0;
        left: calc(50% - 80% / 2);
        background-color: #aaa;
      }
    }
  }
  & > button {
    border: 3px #333 solid;
    background-color: #41b883;
    border-radius: 10px;
    font-size: 20px;
    margin: 0 auto;
    width: 50%;
    height: 100px;
    &:disabled {
      background-color: #888;
      pointer-events: none;
    }
  }
}
</style>
