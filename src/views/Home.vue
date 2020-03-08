<template>
  <div class="button-container">
    <button type="button" @click="createGame">Nouvelle Partie !</button>
  </div>
</template>

<script>
import { db } from "@/services/firestore.js";

export default {
  methods: {
    createGame() {
      //créer la game.
      db.collection("game").add({
        started: false,
        playerList: []
      });
      //aller sur la game.
    }
  }
};
</script>

<style>
</style>