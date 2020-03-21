import _ from "lodash";

function drawGame(
  playerList,
  currentTurn = 0,
  numberOfGreysTurned = 0,
  numberOfBombsTurned = 0,
  numberOfBigbensTurned = 0
) {
  const numberOfPlayers = playerList.length;

  const numberOfGreys = numberOfPlayers * 4 - 1 - numberOfGreysTurned;
  const numberOfBombs = numberOfPlayers - numberOfBombsTurned;
  const numberOfBigbens = 1 - numberOfBigbensTurned;

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
  const hands = _.chunk(shuffledDeck, 5 - currentTurn);

  const playerIds = playerList.map(player => player.id);

  const playerDecks = _.zipObject(playerIds, hands);

  return {
    turn: currentTurn + 1,
    decks: playerDecks,
    tracker: {
      grey: numberOfGreysTurned,
      bomb: numberOfBombsTurned,
      bigben: numberOfBigbensTurned
    },
    isStarted: true
  };
}

function drawRoles(playerList) {
  const roleMapping = {
    2: { blue: 1, red: 1 },
    4: { blue: 3, red: 1 },
    5: { blue: 4, red: 2 },
    6: { blue: 4, red: 2 },
    7: { blue: 5, red: 3 },
    8: { blue: 5, red: 3 }
  };

  const config = roleMapping[playerList.length];
  const blueArray = new Array(config.blue).fill("blue");
  const redArray = new Array(config.red).fill("red");

  const roleDeck = blueArray.concat(redArray);
  const shuffledRolesDeck = _.shuffle(roleDeck);

  return playerList.map((player, index) => {
    return { ...player, role: shuffledRolesDeck[index] };
  });
}

function turnCardInDeck(deck, cardIndex) {
  const oldCard = deck[cardIndex];
  const turnedCard = { ...oldCard, turned: true };
  const deckCopy = [...deck];
  deckCopy.splice(cardIndex, 1, turnedCard);

  return deckCopy;
}

export { drawGame, turnCardInDeck, drawRoles };
