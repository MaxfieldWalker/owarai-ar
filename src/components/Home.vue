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
          <tukkomi-list-item v-for="item in tukkomiData"
           :subject="item.subject"
            :key="item.id"
            :rank="item.rank"
            :image="item.image"
            :on-tukkomi-detail-button-clicked="tukkomiDetailButton(item.id)">
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

interface IData {
  tukkomiData: Array<{
    subject: string;
    id: number;
    image: string;
    rank: number;
  }>;
}

export default Vue.extend({
  name: "App",
  components: {
    TukkomiListItem,
    AppHeader
  },
  data(): IData {
    return {
      tukkomiData: [
        {
          subject: "ダミーツッコミ",
          id: 999,
          image: "images/camera-upload.png",
          rank: 0
        }
      ]
    };
  },
  methods: {
    tukkomiDetailButton(tukkomiId: number) {
      return function() {
        console.log(`click tukkomi: ${tukkomiId}`);
      };
    }
  },
  async mounted() {
    const client = new ApiClient();
    const currentPosition = await getCurrentPosition();
    console.log("API 呼び出し中");
    const response = await client.fetchList(
      currentPosition.latitude,
      currentPosition.longitude
    );
    console.log("API 呼び出し完了");
    console.log(response);

    this.$data.tukkomiData = response
      .sort((a, b) => a.likes - b.likes)
      .map(x => ({
        subject: x.content,
        id: x.tukkomi_id,
        image: `https://oguemon.com/owarai/img/${x.photoId}.png`,
        rank: 1
      }));
  }
});

interface GeoPosition {
  latitude: number;
  longitude: number;
}

// 現在地周辺の地図を描画する
getCurrentPosition().then(result => {
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
