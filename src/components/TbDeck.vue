<template>
  <div class="TbDeck">
    <div class="TbCards">
      <TbCard
        v-for="(card, index) in cards"
        :key="`${$store.state.game.turn}-${index}`"
        :cardType="card.type"
        :turned="card.turned || forceDisplay"
        @turnCard="turnCard"
        :cardIndex="index"
      />
    </div>
    <TbPlayer
      :playerName="playerName"
      :isPlaying="this.$store.getters.isPlayerTurnToPlay(this.playerId)"
    />
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
    },
    forceDisplay: {
      type: Boolean
    }
  },
  methods: {
    turnCard(cardIndex) {
      const currentPlayerId = this.$store.state.playerId;

      if (this.$store.getters.isGameFinished) {
        return;
      }

      if (!this.$store.getters.isPlayerTurnToPlay(currentPlayerId)) {
        return;
      }

      if (this.$store.getters.shouldRedraw) {
        return;
      }

      const deckPlayerId = this.playerId;
      const game = db.collection("game").doc(this.$store.state.currentGameId);

      const newDeck = turnCardInDeck(
        this.$store.state.game.decks[deckPlayerId],
        cardIndex
      );
      const turnedCardColor = newDeck[cardIndex].type;
      let greyTracker = this.$store.state.game.tracker.grey;
      let bombTracker = this.$store.state.game.tracker.bomb;
      let bigbenTracker = this.$store.state.game.tracker.bigben;

      if (turnedCardColor === "grey") greyTracker++;
      if (turnedCardColor === "bomb") bombTracker++;
      if (turnedCardColor === "bigben") bigbenTracker++;

      const deckKey = `decks.${deckPlayerId}`;

      game.update({
        [deckKey]: newDeck,
        currentPlayerId: deckPlayerId,
        "tracker.grey": greyTracker,
        "tracker.bomb": bombTracker,
        "tracker.bigben": bigbenTracker
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
