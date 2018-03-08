<template>
    <div>
        <!-- アプリヘッダ -->
        <div id="header-wrapper">
            <div class="sub">
                <img class="user-avatar" src="images/avatar.jpg">
            </div>
            <div class="main">
                <p class="appbar-title">新しいツッコミをかます</p>
            </div>
            <div class="sub">
                <p>+</p>
            </div>
        </div>
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
                <input type="submit" name="" value="ツッコミをお見舞いする">
            </div>
        </form>

        <div class="subheader">
        </div>


    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: "AddTukkomi"
})
</script>


<style lang="scss" scoped>
#header-wrapper {
  display: flex;
  background-color: orange;

  .main {
    flex: 1;

    .appbar-title {
      text-align: center;
    }
  }

  .sub {
    width: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
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
#content-container {
  margin-right: auto;
  margin-left: auto;
  max-width: 600px;
}

h1.title {
  font-weight: 700;
  color: gray;
}

img.avatar {
  width: 120px;
  height: 120px;
  border-radius: 100%;
  margin: 0 0 20px 20px;
  float: right;
  shape-outside: circle();
}

.links ul {
  list-style: none;
  padding: 0;

  li:not(:first-child) {
    margin-top: 8px;
  }

  li a {
    color: #000;
    font-weight: 700;
    text-decoration: none;
    &:hover {
      background: #000;
      color: #fff;
    }
  }
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
#tukkomi-submit{
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
