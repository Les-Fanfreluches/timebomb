<template>
  <div class="startGame">
    <label for="pseudo">Pseudo :</label>
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
    <button class="favorite styled" @click="updateGame" type="button">
      Joindre la game
    </button>
    <ul>
      <li v-for="player in $store.state.game.playerList" :key="player.id">
        {{ player.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import { db } from "@/services/firestore.js";

export default {
  name: "StartGame",
  data() {
    return {
      playerName: ""
    };
  },
  methods: {
    updateGame() {
      const myId = uuidv4();
      this.$store.commit("playerId", myId);
      const myDoc = db.collection("game").doc(this.$store.state.currentGameId);
      myDoc.update({
        playerList: this.$store.state.game.playerList.concat([
          { id: myId, name: this.playerName }
        ])
      });
    }
  }
};
</script>

<style></style>
