<template>
  <div class="road-map">
    <GameTitle>
      <p>Roadmap</p>
    </GameTitle>
    <div class="map-content">
      <div class="map-tree">
        <div class="tree-left">
          <ul>
            <li v-for="(roadLeft, indexLeft) in treeLeft" :key="indexLeft">
              <!-- 标题 -->
              <p class="road-title">{{ roadLeft.title }}</p>
              <div class="flower-box"></div>
              <!-- 连轴线 -->
              <div class="road-line">
                <div class="line-point"></div>
              </div>
              <!-- 发光边框 -->
              <div class="light-box"></div>
              <!-- 说明 -->
              <div class="remark-box">
                <div class="for-list" v-for="(remarkLeft,indexR) in roadLeft.remarkList" :key="indexR + 'inner'">
                  <div class="point" v-if="remarkLeft">
                    <div class="point-inner"></div>
                  </div>
                  <p>{{ remarkLeft }}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="tree-line">
          <p class="line"></p>
          <p class="point-top"></p>
          <p class="point-bottom"></p>
        </div>
        <div class="tree-right">
           <ul>
            <li v-for="(roadLeft, indexLeft) in treeRight" :key="indexLeft">
              <!-- 标题 -->
              <p class="road-title">{{ roadLeft.title }}</p>
              <div class="flower-box"></div>
              <!-- 连轴线 -->
              <div class="road-line">
                <div class="line-point"></div>
              </div>
              <!-- 说明 -->
              <div class="remark-box">
                <div class="for-list" v-for="(remarkLeft,indexR) in roadLeft.remarkList" :key="indexR + 'inner'">
                  <div class="point" v-if="remarkLeft">
                    <div class="point-inner"></div>
                  </div>
                  <p>{{ remarkLeft }}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="map-remark">
        <p class="text-shadow">
          Version plans may be subject to changes as the project progresses.
          Many future updates are in the pipeline; schedules and detailswill be
          released in advance.
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "RoadMap",
  data() {
    return {
      treeLeft: [
        {
          title: "Phase 1 - Community - 2022 Q1",
          remarkList: [
            "Discord Community",
            "Trailer",
            "Official Website",
            "Account",
            "White Paper",
            '',
            "Medium Articles",
          ],
          light: true,
        },
        {
          title: "Phase 3 - Official Launch - 2022 Q2",
          remarkList: [
            "Character System",
            "Resource Isle System",
            "Gear System",
            "Kingship System",
            "Rune System",
            "PVP - Spar",
            "Battle System ",
            "Epic Bosses",
            "Professions Dungeons ",
          ],
          light: false,
        },
        {
          title: "Phase 4 - Global Gameplay - 2022 Q3",
          remarkList: ["Enchant System",'', "Gem System"],
          light: false,
        },
      ],
      treeRight: [
        {
          title: "Phase 2 - Events - 2022 Q1~Q2",
          remarkList: [
            "Multiple events will be hold in with massive wl spots giveaway",
            '',
            "Airdrop for our early supporters",
            '',
            "IDO event",
            '',
            "Kingdoms auction - land sale",
            '',
            "Character NFT and Weapon blind box on sale",
          ],
        },
        {
          title: "Phase 5 - Gear Upgrades - 2022 Q4",
          remarkList: ["Kingdom War", "Apex Duel", "World Bosses"],
        },
      ],
    };
  },
  components: {
    GameTitle: (resolve) => require(["../game/game_title.vue"], resolve),
  },
});
</script>

<style lang="scss" scoped>
@import "../../styles/view_css/_road.scss";
</style>