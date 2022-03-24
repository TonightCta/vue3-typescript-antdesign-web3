<template>
  <div class="investor-wapper">
    <!-- 阴影蒙层 -->
    <div class="nav-mask">
      <img :src="require('@/assets/images/bg/home_mask.png')" alt="" />
    </div>
    <div>
      <div class="investor-title">
        <p>Seed Round Strategic Investors</p>
      </div>
      <div class="company-list">
        <img :src="require('@/assets/images/company_1.png')" alt="">
        <p class="label"></p>
        <img :src="require('@/assets/images/company_2.png')" alt="">
      </div>
    </div>
    <p class="inves-remark text-shadow">
      Private sale is under negotiation and will be released gradually.
    </p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Investor",
  data() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
@import "../../styles/view_css/_investor.scss";
</style>