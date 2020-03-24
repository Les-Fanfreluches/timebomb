<template>
  <PopUp>
    <div class="mybox">
      <p class="bluewins">
        <em>
          Les
          Bleus ont gagné !
        </em>
      </p>
      <p>Leur équipe était composée de :</p>
      <p class="pseudos" v-for="bluePlayer in bluePlayers" :key="bluePlayer.id">{{bluePlayer.name}}</p>
    </div>
  </PopUp>
</template>

<script>
import PopUp from "@/components/PopUp.vue";
export default {
  name: "Bluewin",
  components: {
    PopUp
  },
  computed: {
    bluePlayers() {
      return this.$store.state.game.playerList.filter(
        player => player.role === "blue"
      );
    }
  }
};
</script>

<style scoped>
em {
  font-weight: bold;
  color: rgb(6, 6, 158);
  font-family: "Knewave", cursive;
}
.mybox {
  font-size: 18px;
}
.pseudos {
  margin: 5px;
  font-family: "Knewave", cursive;
}
.bluewins {
  margin-top: 0;
}
</style>