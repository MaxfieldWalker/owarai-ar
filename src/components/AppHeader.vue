<template>
    <div id="header-wrapper">
        <div class="sub">
            <img class="user-avatar" src="images/avatar.jpg">
        </div>
        <div class="main">
            <p class="appbar-title">{{ title }}</p>
        </div>
        <div class="sub">
            <p>+</p>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "AppHeader",
  props: ["title"]
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
.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 16px;
}
</style>
