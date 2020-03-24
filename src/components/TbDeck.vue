<template>
  <div class="TbDeck" :class="{previousPlayer: playerId === $store.state.game.previousPlayerId}">
    <div class="TbCards">
      <TbCard
        v-for="(card, index) in cards"
        :key="`${$store.state.game.turn}-${index}`"
        :cardType="card.type"
        :turned="card.turned"
        @turnCard="turnCard"
        :cardIndex="index"
      />
    </div>
    <TbPlayer
      v-if="playerName"
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
      type: String
    },
    playerId: {
      type: String,
      required: true
    }
  },
  methods: {
    turnCard(cardIndex) {
      const myPlayerId = this.$store.state.playerId;
      const previousPlayerId = this.$store.state.game.previousPlayerId;

      // empêche de cliquer sur son propre deck
      if (this.playerId === myPlayerId) {
        return;
      }

      // empêche de cliquer sur le previous player
      if (this.playerId === previousPlayerId) {
        return;
      }

      // empêche de cliquer lorsque la game est finie
      if (this.$store.getters.isGameFinished) {
        return;
      }

      // empêche de cliquer si ce n'est pas au joueur de jouer
      if (!this.$store.getters.isPlayerTurnToPlay(myPlayerId)) {
        return;
      }

      // empêche de cliquer si le round est fini
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
        previousPlayerId: myPlayerId,
        "tracker.grey": greyTracker,
        "tracker.bomb": bombTracker,
        "tracker.bigben": bigbenTracker
      });
    }
  }
};
</script>

<style scoped>
.TbDeck {
  text-align: center;
  width: 400px;
}
.previousPlayer {
  opacity: 0.5;
}
</style>
