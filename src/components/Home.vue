<template>
    <div>
      <app-header title="みんなのツッコミMAP">
      </app-header>
        <!-- マップ -->
        <div id="google-map"></div>
        <div class="subheader">
            <p>この辺にあるツッコミポイント</p>
        </div>
        <div>
          <tukkomi-list-item v-for="item in data"
           :subject="item.subject"
            :key="item.id"
            :rank="item.rank"
            >
          </tukkomi-list-item>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import TukkomiListItem from "./tukkomiListItem.vue";
import AppHeader from "./AppHeader.vue";
import {} from "@types/googlemaps";
import { ApiClient } from "../api/client";

export default Vue.extend({
  name: "App",
  components: {
    TukkomiListItem,
    AppHeader
  },
  data() {
    return {
      data: [
        {
          subject: "普通の家やんけ",
          id: "001",
          image: "images/dotonbori_blur.png",
          rank: 1
        },
        {
          subject: "誰やねんこれ！",
          id: "002",
          image: "images/dotonbori_blur.png",
          rank: 2
        },
        {
          subject: "笑いの殿堂やないか！",
          id: "003",
          image: "images/dotonbori_blur.png",
          rank: 3
        },
        {
          subject: "ありえへんやろ！",
          id: "004",
          image: "images/dotonbori_blur.png",
          rank: 4
        }
      ]
    };
  },
  methods: {
  },
  mounted() {
  }
});

// 地図の作成
var map;

// 現在位置の取得
let lat; // 緯度
let lng; // 経度
navigator.geolocation.getCurrentPosition(geoSuccess, geoError);

// 取得成功
async function geoSuccess(position) {
  lat = position.coords.latitude;
  lng = position.coords.longitude;
  console.log(lat + ", " + lng);
  
  //地図の作成
  map = new google.maps.Map(document.getElementById('google-map'), {
    zoom: 18, //地図の倍率
    center: {lat: lat, lng: lng} //中心の座標
  });
  //マーカーのインスタンス
  var marker = new google.maps.Marker({
    position: {lat: lat, lng: lng}, //マーカーの位置
    map: map //マーカーを描く地図
  });

  //非同期通信（前回の講義で扱いました）
  let api = new ApiClient();
  let json = await api.fetchList(lat, lng);
  for (const item of json)
  {
    console.log(item);
  }
  console.log("hello");
}
// 取得失敗(拒否)
function geoError() {
  console.log("取得NG");
}

function addMapPin (lat:number, lng:number, rank:number) {
  //マーカーのインスタンス
  var marker = new google.maps.Marker({
    position: {lat: lat, lng: lng}, //マーカーの位置
    map: map //マーカーを描く地図
  });
}
</script>

<style lang="scss" scoped>
#google-map {
  position: relative;

  // これが縦横比 (16:9)
  // 9 / 16 = 0.56
  padding-bottom: 56%;
  height: 0;
  overflow: hidden;
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100% !important;
    height: 100% !important;
  }
}

.subheader {
  background-color: orange;
  padding: 2px 0;
  text-align: center;
}

.user-avatar {
  width: 32px;
  height: 32px;
}
</style>

<style lang="scss">
// load grobal style
@import "~../_default.scss";
</style>
