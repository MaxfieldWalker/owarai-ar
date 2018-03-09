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

// 現在位置の取得
let lat; // 緯度
let lng; // 経度
navigator.geolocation.getCurrentPosition(geoSuccess, geoError);

// 取得成功
function geoSuccess(position) {
  lat = position.coords.latitude;
  lng = position.coords.longitude;
  console.log(lat + ", " + lng);
  
  //地図の作成
  var map = new google.maps.Map(document.getElementById('google-map'), {
    zoom: 18, //地図の倍率
    center: {lat: lat, lng: lng} //中心の座標
  });
  //マーカーのインスタンス
  var marker = new google.maps.Marker({
    position: {lat: lat, lng: lng}, //マーカーの位置
    map: map //マーカーを描く地図
  });
}
// 取得失敗(拒否)
function geoError() {
  console.log("取得NG");
}

//JSONデータをPOSTメソッドで送れる文字列に変換
function encodeURLParm(data): string
{
    let params: string[] = [];
    for(var name in data){
        let value = data[name];
        let param: string = encodeURIComponent(name) + '=' + encodeURIComponent(value);
        params.push(param);
    }
    return params.join('&').replace(/%20/g, '+');
}

//非同期通信（前回の講義で扱いました）
let res_data; // 返ってきたJSONデータを格納する

let api = new ApiClient();
let json = api.fetchList();
console.log(json);
/*
let data = {
  "req": "fetch_list",
  "lat": lat,
  "long": lng
};
const url = 'http://localhost/owarai-ar-api/api.php';
const send_str = encodeURLParm(data);    
const xhr = new XMLHttpRequest();
xhr.open("post", url, true);
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
xhr.send(send_str);
xhr.onreadystatechange = function() {
  // データ受信完了.
  if ( xhr.readyState == 4) {
    if(xhr.status == 200 || xhr.status == 304){
      //サーバーから帰ってきたメッセージをHTMLで表示
      res_data = xhr.response;
      addMapPin();
      //サーバーからのメッセージ的に登録失敗が判った
      if(xhr.response != '登録成功'){
        console.log("登録に失敗しました…");
      }
    }else{
      //エラーメッセージをコンソールで表示
      console.log('Failed. HttpStatus: ' + xhr.statusText);
    }
  }
}

function addMapPin () {
  
}
*/
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
