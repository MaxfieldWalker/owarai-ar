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
                <input type="file" name="tukkomi_img"><br>
                <img id="img-upload" src="images/camera-upload.png" width="100%">
            </div>

            <!-- ツッコミを入力 -->
            <div id="tukkomi-text">
                <div id="tukkomi-bg">
                    <img id="img-upload" src="images/tukkomi-input.png" width="100%">
                </div>
                <div id="tukkomi-text-area">
                    <textarea type="text" name="tukkomi-text">ツッコミを入力(60文字)</textarea>
                </div>
            </div>

            <div id="tukkomi-submit">
                <input type="submit" name="" value="ツッコミをお見舞い">
            </div>
        </form>

        <div class="subheader">
        </div>


    </div>
</template>

<script lang="ts">
import Vue from "vue";
import AppHeader from "./AppHeader.vue";

export default Vue.extend({
  name: "AddTukkomi",
  components: {
    AppHeader
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
#tukkomi-submit {
  margin: 10px 0;

  input[type="submit"] {
    width: 100%;
    background: orange;
    border: none;
    color: #fff;
    font-size: 200%;
    font-weight: bold;
  }
}
</style>
