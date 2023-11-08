const rl = require("readline-sync")
function changeColor(card, colors) {
  console.log("Carta actual:", card);
  console.log("colores:", colors);
  // Recibir carta
  // preguntarle al usuario que color escoger
  const selectedColor = rl.question("escoje un color: ", {
    limit: colors,
    limitMessage:
      "Selección de color no válida. Elige entre los colores disponibles.",
  });
  card.color = selectedColor;
  // cambiar el color
  // Regresar la carta con la actualizacion
  // del color seleccionado
  // Modificar este codigo para que reciba el arreglo de colores y
  // los muestre como opciones
  // el color seleccionado debe ser el nuevo valor para
  // card.color, regresar esa carta
  console.log("Tarjeta actualizada con nuevo color:", card);
  return card;
}
module.exports = changeColor;
