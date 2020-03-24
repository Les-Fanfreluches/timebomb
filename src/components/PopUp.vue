<template>
  <div class="overlay">
    <div class="box">
      <slot></slot>
      <div class="button">
        <p>Pour lancer une nouvelle partie, cliquez sur le bouton ci-dessous.</p>
        <FunkyButton @click="startGame">Go !</FunkyButton>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "@/services/firestore.js";
import { drawGame, drawRoles } from "@/services/gameHelper.js";
import FunkyButton from "@/components/FunkyButton.vue";
export default {
  name: "PopUp",
  components: {
    FunkyButton
  },
  methods: {
    startGame() {
      const game = db.collection("game").doc(this.$store.state.currentGameId);
      const playerList = this.$store.state.game.playerList;
      const myGame = drawGame(playerList);
      const playerListWithRoles = drawRoles(playerList);
      game.update({
        ...myGame,
        currentPlayerId: playerList[0].id, //todo random mfck
        playerList: playerListWithRoles
      });
    }
  }
};
</script>

<style scoped>
.overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 100;
}

.box {
  width: 600px;
  background-color: #fff8f0;
  padding: 50px;
  border-radius: 4px;
  -webkit-box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.29);
  -moz-box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.29);
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.29);
}
span {
  padding-bottom: 10px;
}
</style>