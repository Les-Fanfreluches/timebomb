<template>
  <PopUp>
    <div class="mybox">
      <p class="redwins">
        <em>
          Les
          Rouges ont gagné !
        </em>
      </p>
      <p>Leur équipe était composée de :</p>
      <p class="pseudos" v-for="redPlayer in redPlayers" :key="redPlayer.id">{{redPlayer.name}}</p>
    </div>
  </PopUp>
</template>

<script>
import PopUp from "@/components/PopUp.vue";
export default {
  name: "RedWin",
  components: {
    PopUp
  },
  computed: {
    redPlayers() {
      return this.$store.state.game.playerList.filter(
        player => player.role === "red"
      );
    }
  }
};
</script>

<style scoped>
em {
  font-weight: bold;
  color: rgb(158, 6, 6);
  font-family: "Knewave", cursive;
}
.mybox {
  font-size: 18px;
}
.pseudos {
  margin: 5px;
  font-family: "Knewave", cursive;
}
.redwins {
  margin-top: 0;
}
</style>