<template>
  <div id="app">
    <CpnHeader />
    <div class="view-box" :class="app.transiname">
      <router-view />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
export default Vue.extend({
  name: "HomeView",
  components: {
    CpnHeader: (resolve) => require(["@/components/cpn_header.vue"], resolve),
  },
  data() {
    return {
      info: 0,
    };
  },
  computed: {
    ...mapState(["app"]),
  },
});
</script>
<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.default-trans {
  transition: 0.3s;
  // transform: scale(1) translateY(0);
  padding-top: 0;
  width: 100%;
  opacity: 1;
}
.open-trans {
  transition: 0.3s;
  // transform: scale(0.9) translateY(20px);
  width: 95%;
  padding-top: 20px;
  opacity: 0;
}
</style>
