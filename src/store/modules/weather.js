const weatherStore = {
  namespaced: true, // 모듈에 네임스페이스 사용 설정
  state: {
    url_base: "https://api.openweathermap.org/data/2.5/",
    months: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
    days: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
    weatherData: {},
    weatherDaily: {},
  },
  getters: {
    getDate: (state) => {
      let d = new Date();
      let day = state.days[d.getDay()];
      let date = d.getDate();
      let month = state.months[d.getMonth()];
      let year = d.getFullYear();
      return `${year}년 ${month} ${date}일 ${day} `;
    },
  },
  mutations: {
    setDate: function (state, results) {
      state.weatherData = results;
    },
    setDaily: function (state, results) {
      state.weatherDaily = results;
    },
  },
  actions: {
    fetchData: async ({ commit, state }) => {
      let fetchUrl = `${state.url_base}weather?q=seoul&units=metric&APPID=${process.env.VUE_APP_WEATHER_API_KEY}`;

      fetch(fetchUrl)
        .then((res) => res.json())
        .then((results) => {
          // mutation 호출
          commit("setDate", results);
          // console.log("After fetching data:", state.weatherData);
        })
        .catch((error) => console.error("Error fetching weather data:", error));
    },
    // 새로운 fetchDataDaily 액션
    fetchDataDaily: async ({ commit, state }) => {
      let fetchUrl = `${state.url_base}forecast?q=seoul&interval=hourly&appid=${process.env.VUE_APP_WEATHER_API_KEY}`;
      fetch(fetchUrl)
        .then((res) => res.json())
        .then((results) => {
          // mutation 호출
          commit("setDaily", results);
          console.log("After fetching daily data:", state.weatherData);
        })
        .catch((error) => console.error("Error fetching daily weather data:", error));
    },
  },
  modules: {},
};

export default weatherStore;
