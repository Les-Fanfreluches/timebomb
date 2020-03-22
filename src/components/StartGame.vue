<template>
  <div class="startGame">
    <MenuCard>
      <h1>Le TimeBomB Des Potes !</h1>
      <div v-if="!IsplayerInTheGame">
        <input
          class="card-input"
          placeholder="Pseudo"
          v-model="playerName"
          type="text"
          id="pseudo"
          name="pseudo"
          required
          minlength="1"
          maxlength="20"
          size="12"
        />
        <FunkyButton class="button" @click="updateGame">Go !</FunkyButton>
      </div>

      <div>
        <h3>Joueurs ayant rejoint la partie :</h3>
        <p v-for="player in $store.state.game.playerList" :key="player.id">{{ player.name }}</p>
      </div>
      <FunkyButton
        class="button"
        @click="startGame"
        v-if="numberOfPlayers > 1 && numberOfPlayers < 9"
      >Go !</FunkyButton>
    </MenuCard>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import { db } from "@/services/firestore.js";
import { drawGame, drawRoles } from "@/services/gameHelper.js";
import MenuCard from "@/components/MenuCard.vue";
import FunkyButton from "@/components/FunkyButton.vue";

export default {
  name: "StartGame",
  components: {
    MenuCard,
    FunkyButton
  },
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
.startGame {
  text-align: center;
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
}

.startGame ul {
  margin: 0;
  list-style-type: none;
}

.button {
  padding-top: 5px;
}

.card-input {
  padding: 10px;
  width: calc(100% - 20px);
  margin-bottom: 15px;
}
</style>
