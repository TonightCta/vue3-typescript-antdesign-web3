<template>
  <div class="mint">
    <div class="mint-desc">
      <!-- <p v-if="">Balance&nbsp;:&nbsp;{{ balance }}</p> -->
      <p v-if="!app.accountAddress">You need to connect wallet to mint NFT</p>
    </div>
    <div class="main">
      <div class="swiper">
        <span class="prev-btn">
          <img
            src="@/assets/images/prev.png"
            @click="prevFnc"
            v-show="mintdata.length > 3 && nftNum > 0"
          />
        </span>
        <div class="swiper-content">
          <a-spin
            style="margin-top: 200px"
            size="large"
            v-if="mintdata.length == 0"
          />
          <ul
            class="swiper-ul"
            v-else
            :style="{ transform: `translateX(${-nftNum * iWidths}px)` }"
          >
            <li ref="nftImg" v-for="(item, index) in mintdata" :key="index">
              <!-- 白名单NFT -->
              <div v-if="item.closed == 0">
                <img src="@/assets/images/nft.png" />
                <div class="nft-main">
                  <div>{{ item.name }}</div>
                  <div>Remaining: {{ item.mint_num }}/{{ item.num_limit }}</div>
                  <div class="flag"></div>
                  <div class="count-area">
                    <span class="reduce" @click="reduceFnc(index)"
                      ><img src="@/assets/images/reduce.png"
                    /></span>
                    <input
                      type="number"
                      oninput="if(value>30)value=30"
                      v-model="count[index]"
                    />
                    <span class="add" @click="addFnc(index)"
                      ><img src="@/assets/images/add.png"
                    /></span>
                    <span class="max" @click="maxFnc(index)"
                      ><img src="@/assets/images/max.png"
                    /></span>
                  </div>
                  <div class="mint-btn">
                    <span>{{
                      ((item.price / 1e18) * count[index]).toFixed(2)
                    }}</span>
                    <span v-if="item.loading == 0" @click="placeMint(index)"
                      >Mint</span
                    >
                    <a-spin size="large" v-else />
                  </div>
                </div>
              </div>
              <!--置灰NFT -->
              <div v-else>
                <img src="@/assets/images/nft.png" class="gray" />
                <div class="nft-main">
                  <div>{{ item.name }}</div>
                  <div>Remaining: {{ item.mint_num }}/{{ item.num_limit }}</div>
                  <div class="lock normal"></div>
                  <div class="count-area gray">
                    <span class="reduce"
                      ><img src="@/assets/images/reduce.png"
                    /></span>
                    <input
                      type="number"
                      oninput="if(value>30)value=30"
                      v-model="count[index]"
                      disabled="disabled"
                    />
                    <span class="add"
                      ><img src="@/assets/images/add.png"
                    /></span>
                    <span class="max"
                      ><img src="@/assets/images/max.png"
                    /></span>
                  </div>
                  <div class="mint-btn gray">
                    <span>{{ item.price / 1e18 }}</span>
                    <span>Mint</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <span class="next-btn">
          <img
            src="@/assets/images/next.png"
            @click="nextFnc"
            v-show="mintdata.length - nftNum > 3"
          />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { BlindList } from "@/request/api";
import { mapState } from "vuex";
export default {
  name: "MintView",
  data() {
    return {
      mintdata: [],
      count: [1, 1, 1, 1, 1],
      nftNum: 0,
      iWidths: 0,
      isConnect: false,
      balance: 50,
      spinning: true,
      loadPlace: false,
    };
  },
  computed: {
    ...mapState(["app"]),
  },
  methods: {
    async getBlind() {
      const result = await BlindList({ session: this.app.account.session });
      console.log(result);
      let list = [];
      result.data.forEach((e) => {
        if (e.name !== "VIP PASS") {
          list.push(e);
        }
      });
      this.mintdata = this.mintdata.concat(list);
      this.mintdata.forEach((e) => {
        this.$set(e, "loading", 0);
      });
      setTimeout(() => {
        const nftImg = this.$refs.nftImg;
        console.log(nftImg[0].offsetWidth);
        this.iWidths = nftImg[0].offsetWidth;
      }, 500);
    },
    // nft 左侧按钮
    prevFnc() {
      if (this.nftNum > 0) {
        this.nftNum--;
      } else {
        this.$message.error("不能往右");
        // alert('不能往右')
      }
    },
    // nft 右侧按钮
    nextFnc() {
      if (this.mintdata.length - this.nftNum > 3) {
        this.nftNum++;
      } else {
        this.$message.error("不能往左");
        // alert('不能往左')
      }
    },
    // 按钮 -
    reduceFnc(index) {
      if (this.count[index] > 1) {
        this.count[index]--;
        this.$forceUpdate();
      } else {
        this.$message.error("最少一个");
        // alert('最少一个')
      }
    },
    // 按钮 +
    addFnc(index) {
      if (this.count[index] < 30) {
        this.count[index]++;
        this.$forceUpdate();
      } else {
        this.$message.error("库存不足");
        // alert('库存不足')
      }
    },
    // 按钮 max
    maxFnc(index) {
      // const unitPrice = this.mintdata[index].price / 1e18;
      // const _number = Math.floor(this.balance / unitPrice);
      this.count[index] = 999;
      this.$forceUpdate();
    },
    async placeMint(index) {
      if (!this.app.accountAddress) {
        // 签名连接
        const result = await this.$store.dispatch("signWallet");
        //更新用户信息
        this.$store.commit("upAccountAddress", result.wallet_addr);
        this.$store.commit("upAccount", result);
        return;
      }
      this.$set(this.mintdata[index], "loading", 1);
      console.log(this.mintdata[index]);
      // return
      this.$set(this.mintdata[index], "mint_num_2", this.count[index]);
      const result = await this.$store.dispatch(
        "butBlind",
        this.mintdata[index]
      );
      result && this.$set(this.mintdata[index], "loading", 0);
      if (result != "null") {
        this.$message.success("盲盒购买成功");
      }
    },
  },
  created() {},
  mounted() {
    this.getBlind();
  },
};
</script>
<style lang="scss" scoped>
/deep/ .ant-spin {
  margin-top: 25px;
}
@import "../../styles/view_css/_mint.scss";
</style>
