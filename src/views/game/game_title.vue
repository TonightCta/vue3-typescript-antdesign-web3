<template>
  <div class="games">
    <div class="game-title">
      <p class="text-shadow">
          <slot/>
      </p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.game-title {
  background: url("../../assets/images/game_title_bg.png");
  width: 1164px;
  height: 110px;
  background-size: 100% 100%;
  margin:0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    font-size: 56px;
    color: white;
  }
}
</style>