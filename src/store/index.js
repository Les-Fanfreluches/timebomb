import Vue from "vue";
import Vuex from "vuex";

import { db } from "@/services/firestore.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    player: "pierre",
    game: {
      currentPlayer: "",
      players: [],
      decks: {}
    }
  },
  getters: {
    playerDecks(state) {
      return state.game.players.map(player => {
        return { ...player, deck: state.game.decks[player.id] };
      });
    }
  },
  mutations: {
    setGame(state, payload) {
      state.game = payload.game;
    }
  },
  actions: {
    toto(context) {
      db.collection("game")
        .doc("HoH38Plz7Hp6e4QSLfRv")
        .onSnapshot(function(doc) {
          const game = doc.data();
          context.commit("setGame", { game });
          console.log("Current data: ", game);
        });
    }
  },
  modules: {}
});
