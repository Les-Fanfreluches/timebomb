<template>
  <div class="timebomb-container">
    <MenuCard class="menu-card">
      <h1>Le TimeBomB Des Potes !</h1>
      <p>
        Bienvenue dans le
        <em>TimeBomB des potes</em>. Ce projet a été réalisé par Nioubx et Skorch.
        Amusez vous bien, pas de triche, ça vaut au moins 1 skin chacun sur LoL (à bon entendeur...).
      </p>
      <p>Pour lancer la game, appuyez sur le bouton ci dessous ! (au cas où vous êtes des mongolos).</p>
      <div class="button-container">
        <FunkyButton @click="createGame">Go !</FunkyButton>
      </div>
    </MenuCard>
  </div>
</template>

<script>
import { db } from "@/services/firestore.js";
import FunkyButton from "@/components/FunkyButton.vue";
import MenuCard from "@/components/MenuCard.vue";

export default {
  components: {
    FunkyButton,
    MenuCard
  },
  methods: {
    createGame() {
      //créer la game.
      db.collection("game")
        .add({
          isStarted: false,
          playerList: []
        })
        .then(docRef => {
          this.$router.push({ path: `/game/${docRef.id}` });
        });
      //aller sur la game.
    }
  }
};
</script>

<style>
em {
  color: brown;
}
.button-container {
  text-align: center;
  margin-top: 60px;
}

.timebomb-container {
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
}
.menu-card {
  text-align: justify;
}
</style>