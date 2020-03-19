<template>
  <div class="button-container">
    <span>Le TimeBomB Des Copains !</span>
    <button type="button" @click="createGame">Nouvelle Partie !</button>
  </div>
</template>

<script>
import { db } from "@/services/firestore.js";

export default {
  methods: {
    createGame() {
      //créer la game.
      db.collection("game")
        .add({
          isStarted: false,
          playerList: []
        })
        .then(docRef => {
          this.$router.push({ path: `/game/${docRef.id}` });
        });
      //aller sur la game.
    }
  }
};
</script>

<style>
.button-container {
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
}
</style>