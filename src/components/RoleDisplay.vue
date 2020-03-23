<template>
  <div class="role-diplay" :class="{red:playerRole==='red', blue:playerRole==='blue'}"></div>
</template>

<script>
export default {
  name: "roleDisplay",
  computed: {
    playerRole() {
      return this.$store.state.game.playerList.find(
        player => player.id === this.$store.state.playerId
      ).role;
    }
  }
};
</script>

<style>
.role-diplay {
  height: 112px;
  width: 60px;
  background-size: cover;
  margin-top: 10px;
}
.red {
  background-image: url("../assets/redRole.png");
}
.blue {
  background-image: url("../assets/blueRole.png");
}
</style>