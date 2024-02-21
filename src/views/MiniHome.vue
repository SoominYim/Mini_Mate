<template>
  <div id="main">
    <main>
      <mini-snow
        v-show="weatherData.weather && weatherData.weather.length > 0 && weatherData.weather[0]?.main === 'Snow'"
      ></mini-snow>
      <mini-rain></mini-rain>

      <div class="weather-wrap" v-if="weatherData.main !== undefined && weatherDaily.list !== undefined">
        <div class="location-box">
          <div class="location">서울</div>
          <div class="date">{{ getDate }}</div>
        </div>
        <div class="weather-box">
          <div class="temp">
            <div>{{ weatherData.main.temp.toFixed(1) }}°</div>
            <div class="min_max">
              <span class="min">
                {{
                  weatherDaily.list
                    .filter((v) => new Date().getDate() === new Date(v.dt_txt).getDate())
                    .map((v) => v.main.temp)
                    .reduce((min, temp) => Math.min(min, temp), Infinity)
                    .toFixed(1)
                }}°</span
              >/
              <span class="max">
                {{
                  weatherDaily.list
                    .filter((v) => new Date().getDate() === new Date(v.dt_txt).getDate())
                    .map((v) => v.main.temp)
                    .reduce((max, temp) => Math.max(max, temp), -Infinity)
                    .toFixed(1)
                }}°</span
              >
            </div>
          </div>
          <!-- <div>{{ weatherData.main }}</div> -->
          <v-img
            :width="100"
            :aspect-ratio="1"
            class="mx-auto"
            cover
            :src="`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`"
          ></v-img>
          <div class="weather">{{ weatherData.weather[0].main }}</div>
        </div>

        <v-sheet class="mx-auto mt-8" elevation="3" max-width="800" theme="false" rounded>
          <v-slide-group v-model="model" class="pa-4" selected-class="bg-primary" center-active>
            <v-slide-group-item
              v-for="item in filteredWeatherList"
              :key="item.dt"
              v-slot="{ isSelected, toggle, selectedClass }"
            >
              <v-card color="grey-lighten-1" :class="['ma-4', selectedClass]" height="110" width="70" @click="toggle">
                <div class="d-flex fill-height align-center flex-column justify-center pb-3">
                  <v-scale-transition>
                    <v-img
                      :width="60"
                      :aspect-ratio="1"
                      class="mx-auto"
                      cover
                      :src="`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`"
                    ></v-img>
                    <v-icon v-if="isSelected" color="white" size="48" icon="mdi-close-circle-outline"> </v-icon>
                  </v-scale-transition>
                  <div class="text-center date-text">
                    {{ item.main.temp.toFixed(1) }}° <br />
                    {{ formatDate(item.dt_txt) }}
                  </div>
                </div>
              </v-card>
            </v-slide-group-item>
          </v-slide-group>

          <v-expand-transition>
            <v-sheet v-if="model != null" height="200">
              <div class="d-flex fill-height align-center justify-center">
                <h3 class="text-h6">
                  강수 확률: {{ filteredWeatherList[model].pop * 100 }}%
                  <br />
                  강수량:
                  {{
                    filteredWeatherList[model].snow
                      ? filteredWeatherList[model].snow["3h"]
                        ? filteredWeatherList[model].snow["3h"] + "mm"
                        : "데이터 없음"
                      : filteredWeatherList[model].rain
                      ? filteredWeatherList[model].rain["3h"]
                        ? filteredWeatherList[model].rain["3h"] + "mm"
                        : "데이터 없음"
                      : "데이터 없음"
                  }}
                  <br />
                  바람 속도: {{ filteredWeatherList[model].wind.speed }}m/s
                  <br />
                  습도: {{ filteredWeatherList[model].main.humidity }}%
                </h3>
              </div>
            </v-sheet>
          </v-expand-transition>
        </v-sheet>
      </div>
    </main>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import MiniRain from "@/components/MiniRain.vue";
import MiniSnow from "@/components/MiniSnow.vue";
export default {
  name: "MiniHome",
  components: { MiniSnow, MiniRain },
  data() {
    return {
      model: null,
    };
  },
  computed: {
    ...mapState("weatherStore", ["url_base", "months", "days", "weatherData", "weatherDaily"]),
    ...mapGetters("weatherStore", ["getDate"]),
    filteredWeatherList() {
      // 현재 시간
      const currentTime = new Date();
      // 현재 시간 이후의 데이터만 필터링하여 반환
      return this.weatherDaily.list.filter((item) => {
        const itemTime = new Date(item.dt_txt);
        return itemTime >= currentTime;
      });
    },
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
    formatDate(t) {
      const d = new Date(t);
      return `${d.getDate()}일\n${this.days[d.getDay()]}\n${d.getHours()}시`;
    },
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
  .min_max {
    font-size: 50px;
    text-shadow: 1px 2px rgba(0, 0, 0, 0.25);
  }
  .min {
    color: #2178ef;
  }
  .max {
    color: #cd3534;
  }
  .date-text {
    color: #444;
    font-size: 15px;
    font-weight: bold;
  }
  .v-sheet {
    background: rgba(255, 255, 255, 0.25);
  }
}
</style>
