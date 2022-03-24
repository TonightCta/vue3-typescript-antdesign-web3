<template>
  <div class="header">
    <div class="logo-icon">
      <div class="logo"><img src="@/assets/images/logo.png" /></div>
      <div class="icon">
        <a href="" class="twitter"></a>
        <a href="" class="reddit"></a>
        <a href="" class="discord"></a>
        <a href="" class="telegram"></a>
      </div>
    </div>
    <ul class="menu">
      <li
        v-for="(item, index) in menudata"
        :key="index"
        :class="{ active: index == current }"
        @click="
          $router.push(item.url);
          current = index;
        "
      >
        <span>{{ item.name }}</span>
        <img :src="require('@/assets/images/bg/active_icon.png')" alt="" />
      </li>
    </ul>
    <div class="has-connect" v-if="false">
      <div class="address-icon" ref="addressIcon"></div>
      <p>
        {{ app.accountAddress.substr(0, 4) }}
        ...
        {{ app.accountAddress.substr(38, 4) }}
      </p>
    </div>
    <div class="wallet" @click="walletFnc">
      <img
        class="wallet-icon"
        :src="require('@/assets/images/connect_icon.png')"
        alt=""
      />
      <div class="un-connect" v-if="!app.accountAddress">
        <img :src="require('@/assets/images/connect_text.png')" alt="" />
      </div>
      <div class="has-connect" v-else>
        <p>
          {{ app.accountAddress.substr(0, 8) }}
          ...
          {{ app.accountAddress.substr(34, 4) }}
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
export default Vue.extend({
  name: "HelloWorld",
  data() {
    return {
      menudata: [
        {
          name: "HOME",
          url: "/",
        },
        {
          name: "GAMEPLAY",
          url: "/game-play",
        },
        {
          name: "ROADMAP",
          url: "/road-map",
        },
        {
          name: "INVESTOR",
          url: "/investor",
        },
        {
          name: "MINT",
          url: "/mint",
        },
        {
          name: "VIP PASS",
          url: "/vip-pass",
        },
      ],
      current: 0,
    };
  },
  computed: {
    ...mapState(["app"]),
  },
  mounted() {
    console.log(this.app.accountAddress)
    this.$nextTick(() => {
      // let jazzicon = require("jazzicon");
      // if (this.app.accountAddress) {
      //   // 钱包地址图标
      //   const el = jazzicon(
      //     16,
      //     parseInt(this.app.accountAddress.slice(2, 10), 16)
      //   );
      //   this.$refs.addressIcon.appendChild(el);
      // }
      setTimeout(() => {
        switch (this.$route.name) {
          case "Home":
            this.current = 0;
            break;
          case "GamePlay":
            this.current = 1;
            break;
          case "RoadMap":
            this.current = 2;
            break;
          case "Investor":
            this.current = 3;
            break;
          case "Mint":
            this.current = 4;
            break;
          case "VipPass":
            this.current = 5;
            break;
          default:
            this.current = 0;
        }
      }, 200);
    });
  },
  methods: {
    // 连接钱包
    async walletFnc() {
      if(this.app.accountAddress){
        return;
      }
      // 签名连接
      const result = await this.$store.dispatch("signWallet");
      //更新用户信息
      this.$store.commit("upAccountAddress", result.wallet_addr);
      this.$store.commit("upAccount", result);
    },
  },
});
</script>
<style lang="scss" scoped>
@import "../styles/_nav.scss";
</style>
