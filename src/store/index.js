import Vue from "vue";
import Vuex from "vuex";

import { db } from "@/services/firestore.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentGameId: "",
    playerId: "",
    game: {}
  },
  getters: {
    playerDecks(state) {
      return state.game.playerList.map(player => {
        return { ...player, deck: state.game.decks[player.id] };
      });
    }
  },
  mutations: {
    setGame(state, payload) {
      state.game = payload.game;
    },
    setCurrentGameId(state, payload) {
      state.currentGameId = payload.gameId;
    },
    setPlayerId(state, payload) {
      state.playerId = payload.playerId;
    }
  },
  actions: {
    subscribeToGame(context) {
      db.collection("game")
        .doc(context.state.currentGameId)
        .onSnapshot(function(doc) {
          const game = doc.data();
          context.commit("setGame", { game });
          // console.log("Current data: ", game);
        });
    }
  },
  modules: {}
});

/* const test = {
  currentGameId: "gameid",
  playerId: "monPlayerId",
  //synched to firebase
  game: {
    turn: 1,
    playerList: [
      { id: "toto1", name: "toto1" },
      { id: "toto2", name: "toto2" }
    ],
    decks: {
      toto1: [{ type: "bigben", turned: "false" }],
      toto2: [
        { type: "grey", turned: "false" },
        { type: "bomb", turned: "true" }
      ]
    },
    tracker: {
      grey: 5,
      bomb: 1
    }
  }
}; */
