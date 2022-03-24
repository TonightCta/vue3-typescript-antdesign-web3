<template>
  <div class="home-wapper">
    <!-- 阴影蒙层 -->
    <div class="nav-mask">
      <img :src="require('@/assets/images/bg/home_mask.png')" alt="">
    </div>
    <!-- 标题 -->
    <div class="title-img">
      <img :src="require('@/assets/images/bg/home_title.png')" alt="">
    </div>
    <!-- 按钮 -->
    <div class="btn-oper">
      <button>WhitePaper</button>
      <span class="label"></span>
      <button>PLAY</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Index",
  data() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
@import '../../styles/view_css/_home.scss';
</style>