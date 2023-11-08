// Obtenemos al jugador actual mediante la llamada a la funcion
// y nuestra bandera "isReverse" que nos da un true
// si esta activa la reversa y un false si esta en giro normal
function cardReverse(totalPlayers, actualPlayer, isReverse) {
  const indexPlayer = parseInt(actualPlayer.split("_")[1])
  console.log(indexPlayer)
  let nextPlayer = null
  //Si el ciclo esta en reveresar
  //regresar el sig jugador como el jugador anterior
  if (isReverse) {
    if (indexPlayer == 0) {
      nextPlayer = totalPlayers-1
    } else {
      nextPlayer = indexPlayer-1
    }
    
  } else {
    if (indexPlayer == totalPlayers-1) {
      nextPlayer = 0
    } else {
      nextPlayer = indexPlayer+1
    }
  }
  return {actualPlayer, nextPlayer: `player_${nextPlayer}`, isReverse}
}

module.exports = cardReverse