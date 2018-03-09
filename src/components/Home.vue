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
  methods: {},
  mounted() {}
});

interface GeoPosition {
  latitude: number;
  longitude: number;
}

const currentPosition = getCurrentPosition().then(result => {
  const { latitude, longitude } = result;
  // 地図の作成
  const map = new google.maps.Map(document.getElementById("google-map"), {
    zoom: 18, // 地図の倍率
    center: { lat: latitude, lng: longitude } // 中心の座標
  });
  // マーカーのインスタンス
  const marker = new google.maps.Marker({
    position: { lat: latitude, lng: longitude }, // マーカーの位置
    map: map // マーカーを描く地図
  });
});

/**
 * 現在地を取得します
 */
function getCurrentPosition(): Promise<GeoPosition> {
  return new Promise(resolve => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        resolve({
          latitude: lat,
          longitude: lng
        });
        console.log(lat + ", " + lng);
      },
      () => {
        resolve({ latitude: 0, longitude: 0 });
        console.log("取得NG");
      }
    );
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
