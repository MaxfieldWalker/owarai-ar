<template>
    <div>
      <app-header title="渾身のツッコミ">
      </app-header>
        <!-- 写真を表示 -->
        <div id="tukkomi-img-container">
            <img id="tukkomi-img" :src="tukkomiImg" width="100%">
        </div>

        <!-- ツッコミを表示 -->
        <div id="tukkomi-text">
            <div id="tukkomi-bg">
                <img id="img-upload" src="images/tukkomi-input.png" width="100%">
            </div>
            <div id="tukkomi-text-area">{{ content }}</div>
            <div id="like-button-area">
                <!--
                <div id="like-button"><img src="images/like.png" width="100%"></div>
                -->
                <span id="like-button" v-on:click="honmasore">🤣ほんまそれ</span>
                <span id="like-count">{{ likecount }}</span>
            </div>
        </div>

        <!-- プロフィール表示 -->
        <div id="tukkomi-author">
            <div id="author-intro">私がこのツッコミをいたしました。</div>
            <div id="author-icon">
                <img :src="userimg" width="100%">
            </div>
            <div id="author-name">{{ username }}</div>
            <div id="author-bio">{{ userbio }}</div>
        </div>

        <!-- ツッコミ追加のボタン -->
        <div id="tukkomi-submit">
            <div id="more-tukkomi-q">まだツッコミどころがある？</div>
            <input type="button" name="" value="自分もツッコむ">
        </div>

        <div class="subheader">
          {{ tukkomiId }}
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import AppHeader from "./AppHeader.vue";
import { ApiClient } from "../api/client";

export default Vue.extend({
  name: "TukkomiDetail",
  components: {
    AppHeader
  },
  props: {
    tukkomiId: {
      type: Number
    }
  },
  data: function() {
    return {
      username: "User",
      userimg: "",
      userbio: "",
      tukkomiImg: "",
      content: "",
      likecount: 334
    };
  },
  methods: {
    func() {
      console.log("hello");
      this.$props["tukkomiId"];
    },
    callDetailData() {
      const api = new ApiClient();
      const json = api.fetchTukkomiDetail(String(2));
      console.log(json);
    },
    honmasore() {
      this.$data.likecount += 1;
    }
  },
  async mounted() {
    const tukkomiId = this.$route.params.id;
    const api = new ApiClient();
    const response = await api.fetchTukkomiDetail(tukkomiId);

    console.log(response);

    this.$data.username = response.name;
    this.$data.userimg = `https://oguemon.com/owarai-map/img/${
      response.img
    }.png`;
    this.$data.userbio = response.bio;
    this.$data.tukkomiImg = `https://oguemon.com/owarai-map/img/${
      response.photoId
    }.png`;
    this.$data.content = response.content;
  }
});
</script>

<style lang="scss" scoped>
.subheader {
  background-color: orange;
  padding: 2px 0;
  text-align: center;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 16px;
}

#tukkomi-img-container {
  margin: 10px 0;
  clear: both;

  #tukkomi-img {
    width: 100%;
  }
}

#tukkomi-text {
  margin: -40px 0 0 0;

  #tukkomi-text-area {
    margin: -100px 10px 0 10px;
    height: 100px;
    font-size: 200%;
  }

  #like-button-area {
    height: 28px;
    margin: 5px 0 0 0;
    position: relative;
    vertical-align: top;
    /*
        #like-button {
            width: 120px;
            height: 28px;
            float: left;
        }
        */
    #like-button {
      padding: 4px 8px;
      background: orange;
      display: inline-block;
      vertical-align: inherit;
      color: #fff;
      font-size: 100%;
      font-weight: bold;
      border-radius: 5px;
      line-height: 20px;
    }
    #like-count {
      height: 28px;
      margin: 0 0 0 5px;
      display: inline-block;
      font-weight: bold;
      font-size: 200%;
      line-height: 28px;
      color: orange;
    }
  }
}

#tukkomi-author {
  clear: both;
  margin: 10px 0;
  padding: 10px;
  background: #fff1e6;

  #author-intro {
    margin: 0 0 10px 0;
    color: orange;
    font-weight: bold;
  }

  #author-icon {
    width: 50px;
    height: 50px;
    border-radius: 25px;
    float: left;
    overflow: hidden;
  }

  #author-name {
    margin: 0 0 0 60px;
    font-weight: bold;
  }

  #author-bio {
    margin: 0 0 0 60px;
    font-size: 80%;
  }
}

#tukkomi-submit {
  margin: 10px 0;

  #more-tukkomi-q {
    color: orange;
    font-weight: bold;
  }

  input[type="button"] {
    width: 100%;
    background: orange;
    border: none;
    color: #fff;
    font-size: 200%;
    font-weight: bold;
    border-radius: 5px;
  }
}
</style>
