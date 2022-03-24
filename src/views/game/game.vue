<template>
  <div class="game-play">
    <!-- 阴影蒙层 -->
    <div class="nav-mask">
      <img :src="require('@/assets/images/bg/home_mask.png')" alt="" />
    </div>
    <div class="slider-swaper">
      <div class="swiper game-list">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <OverView/>
          </div>
          <div class="swiper-slide">
            <GameFeatures/>
          </div>
          <div class="swiper-slide">
            <Roles/>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  name: "GamePlay",
  data() {
    return {
      dotPosition: "left",
    };
  },
  components:{
    OverView:(resolve) => require(['./overview'],resolve),
    GameFeatures:(resolve) => require(['./game_features'],resolve),
    Roles:(resolve) => require(['./roles'],resolve)
  },
  mounted() {
    let swiper = new Swiper(".game-list", {
      direction: "vertical",
      slidesPerView: 1,
      speed:700,
      mousewheel: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  },
});
</script>

<style lang="scss" scoped>
@import "../../styles/view_css/_game.scss";
</style>