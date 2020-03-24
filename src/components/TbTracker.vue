


<template>
  <div
    class="tracker-container"
    :style="{backgroundImage:`url('${require(`../assets/bombCounter${$store.state.game.tracker.bomb}.png`)}')`}"
  ></div>
</template>

<script>
export default {
  name: "TbTracker"
};
</script>

<style scoped>
.tracker-container {
  width: 148px;
  height: 133px;
}
</style>