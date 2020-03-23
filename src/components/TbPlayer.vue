<template>
  <div class="TbPlayer" :class="{ currentPlayer: isPlaying }">{{ playerName }}</div>
</template>

<script>
export default {
  name: "TbPlayer",
  props: {
    playerName: {
      type: String,
      required: true
    },
    isPlaying: {
      type: Boolean,
      required: true
    }
  }
};
</script>

<style>
.TbPlayer {
  font-family: "Knewave", cursive;
  font-size: 24px;
}

.currentPlayer {
  color: rgb(2, 92, 2);
}
</style>
