<template>
  <div class="board">
    <router-link class="link" to="/">
      <span>TimeBomB Des Copains</span>
    </router-link>
    <TbDeck
      v-for="player in players"
      :key="player.id"
      :cards="player.deck"
      :playerName="player.name"
      :playerId="player.id"
    />
  </div>
</template>

<script>
// @ is an alias to /src

import TbDeck from "@/components/TbDeck.vue";

export default {
  name: "TbBoard",
  components: {
    TbDeck
  },
  computed: {
    players() {
      return this.$store.getters.playerDecks;
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Spicy+Rice&display=swap");

.board span {
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
</style>
