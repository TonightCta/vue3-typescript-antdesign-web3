<template>
  <div class="game-features">
    <GameTitle>
      <p>Game&nbsp;Features</p>
    </GameTitle>
    <div class="commit-soon">
      <p class="text-shadow">
        Comming Soon
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  components: {
    GameTitle: (resolve) => require(["./game_title"], resolve),
  },
});
</script>

<style lang="scss" scoped>
h1{
  color:white;
  margin-top: 200px;
}
</style>