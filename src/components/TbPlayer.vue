<template>
  <div class="TbPlayer">{{playerName}}</div>
</template>

<script>
export default {
  name: "TbPlayer",
  props: {
    playerName: {
      type: String,
      required: true
    }
  }
};
</script>

<style>
.TbPlayer {
  border: 2px solid black;
}
</style>