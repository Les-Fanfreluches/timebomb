<template>
  <div>
    <TbDeck
      v-for="player in players"
      :key="player.id"
      :cards="player.deck"
      :playerName="player.id"
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
