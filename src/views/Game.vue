<template>
  <div>
    <div v-if="!isStarted">...</div>
    <TbBoard v-else />
  </div>
</template>

<script>
import TbBoard from "@/components/TbBoard.vue";

export default {
  name: "Game",
  components: {
    TbBoard
  },
  computed: {
    isStarted() {
      return this.$store.state.game.isStarted;
    }
  },
  created() {
    //set le current game id dans le store
    this.$store.commit("setCurrentGameId", {
      gameId: this.$route.params.gameId
    });
    // s'abonner à la game dans firestore
    this.$store.dispatch("subscribeToGame");
  }
};
</script>
