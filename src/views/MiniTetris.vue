<template>
  <div class="container">
    <iframe src="https://soominyim.github.io/vue-tetris/" frameborder="0"></iframe>
  </div>
</template>

<script>
export default {
  name: "MiniTetris",
  components: {},
  data() {
    return {
      sampleData: "",
    };
  },
  methods: {
    handleIframeLoad() {
      const iframe = this.$el.querySelector("iframe");
      if (iframe) {
        iframe.contentWindow.document.addEventListener("keydown", this.handleKeyDown);
      }
    },
    handleKeyDown(event) {
      // 아이프레임 내부에서 keydown 이벤트를 처리하는 함수
      console.log("Key pressed inside iframe:", event.key);
    },
  },
  computed: {},
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
};
</script>

<style scoped>
iframe {
  position: absolute;
  top: 50px;
  left: 0;
  width: 100%;
  height: 94.6%;
}
</style>
