<template>
  <div class="tb-hand-display">
    <TbCard
      :class="`card card-${index}`"
      v-for="(card, index) in cards"
      :key="`${$store.state.game.turn}-${index}`"
      :cardType="card.type"
      :turned="true"
    />
  </div>
</template>

<script>
import TbCard from "@/components/TbCard.vue";

export default {
  name: "TbDeck",
  components: {
    TbCard
  },
  props: {
    cards: {
      type: Array,
      validator: function(value) {
        return value.length < 6 && value.length > 1;
      },
      required: true
    }
  }
};
</script>

<style scoped>
.tb-hand-display {
  position: relative;
  height: 150px;
  width: 240px;
}
.card {
  position: absolute;
}
.card-0 {
  top: 0;
  left: 0px;
  z-index: 5;
}
.card-1 {
  top: 0;
  left: 40px;
  z-index: 6;
}
.card-2 {
  top: 0;
  left: 80px;
  z-index: 7;
}
.card-3 {
  top: 0;
  left: 120px;
  z-index: 8;
}
.card-4 {
  top: 0;
  left: 160px;
  z-index: 9;
}
/*.card-0 {
  top: 0;
  left: -175px;
  z-index: 5;
}
.card-1 {
  top: 0;
  left: -135px;
  z-index: 6;
}
.card-2 {
  top: 0;
  left: -95px;
  z-index: 7;
}
.card-3 {
  top: 0;
  left: -55px;
  z-index: 8;
}
.card-4 {
  top: 0;
  left: -15px;
  z-index: 9;
}*/
</style>
