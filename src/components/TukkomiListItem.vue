<template>
<div>
<div class="wrapper">
    <div class="rank">
        <p>{{ rank }}</p>
    </div>
    <div class="content">
        <p class="subject">{{ subject }}</p>
        <button class="button-detail" v-on:click="onTukkomiDetailButtonClicked">
            気になんなあ >>
        </button>
    </div>
    <img class="spot-image" :src="image" />
</div>
</div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "TukkomiListItem",
  props: ["subject", "rank", "image", "onTukkomiDetailButtonClicked"],
  data() {
    return {
      tukkomis: []
    };
  }
});
</script>


<style lang="scss" scoped>
.spot-image {
  position: absolute;
  width: 100%;
  height: 80px;
  object-fit: cover;
  z-index: -99;
}
.wrapper {
  display: flex;
  height: 80px;

  .rank {
    background-color: rgba(255, 70, 0, 0.9);
    width: 48px;
    text-align: center;

    p {
      color: white;
      font-size: 24px;
    }
  }

  .content {
    flex: 1;
    display: flex;
    position: relative;
    align-items: center;

    .subject {
      color: white;
      font-size: 18px;
    }

    .button-detail {
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }
}
</style>


