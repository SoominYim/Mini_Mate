<template>
  <div id="main">
    <main>
      <div class="weather-wrap" v-if="typeof weather.main != 'undefined'">
        <div class="location-box">
          <div class="location">서울</div>
          <div class="date">{{ getDate }}</div>
        </div>
        <div class="weather-box">
          <div class="temp">{{ weather.main.temp.toFixed(1) }}°</div>
          <v-img
            :width="100"
            :aspect-ratio="1"
            class="mx-auto"
            cover
            :src="`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`"
          ></v-img>
          <div class="weather">{{ weather.weather[0].main }}</div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "MiniHome",
  components: {},
  data() {
    return {
      weather: {},
    };
  },
  computed: {
    ...mapState("weatherStore", ["url_base", "months", "days"]),
    ...mapGetters("weatherStore", "getDate"),
  },
  setup() {},
  created() {},
  mounted() {
    let fetchUrl = `${this.url_base}weather?q=seoul&units=metric&APPID=${process.env.VUE_APP_WEATHER_API_KEY}`;
    fetch(fetchUrl)
      .then((res) => {
        return res.json();
      })
      .then((results) => {
        return this.setResult(results);
      });
  },
  unmounted() {},
  methods: {
    setResult: function (results) {
      this.weather = results;
    },
  },
};
</script>
<style scoped>
#main {
  height: 100%;
  background-image: url("../assets/cold-bg.jpg");
  background-size: cover;
  background-position: bottom;
  transition: 0.4s;
  font-family: "montserrat", sans-serif;
  main {
    height: 100%;
    padding: 25px;
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.75));
  }
  .search-box {
    width: 100%;
    margin-bottom: 30px;
  }
  .search-box .search-bar {
    display: block;
    width: 100%;
    padding: 15px;

    color: #313131;
    font-size: 20px;
    appearance: none;
    border: none;
    outline: none;
    background: none;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
    background-color: rgba(255, 255, 255, 0.8);
    border: rgba(0, 0, 0, 0);
    transition: 0.4s;
    border-radius: 0px 16px 0px 16px;
  }
  .search-box .search-bar:focus {
    box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 16px 0px 16px 0px;
  }
  .location-box .location {
    color: #fff;
    font-size: 32px;
    font-weight: 500;
    text-align: center;
    text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
  }
  .location-box .date {
    color: #fff;
    font-size: 20px;
    font-weight: 300;
    font-style: italic;
    text-align: center;
  }
  .weather-box {
    text-align: center;
  }
  .weather-box .temp {
    display: inline-block;
    padding: 10px 25px;
    color: #fff;
    font-size: 102px;
    font-weight: 900;
    text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
    background-color: rgba(255, 255, 255, 0.25);
    border-radius: 16px;
    margin: 30px 0px;
    box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  }
  .weather-box .weather {
    color: #fff;
    font-size: 48px;
    font-weight: 700;
    font-style: italic;
    text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  }
}
</style>
