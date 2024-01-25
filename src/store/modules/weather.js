const weatherStore = {
  namespaced: true, // 모듈에 네임스페이스 사용 설정
  state: {
    url_base: "https://api.openweathermap.org/data/2.5/",
    months: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
    days: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
};

export default weatherStore;
