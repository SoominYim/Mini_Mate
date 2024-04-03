<template>
  <div class="container">
    <span>인원을 추가해주세요</span>
    <div class="input-box">
      <input type="text" ref="peopleInput" :style="{ background: 'red' }" @keydown.enter="addPeople" />
      <button @click="addPeople">추가</button>
    </div>
    <div v-for="(p, i) in people" :key="i">{{ p }}</div>
  </div>
</template>

<script>
export default {
  name: "MiniCoffee",
  components: {},
  data() {
    return {
      people: [213, 123, 3435, 54624, 234],
    };
  },
  computed: {},
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    addPeople() {
      this.people.push(this.$refs.peopleInput.value);
      this.$refs.peopleInput.value = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
}
</style>
