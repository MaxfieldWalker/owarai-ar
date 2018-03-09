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
            :on-tukkomi-detail-button-clicked="tukkomiDetailButton(item)">
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

  /**
   * Google Maps の DOM要素
   */
  map: any;
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
          id: 1,
          image: "images/camera-upload.png",
          rank: 0
        }
      ],
      map: undefined
    };
  },
  methods: {
    tukkomiDetailButton(tukkomi) {
      console.log(tukkomi);
      const router = this.$router;
      return function() {
        console.log(`click tukkomi: ${tukkomi.id}`);
        // 画面遷移
        router.push({
          path: `/tukkomi/${tukkomi.id}`
        });
      };
    },
    getCurrentPosition(): Promise<GeoPosition> {
      return new Promise(resolve => {
        navigator.geolocation.getCurrentPosition(
          position => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            console.log(lat + ", " + lng);
            resolve({
              latitude: lat,
              longitude: lng
            });
          },
          () => {
            console.log("取得NG");
            resolve({ latitude: 0, longitude: 0 });
          }
        );
      });
    },
    addMapPin(map: any, lat: number, lng: number, rank: number = 0) {
      // マーカーのインスタンス
      new google.maps.Marker({
        position: {
          lat: lat + Math.random() * 0.5,
          lng: lng + Math.random() * 0.5
        }, // マーカーの位置
        map // マーカーを描く地図
      });
    }
  },

  async mounted() {
    const client = new ApiClient();
    console.log("位置情報取得中");
    const currentPosition = await this.getCurrentPosition();
    console.log("API 呼び出し中");
    const response = await client.fetchList(
      currentPosition.latitude,
      currentPosition.longitude
    );
    console.log("API 呼び出し完了");
    console.log(response);

    const sorted = response.sort((a, b) => a.likes - b.likes);
    this.$data.tukkomiData = sorted.map(x => ({
      subject: x.content,
      id: x.id,
      image: `https://oguemon.com/owarai-map/img/${x.photoId}.png`,
      rank: sorted.indexOf(x) + 1
    }));

    // 現在地周辺の地図を描画する
    this.getCurrentPosition().then(result => {
      const { latitude, longitude } = result;
      // 地図の作成
      const map = new google.maps.Map(document.getElementById("google-map"), {
        zoom: 18, // 地図の倍率
        center: { lat: latitude, lng: longitude } // 中心の座標
      });
      console.log("マップ描画完了");
      this.$data.map = map;

      // ツッコミスポットのマーカーを複数配置
      for (const x of response) {
        console.log("マーカーを描画します");
        console.log(map);

        const position = new google.maps.LatLng(x.latitude, x.longitude, true);
        console.log(position.toString());
        const marker = new google.maps.Marker({
          position: position,
          map: map
        });
        // this.addMapPin(map, x.latitude, x.longitude);
      }
    });
  }
});

interface GeoPosition {
  latitude: number;
  longitude: number;
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
