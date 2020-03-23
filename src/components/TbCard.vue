<template>
  <FlipCard :flipped="!turned">
    <template slot="front">
      <div
        class="card"
        :class="{
          'grey-card': cardType == 'grey',
          'gold-card': cardType == 'bomb',
          'red-card': cardType == 'bigben'
        }"
      />
    </template>
    <template slot="back">
      <div class="card brown-card" @click="turnCard" />
    </template>
  </FlipCard>
</template>

<script>
import FlipCard from "@/components/FlipCard.vue";

export default {
  name: "TbCard",
  components: {
    FlipCard
  },
  props: {
    cardIndex: {
      type: Number
    },
    cardType: {
      validator: function(value) {
        return ["grey", "bomb", "bigben"].includes(value);
      },
      required: true
    },
    turned: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  methods: {
    turnCard() {
      this.$emit("turnCard", this.cardIndex);
    }
  }
};
</script>

<style scoped>
.card {
  margin: 5px;
  width: 60px;
  height: 112px;
  display: inline-block;
  background-size: cover;
}
.brown-card {
  background-image: url("../assets/backCard.png");
}
.grey-card {
  background-image: url("../assets/greyBomb.png");
}
.gold-card {
  background-image: url("../assets/bomb.png");
}
.red-card {
  background-image: url("../assets/bigBen.png");
}
</style>
