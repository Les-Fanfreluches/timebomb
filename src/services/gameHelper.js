import _ from "lodash";

function initGame(playerList) {
  const numberOfPlayers = playerList.length;

  const numberOfGreys = numberOfPlayers * 4 - 1;
  const numberOfBombs = numberOfPlayers;
  const numberOfBigbens = 1;

  const greyArray = new Array(numberOfGreys).fill({
    type: "grey",
    turned: false
  });
  const bombArray = new Array(numberOfBombs).fill({
    type: "bomb",
    turned: false
  });
  const bigbenArray = new Array(numberOfBigbens).fill({
    type: "bigben",
    turned: false
  });

  const deck = greyArray.concat(bombArray).concat(bigbenArray);
  const shuffledDeck = _.shuffle(deck);
  const hands = _.chunk(shuffledDeck, 5);

  const playerIds = playerList.map(player => player.id);

  const playerDecks = _.zipObject(playerIds, hands);

  return {
    turn: 1,
    playerList: playerList,
    decks: playerDecks,
    tracker: {
      grey: 0,
      bomb: 0
    },
    isStarted: true
  };
}

function turnCardInDeck(deck, cardIndex) {
  const oldCard = deck[cardIndex];
  const turnedCard = { ...oldCard, turned: true };
  const deckCopy = [...deck];
  deckCopy.splice(cardIndex, 1, turnedCard);

  return deckCopy;
}
export { initGame, turnCardInDeck };
