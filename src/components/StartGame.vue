<template>
  <div class="startGame">
    <div v-if="!IsplayerInTheGame">
      <label for="pseudo">Pseudo :&nbsp;</label>
      <input
        v-model="playerName"
        type="text"
        id="pseudo"
        name="pseudo"
        required
        minlength="1"
        maxlength="10"
        size="12"
      />
      <button class="join" @click="updateGame" type="button">
        Joindre La Game
      </button>
    </div>
    <ul>
      <li v-for="player in $store.state.game.playerList" :key="player.id">
        {{ player.name }}
      </li>
    </ul>
    <button
      class="start"
      v-if="numberOfPlayers > 1 && numberOfPlayers < 9"
      @click="startGame"
      type="button"
    >
      Start La Game!
    </button>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import { db } from "@/services/firestore.js";
import { drawGame, drawRoles } from "@/services/gameHelper.js";
export default {
  name: "StartGame",
  data() {
    return {
      playerName: ""
    };
  },
  computed: {
    IsplayerInTheGame() {
      const playerList = this.$store.state.game.playerList;
      const playerId = this.$store.state.playerId;

      if (!playerList) {
        return false;
      }

      const myself = playerList.find(player => player.id === playerId);
      return !!myself;
    },
    numberOfPlayers() {
      const playerList = this.$store.state.game.playerList;

      if (!playerList) {
        return false;
      }

      return playerList.length;
    }
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
    },
    updateGame() {
      const myId = uuidv4();
      this.$store.commit("setPlayerId", { playerId: myId });
      const myDoc = db.collection("game").doc(this.$store.state.currentGameId);
      const newPlayerList = this.$store.state.game.playerList.concat([
        { id: myId, name: this.playerName }
      ]);
      myDoc.update({
        playerList: newPlayerList
      });
    }
  }
};
</script>

<style scoped>
.startGame ul {
  margin: 0;
}
</style>
