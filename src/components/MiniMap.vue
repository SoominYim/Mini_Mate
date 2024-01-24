<template>
  <div></div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      sampleData: "",
    };
  },
  setup() {},
  created() {},
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src = "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=831a204a1c68a7a9b1f64bdef2b71fc6";
      document.head.appendChild(script);
    }
  },
  unmounted() {},
  methods: {
    initMap() {
      var mapContainer = document.getElementById("map"), // 지도를 표시할 div
        mapOption = {
          center: new kakao.maps.LatLng(37.564343, 126.947613), // 지도의 중심좌표
          level: 3, // 지도의 확대 레벨
        };

      var map = new kakao.maps.Map(mapContainer, mapOption);

      var positions = [
        {
          latlng: new kakao.maps.LatLng(37.562632898194835, 126.9454282268269),
        },
        {
          latlng: new kakao.maps.LatLng(37.56195884514403, 126.94922601468826),
        },
      ];

      // 마커 생성
      positions.forEach(function (pos) {
        var maker = new kakao.map.Marker({
          position: pos.latlng,
        });
        maker.setMap(map);
      });
    },
  },
};
</script>

<style scoped></style>
