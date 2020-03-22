<template>
  <div class="board">
    <router-link class="link" to="/">
      <h1>TimeBomB Des Copains</h1>
    </router-link>
    <TbDeck
      v-for="player in players"
      :key="player.id"
      :cards="player.deck"
      :playerName="player.name"
      :playerId="player.id"
    />

    <button
      class="redraw"
      @click="redrawGame"
      v-if="$store.getters.shouldRedraw"
      type="button"
    >Redraw</button>
    <span v-if="$store.getters.redWin">
      red wins ! c'était :
      <span v-for="redPlayer in redPlayers" :key="redPlayer.id">
        {{
        redPlayer.name
        }}
      </span>
    </span>
    <span v-if="$store.getters.blueWin">
      blue wins ! c'était :
      <span v-for="bluePlayer in bluePlayers" :key="bluePlayer.id">
        {{
        bluePlayer.name
        }}
      </span>
    </span>
    <TbTracker class="tracker" />
    <div class="my-deck">
      <TbDeck
        :cards="myPlayer.deck"
        :playerName="myPlayer.name"
        :playerId="myPlayer.id"
        :forceDisplay="true"
      />
      <span>{{ playerRole }}</span>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import TbDeck from "@/components/TbDeck.vue";
import TbTracker from "@/components/TbTracker.vue";
import { db } from "@/services/firestore.js";
import { drawGame } from "@/services/gameHelper.js";

export default {
  name: "TbBoard",
  components: {
    TbDeck,
    TbTracker
  },
  computed: {
    myPlayer() {
      return this.$store.getters.playerDecks.find(
        playerDeck => this.$store.state.playerId === playerDeck.id
      );
    },
    players() {
      return this.$store.getters.playerDecks;
    },
    playerName() {
      return this.$store.state.game.playerList.find(
        player => player.id === this.$store.state.playerId
      ).name;
    },
    playerRole() {
      return this.$store.state.game.playerList.find(
        player => player.id === this.$store.state.playerId
      ).role;
    },
    redPlayers() {
      return this.$store.state.game.playerList.filter(
        player => player.role === "red"
      );
    },
    bluePlayers() {
      return this.$store.state.game.playerList.filter(
        player => player.role === "blue"
      );
    }
  },
  methods: {
    redrawGame() {
      const game = db.collection("game").doc(this.$store.state.currentGameId);
      const playerList = this.$store.state.game.playerList;
      const currentTurn = this.$store.state.game.turn;
      const numberOfGreysTurned = this.$store.state.game.tracker.grey;
      const numberOfBombsTurned = this.$store.state.game.tracker.bomb;
      const numberOfBigbensTurned = this.$store.state.game.tracker.bigben;

      const myGame = drawGame(
        playerList,
        currentTurn,
        numberOfGreysTurned,
        numberOfBombsTurned,
        numberOfBigbensTurned
      );
      game.update(myGame);
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Spicy+Rice&display=swap");

.board h1 {
  margin: 0;
  background-color: rgb(34, 34, 34);
  border: 5px solid #c0651b;
  color: #c0651b;
  display: flex;
  font-family: "Spicy Rice", cursive;
  font-size: 48px;
  justify-content: center;
  margin-bottom: 20px;
}
.link {
  text-decoration: none;
}

.tracker {
  position: fixed;
  bottom: 0;
  left: 0;
}

.my-deck {
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
