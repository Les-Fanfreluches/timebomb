<template>
  <div>
    <div class="tracker-container">
      <TbCard cardType="bomb" :turned="true" />
      <span class="tracker-number">{{$store.state.game.tracker.bomb}}</span>
    </div>
    <div class="tracker-container">
      <TbCard cardType="grey" :turned="true" />
      <span class="tracker-number">{{$store.state.game.tracker.grey}}</span>
    </div>
  </div>
</template>

<script>
import TbCard from "@/components/TbCard.vue";
export default {
  name: "TbTracker",
  components: {
    TbCard
  }
};
</script>

<style scoped>
.tracker-container {
  display: inline-block;
  position: relative;
  margin-left: 20px;
}
.tracker-number {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  font-size: 40px;
}
</style>