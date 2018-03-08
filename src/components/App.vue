<template>
    <div>
        <!-- アプリヘッダ -->
        <div id="header-wrapper">
            <div class="sub">
                <img class="user-avatar" src="images/avatar.jpg">
            </div>
            <div class="main">
                <p class="appbar-title">お笑いAR</p>
            </div>
            <div class="sub">
                <p>+</p>
            </div>
        </div>
        <!-- マップ -->
        <div id="google-map">
           <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11278.640573196893!2d135.4963911622769!3d34.6721549189598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6000e71526dc6083%3A0xe43d6b861e80b709!2z44CSNTQyLTAwNzEg5aSn6Ziq5bqc5aSn6Ziq5biC5Lit5aSu5Yy66YGT6aCT5aCA!5e0!3m2!1sja!2sjp!4v1520502552924"
            frameborder="0"
            style="border:0">
           </iframe> 
        </div>
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
export default Vue.extend({
  name: "App",
  components: {
    TukkomiListItem
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
  }
});
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
</style>

<style lang="scss">
// load grobal style
@import "~../_default.scss";
</style>
