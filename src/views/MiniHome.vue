<template>
  <div id="main">
    <main>
      <div class="weather-wrap" v-if="weatherData.main !== undefined && weatherDaily.list !== undefined">
        <div class="location-box">
          <div class="location">서울</div>
          <div class="date">{{ getDate }}</div>
        </div>
        <div class="weather-box">
          <div class="temp">{{ weatherData.main.temp.toFixed(1) }}°</div>
          <div>{{ weatherData.main }}</div>
          <v-img
            :width="100"
            :aspect-ratio="1"
            class="mx-auto"
            cover
            :src="`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`"
          ></v-img>
          <div class="weather">{{ weatherData.weather[0].main }}</div>
        </div>

        <v-sheet class="mx-auto" elevation="8" max-width="800">
          <v-slide-group v-model="model" class="pa-4" selected-class="bg-primary" show-arrows center-active>
            <v-slide-group-item
              v-for="item in weatherDaily.list"
              :key="item.dt"
              v-slot="{ isSelected, toggle, selectedClass }"
            >
              <v-card color="grey-lighten-1" :class="['ma-4', selectedClass]" height="100" width="50" @click="toggle">
                <div class="d-flex fill-height align-center flex-column justify-center">
                  <v-scale-transition>
                    <v-img
                      :width="50"
                      :aspect-ratio="1"
                      class="mx-auto"
                      cover
                      :src="`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`"
                    ></v-img>
                    <v-icon v-if="isSelected" color="white" size="48" icon="mdi-close-circle-outline"> </v-icon>
                  </v-scale-transition>
                  <div class="weather-text">{{ item.dt_txt }}</div>
                </div>
              </v-card>
            </v-slide-group-item>
          </v-slide-group>

          <v-expand-transition>
            <v-sheet v-if="model != null" height="200">
              <div class="d-flex fill-height align-center justify-center">
                <h3 class="text-h6">Selected {{ model }}</h3>
              </div>
            </v-sheet>
          </v-expand-transition>
        </v-sheet>

        <div class="daily-forecast d-flex flex-row justify-center">
          <div v-for="item in weatherDaily.list" :key="item.dt">
            <v-img
              :width="50"
              :aspect-ratio="1"
              class="mx-auto"
              cover
              :src="`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`"
            ></v-img>
            {{ item }}
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "MiniHome",
  components: {},
  data() {
    return {
      model: null,
    };
  },
  computed: {
    ...mapState("weatherStore", ["url_base", "months", "days", "weatherData", "weatherDaily"]),
    ...mapGetters("weatherStore", ["getDate"]),
  },
  setup() {},
  created() {
    this.fetchData(); // 현재 날씨 데이터 가져오기
    this.fetchDataDaily(); // 일일 날씨 예보 데이터 가져오기
  },
  mounted() {},
  unmounted() {},
  methods: {
    ...mapActions("weatherStore", ["fetchData", "fetchDataDaily"]),
  },
};
</script>
<style scoped>
#main {
  height: 100%;
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
  .weather-text {
  }
}
</style>
