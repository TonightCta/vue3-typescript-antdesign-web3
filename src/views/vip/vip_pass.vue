<template>
  <div class="vip-pass">
    <!-- 阴影蒙层 -->
    <div class="nav-mask">
      <img :src="require('@/assets/images/bg/home_mask.png')" alt="" />
    </div>
    <div class="content-top">
      <div class="vip-title">
        <p>VIP&nbsp;&nbsp;&nbsp;PASS</p>
      </div>
      <p class="remain-msg">
        Remaining: {{ blindMsg.mint_num }}/{{ blindMsg.num_limit }}
      </p>
    </div>
    <div class="content-bottom">
      <p class="count-down">{{ countDown }}</p>
      <div class="mint-box">
        <img :src="require('@/assets/images/mint_icon.png')" alt="" />
        <input
          type="text"
          :value="(Number(blindMsg.price) / 1e18).toFixed(2)"
          :disabled="true"
        />
        <p @click="placeMint" v-if="blindMsg.price && !placeLoadig">Mint</p>
        <a-spin size="large" v-else />
      </div>
      <!-- Mint说明 -->
      <p class="mint-remark">
        5,000 Unique VIP Pass available on the Eehereum Blockchain for a limited
        time, mint to unlock the following previleges!
      </p>
      <div class="mint-reward">
        <ul>
          <li v-for="(mint, indexM) in rewardList" :key="indexM">
            <p>{{ mint.title }}</p>
            <div class="test">
              <img
                :src="mint.icon"
                alt=""
                :style="{
                  width: `${mint.width}px`,
                  height: `${mint.height}px`,
                }"
              />
              <p>{{ mint.remark }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { BlindList } from "@/request/api";
import { mapState } from "vuex";
export default Vue.extend({
  name: "VipPass",
  data() {
    return {
      rewardList: [
        {
          title: "IDO Access",
          icon: require("@/assets/images/vip_1.png"),
          remark: "NFT owners are guaranteed to have IDO access.",
          width: 117,
          height: 90,
        },
        {
          title: "FREE Mint",
          icon: require("@/assets/images/vip_2.png"),
          remark:
            "Mint 2 limited edition characters (with a fixed supply limit) for FREE.",
          width: 192,
          height: 94,
        },
        {
          title: "Airdrop Access",
          icon: require("@/assets/images/vip_3.png"),
          remark: "Get weapons, equipment and other in-game items from the.",
          width: 89,
          height: 92,
        },
        {
          title: "Test Server Access",
          icon: require("@/assets/images/vip_4.png"),
          remark: "Access test server and thus gain game tokens earlier.",
          width: 87,
          height: 81,
        },
        {
          title: "Exclusive Title",
          icon: require("@/assets/images/vip_5.png"),
          remark: "Get an exclusive title in the game.",
          width: 110,
          height: 90,
        },
      ],
      mintPrice: 0.55, //盲盒价格
      blindMsg: {
        //盲盒信息
        mint_num: null,
        num_limit: null,
        price: null,
      },
      placeLoadig: false, //按钮加载
      countDown: "", //倒计时
    };
  },
  computed: {
    ...mapState(["app"]),
  },
  created() {
    this.getBlind();
    setInterval(() => {
      this.countDownEv();
    }, 1000);
  },
  methods: {
    //获取盲盒信息
    async getBlind() {
      const result = await BlindList({ session: this.app.account.session });
      result.data.forEach((el: any) => {
        if (el.name == "VIP PASS") {
          this.blindMsg = el;
        }
      });
    },
    //购买盲盒
    async placeMint() {
      if (!this.app.accountAddress) {
        // 签名连接
        const result = await this.$store.dispatch("signWallet");
        //更新用户信息
        this.$store.commit("upAccountAddress", result.wallet_addr);
        this.$store.commit("upAccount", result);
        return;
      }
      this.placeLoadig = true;
      this.$set(this.blindMsg, "mint_num_2", 1);
      const result = await this.$store.dispatch("butBlind", this.blindMsg);
      result && (this.placeLoadig = false);
      if (result != "null") {
        this.$message.success("盲盒购买成功");
      }
    },
    //倒计时
    countDownEv() {
      //_time: number
      let nowtime = new Date(), //获取当前时间
        endtime = new Date("2022/03/25"); //定义结束时间
      let lefttime = endtime.getTime() - nowtime.getTime(), //距离结束时间的毫秒数
        lefth = Math.floor((lefttime / (1000 * 60 * 60)) % 24), //计算小时数
        leftm = Math.floor((lefttime / (1000 * 60)) % 60), //计算分钟数
        lefts = Math.floor((lefttime / 1000) % 60); //计算秒数
      this.countDown =
        (lefth > 9 ? lefth : "0" + lefth) +
        "h " +
        (leftm > 9 ? leftm : "0" + leftm) +
        "m " +
        (lefts > 9 ? lefts : "0" + lefts) +
        "s"; //返回倒计时的字符串
    },
  },
});
</script>

<style lang="scss" scoped>
/deep/ .ant-spin {
  margin-left: 50px;
}
@import "../../styles/view_css/_vip.scss";
</style>