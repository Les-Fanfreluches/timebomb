<template>
  <div class="board">
    <div class="top">
      <TbDeck
        v-for="player in decks.topDecks"
        :key="player.id"
        :cards="player.deck"
        :playerName="player.name"
        :playerId="player.id"
      />
    </div>
    <div class="left-right-container">
      <div class="left">
        <TbDeck
          v-for="player in decks.leftDecks"
          :key="player.id"
          :cards="player.deck"
          :playerName="player.name"
          :playerId="player.id"
        />
      </div>

      <div class="right">
        <TbDeck
          v-for="player in decks.rightDecks"
          :key="player.id"
          :cards="player.deck"
          :playerName="player.name"
          :playerId="player.id"
        />
      </div>
    </div>
    <button
      class="redraw"
      @click="redrawGame"
      v-if="$store.getters.shouldRedraw"
      type="button"
    >Redraw</button>
    <span v-if="$store.getters.redWin">
      red wins ! c'était :
      <span
        v-for="redPlayer in redPlayers"
        :key="redPlayer.id"
      >{{redPlayer.name}}</span>
    </span>
    <span v-if="$store.getters.blueWin">
      blue wins ! c'était :
      <span
        v-for="bluePlayer in bluePlayers"
        :key="bluePlayer.id"
      >{{bluePlayer.name}}</span>
    </span>
    <TbTracker class="tracker" />
    <div class="my-deck">
      <TbDeck :cards="myPlayer.deck" :playerId="myPlayer.id" />
      <TbDeck
        :cards="mySortedDeck"
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
    mySortedDeck() {
      return [...this.myPlayer.deck].sort(function(a, b) {
        if (a.type > b.type) {
          return 1;
        }
        if (b.type > a.type) {
          return -1;
        }
        return 0;
      });
    },
    decks() {
      const playerDecks = this.$store.getters.playerDecks.filter(
        playerDeck => this.$store.state.playerId !== playerDeck.id
      );
      const sideMapping = {
        4: 1,
        5: 1,
        6: 1,
        7: 2,
        8: 2
      };
      const side = sideMapping[this.$store.state.game.playerList.length];
      const rightDecks = playerDecks.slice(0, side);
      const leftDecks = playerDecks.slice(side, side * 2);
      const topDecks = playerDecks.slice(side * 2);
      return {
        rightDecks,
        leftDecks,
        topDecks
      };
    },

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

.board {
  height: 100%;
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
  flex-direction: column;
}
.top {
  padding-top: 50px;
  display: flex;
  justify-content: space-evenly;
}
.left {
  margin-left: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.right {
  margin-right: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.left-right-container {
  margin-top: 50px;
  height: 50%;
  display: flex;
  justify-content: space-between;
}
</style>
