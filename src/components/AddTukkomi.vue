<template>
    <div>
      <app-header title="新しいツッコミをかます">
      </app-header>
        <!-- スポットの被りをチェック -->
        <div id="spot-overlap">
            <div id="overlap-msg">もしかしてこの写真のことを言ってる？</div>
            <div id="overlap-list">
                <div class="overlap-img">
                    <a href="">
                        <img src="images/near-img.jpg">
                    </a>
                </div>
                <div class="overlap-img">
                    <a href="">
                        <img src="images/near-img.jpg">
                    </a>
                </div>
                <div class="overlap-img">
                    <a href="">
                        <img src="images/near-img.jpg">
                    </a>
                </div>
            </div>
        </div>

        <form method="post" action="">
            <!-- 写真をアップロード -->
            <div id="upload-img">
                <input type="file" name="tukkomi_img" ref="image-input" v-on:change="onPhotoChanged" ><br>
                <img id="img-upload" 
                v-bind:src="currentImage.length == 0 ? 'images/camera-upload.png' : currentImage"
                 width="100%" ref="img-upload">
            </div>

            <!-- ツッコミを入力 -->
            <div id="tukkomi-text">
                <div id="tukkomi-bg">
                    <img id="img-upload" src="images/tukkomi-input.png" width="100%">
                </div>
                <div id="tukkomi-text-area">
                    <textarea
                    type="text"
                    name="tukkomi-text"
                    placeholder="ツッコミを入力(60字まで)"></textarea>
                </div>
            </div>

        </form>
          <div id="tukkomi-submit">
              <button v-on:click="submitTukkomi">
                ツッコミをお見舞い
              </button>
          </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import AppHeader from "./AppHeader.vue";
import { ApiClient } from "../api/client";

export default Vue.extend({
  name: "AddTukkomi",
  components: {
    AppHeader
  },

  data() {
    return {
      currentImage() {
        return "";
      }
    };
  },
  methods: {
    onPhotoChanged(el) {
      const target = el.target;
      const file = target.files[0];
      const type = file.type;
      const size = file.size;

      const reader = new FileReader();
      reader.addEventListener(
        "load",
        event => {
          const base64 = (event.target as any).result;
          (this.$refs["img-upload"] as any).src = base64;
          this.currentImage = base64;
        },
        false
      );
      reader.readAsDataURL(file);
    },

    // ツッコミをお見舞いする
    submitTukkomi() {
      // APIを呼ぶ
      const api = new ApiClient();
      console.log("ツッコミをお見舞いするやで");
    }
  }
});
</script>


<style lang="scss" scoped>
.subheader {
  background-color: orange;
  padding: 2px 0;
  text-align: center;
}

#overlap-list {
  margin: 10px 0;

  .overlap-img {
    width: 160px;
    height: 160px;
    margin: 0 10px;
    text-align: right;
    float: left;
    overflow: hidden;
  }
}
#upload-img {
  margin: 10px 0;
  clear: both;

  .img-upload {
    width: 100%;
  }
}
#tukkomi-text {
  margin: -40px 0 0 0;

  #tukkomi-bg {
  }
  #tukkomi-text-area {
    margin: -180px 0 0 0;
    padding: 20px;
    textarea {
      width: 100%;
      height: 130px;
      border: none;
      font-size: 200%;
      vertical-align: top;
    }
  }
}

// ツッコミをお見舞いするボタン
#tukkomi-submit {
  margin: 10px 0;

  button {
    width: 100%;
    background: orange;
    border: none;
    color: #fff;
    font-size: 200%;
    font-weight: bold;
  }
}
</style>
