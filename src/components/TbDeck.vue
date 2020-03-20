<template>
  <div class="TbDeck">
    <div class="TbCards">
      <TbCard
        v-for="(card, index) in cards"
        :key="index"
        :cardType="card.type"
        :turned="card.turned"
        @turnCard="turnCard"
        :cardIndex="index"
      />
    </div>
    <TbPlayer :playerName="playerName" />
  </div>
</template>

<script>
import TbCard from "@/components/TbCard.vue";
import TbPlayer from "@/components/TbPlayer.vue";
import { db } from "@/services/firestore.js";
import { turnCardInDeck } from "@/services/gameHelper.js";

export default {
  name: "TbDeck",
  components: {
    TbCard,
    TbPlayer
  },
  props: {
    cards: {
      type: Array,
      validator: function(value) {
        return value.length < 6 && value.length > 1;
      },
      required: true
    },
    playerName: {
      type: String,
      required: true
    },
    playerId: {
      type: String,
      required: true
    }
  },
  methods: {
    turnCard(cardIndex) {
      const playerId = this.playerId;
      const game = db.collection("game").doc(this.$store.state.currentGameId);

      const newDeck = turnCardInDeck(
        this.$store.state.game.decks[playerId],
        cardIndex
      );
      const deckKey = `decks.${playerId}`;
      console.log({ [deckKey]: newDeck });
      game.update({
        [deckKey]: newDeck
      });
    }
  }
};
</script>

<style>
.TbCards {
  background-color: aquamarine;
  border: 3px solid rgb(124, 108, 17);
  min-height: 100px;
}
.TbDeck {
  display: inline-block;
  margin: 5px;
  text-align: center;
  width: 400px;
}
</style>
