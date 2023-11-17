const rl = require("readline-sync");
const chalk = require("chalk");
const mazoRevuelto = require("./modules/deck-shuffle");
const selectionUno = require("./modules/seleccion");
const cardReverse = require("./modules/reverse");
const changeColor = require("./modules/change-color");

//juego UNO
async function jugar() {
  var deck = [];
  var colors = ["yellow", "blue", "green", "red"];
  var types = ["Comun", "Especial", "Comodin"];
  var card = {
    color: null, // amarillo, azul , verde , rojo
    number: null, // 0-9
    Type: null, // comun, especiales y comodines
  };
  var isReverse = false;

  for (var cColor = 0; cColor < colors.length; cColor++) {
    for (var cNumber = 0; cNumber < 10; cNumber++) {
      deck.push({ color: colors[cColor], number: cNumber, type: "comun" });
    }
    for (var cNumber1 = 1; cNumber < 10; cNumber1++) {}
    deck.push({ color: colors[cColor], number: "+2", type: "comun" });
    deck.push({ color: colors[cColor], number: "+2", type: "comun" });
    deck.push({ color: colors[cColor], number: "B", type: "comun" });
    deck.push({ color: colors[cColor], number: "B", type: "comun" });
    deck.push({ color: colors[cColor], number: "R", type: "comun" });
    deck.push({ color: colors[cColor], number: "R", type: "comun" });
  }

  deck.push({ color: null, number: "+4", type: "comodin" });
  deck.push({ color: null, number: "+4", type: "comodin" });
  deck.push({ color: null, number: "+4", type: "comodin" });
  deck.push({ color: null, number: "+4", type: "comodin" });
  deck.push({ color: null, number: "CC", type: "comodin" });
  deck.push({ color: null, number: "CC", type: "comodin" });
  deck.push({ color: null, number: "CC", type: "comodin" });
  deck.push({ color: null, number: "CC", type: "comodin" });

  var winner = false;
  const players = rl.question("¿cuantos jugadores seran?", {});
  const totalcards = players * 7;
  // Deck Shuffle
  mazoRevuelto(deck);
  var cardsPlayers = {};

  for (var cTcards = 0; cTcards < 7; cTcards++) {
    for (var cPlayers = 0; cPlayers < players; cPlayers++) {
      if (!cardsPlayers["player_" + cPlayers]) {
        cardsPlayers["player_" + cPlayers] = [];
      }

      cardsPlayers["player_" + cPlayers].push(deck.shift());
    }
  }
  var trash = [];
  trash.push(deck.shift());

  function cardValidation(card) {
    if (
      card.number == trash[trash.length - 1].number ||
      card.color == trash[trash.length - 1].color
    ) {
      return true;
    } else {
      return false;
    }
  }

  // Recorremos a los jugadores
  var player = "player_0";
  do {
    console.log(
      chalk.bgWhite("Ultima carta tirada:") +
        " " +
        chalk[trash[trash.length - 1].color].bold(
          trash[trash.length - 1].number
        )
    );
    let end = false;
    // Mientras el turno no acabe
    while (end == false) {
      //  Imprimimos el jugador actual como referencia
      console.log("Jugador actual: ", player);
      // Mostramos sus cartas y esperamos seleccione una
      const result = (await selectionUno(cardsPlayers[player], "CHOICE"))
        .selectedOption;
      // Buscar carta seleccionada
      // obtener el index de la carta (buscar result en el arreglo cardsPlayers[player])
      let cardIndex = cardsPlayers[player].findIndex((card) => {
        return card.number == result.number && card.color == result.color;
      }); // Aqui va el index obtenido
      // mediante ese index obtenido
      // validar la carta con nuestra funcion cardValidation()
      // Validar si la carta se puede usar
      const reverseResult = cardReverse(players, player, isReverse);
      // {actualPlayer: 'player_3', nextPlayer: `player_0`, isReverse: false}
      if (result.number === "+1") {
        cardsPlayers[player].push(deck.shift());
      } else if (cardValidation(cardsPlayers[player][cardIndex])) {
        // Validar si la carta es una carta especial
        if (cardsPlayers[player][cardIndex].number == "+2") {
          //+2
          // Si es carta especial validar de que tipo (+2, reversa o bloqueo)
          // se aplica el castigo al sig jugador
          for (var addOne = 0; addOne < 2; addOne++) {
            cardsPlayers[reverseResult.nextPlayer].push(deck.shift());
          }
        } else if (cardsPlayers[player][cardIndex].number == "B") {
          //Bloqueo
        } else if (cardsPlayers[player][cardIndex].number == "R") {
          // Reversa
          isReverse = !isReverse;
        }
        // se agrega a trash y se remueve del jugador
        trash.push(cardsPlayers[player].splice(cardIndex, 1)[0]);
        // el turno termina y se pasa al sig jugador mediante el while automaticamente
        end = true;
        player = cardReverse(players, player, isReverse).nextPlayer;
      }
      // Validar si la carta es un comodin
      // de preferencia con una funcion como la de cardValidation
      else if (cardsPlayers[player][cardIndex].type == "comodin") {
        // Si la carta es comodin
        // Validar que tipo de comodin CC
        if (cardsPlayers[player][cardIndex].number == "CC") {
          // obtenemos el nuevo color y carta
          const newColorCard = changeColor(
            cardsPlayers[player][cardIndex],
            colors
          );
          // Agregamos la carta a nuestro trash
          trash.push(newColorCard);
          // Eliminamos la carta del jugador
          cardsPlayers[player].splice(cardIndex, 1)[0];
          // Terminar turno
          end = true;
          player = cardReverse(players, player, isReverse).nextPlayer;
        } else if (cardsPlayers[player][cardIndex].number == "+4") {
          // Agregarle 4 cartas al sig jugador
          // pushar 4 cartas al jugador sig
          for (var addOne = 0; addOne < 4; addOne++) {
            cardsPlayers[reverseResult.nextPlayer].push(deck.shift());
          }
          // Cambio de color
          // obtenemos el nuevo color y carta
          const newColorCard = changeColor(
            cardsPlayers[player][cardIndex],
            colors
          );
          // Agregamos la carta a nuestro trash
          trash.push(newColorCard);
          // Eliminamos la carta del jugador
          cardsPlayers[player].splice(cardIndex, 1)[0];
          // Terminar turno
          end = true;
          player = cardReverse(players, player, isReverse).nextPlayer;
        }
      }
      // el while authmaticamente reinicia a el principio
    }
  } while (winner == false);
}

// Definir Cartas ✅
// Definir Jugadores ✅
// Revolver cartas ✅
// Repartir cartas ✅
// Desarrollar el trash ✅
// Iniciar el juego (Introducir la pc al trash) ✅
// Jugador escoga carta ✅
// Validacion de carta (trash con carta seleccionada) ✅
//Si color o numero coincide ✅
//Si es comodin (CC) ✅
//Si es comodin (+4) ✅
//Si es reversa ✅
//Si es bloqueo
//Si es +2 ✅
// Comer carta si no tengo
// Comer si no dice "uno"
// Decir "uno"

jugar();
