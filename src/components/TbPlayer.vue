<template>
  <div class="TbPlayer" :class="{ currentPlayer: isPlaying }">
    {{ playerName }}
  </div>
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
  border: 2px solid black;
}

.currentPlayer {
  background-color: white;
}
</style>
