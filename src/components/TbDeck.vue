<template>
  <div class="TbDeck">
    <div class="TbCards">
      <TbCard
        v-for="(card, index) in cards"
        :key="index"
        :cardType="card.type"
      />
    </div>
    <TbPlayer :playerName="playerName" />
  </div>
</template>

<script>
import TbCard from "@/components/TbCard.vue";
import TbPlayer from "@/components/TbPlayer.vue";

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
