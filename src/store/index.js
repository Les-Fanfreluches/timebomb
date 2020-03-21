import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import { db } from "@/services/firestore.js";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    currentGameId: "",
    playerId: "",
    game: {}
  },
  getters: {
    isGameFinished(state, getters) {
      return getters.redWin || getters.blueWin;
    },

    playerDecks(state) {
      return state.game.playerList.map(player => {
        return { ...player, deck: state.game.decks[player.id] };
      });
    },
    isPlayerTurnToPlay(state) {
      return playerId => {
        return playerId === state.game.currentPlayerId;
      };
    },
    numberOfTurnedCards(state) {
      let turnedCards = 0;
      const decks = Object.values(state.game.decks);

      decks.forEach(deck => {
        deck.forEach(card => {
          if (card.turned) turnedCards++;
        });
      });

      return turnedCards;
    },
    shouldRedraw(state, getters) {
      const numberOfPlayers = state.game.playerList.length;

      return getters.numberOfTurnedCards === numberOfPlayers;
    },
    redWin(state, getters) {
      if (state.game.tracker.bigben === 1) {
        return true;
      }
      const turn = state.game.turn;
      const numberOfTurnedCards = getters.numberOfTurnedCards;
      const numberOfBombs = state.game.tracker.bomb;

      if (
        turn === 4 &&
        numberOfTurnedCards === state.game.playerList.length &&
        numberOfBombs < state.game.playerList.length
      ) {
        return true;
      }

      return false;
    },
    blueWin(state) {
      const numberOfBombs = state.game.tracker.bomb;
      if (numberOfBombs === state.game.playerList.length) return true;
      return false;
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
    currentPlayerId: "toto1",
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

//getter ==> fonction qui prends en param un STATE et qui renvoie une VALEUR.
//utilisation ==> on recup la valeur renvoyé par cette fonction.
