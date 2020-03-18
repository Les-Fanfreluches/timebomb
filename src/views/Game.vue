<template>
  <div>
    <StartGame v-if="!isStarted" />
    <TbBoard v-else />
  </div>
</template>

<script>
import TbBoard from "@/components/TbBoard.vue";
import StartGame from "@/components/StartGame.vue";
export default {
  name: "Game",
  components: {
    TbBoard,
    StartGame
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
