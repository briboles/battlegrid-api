'use strict';

module.exports = buildBoard;

var config = {
	boardHeight: 10,
	boardWidth: 10,
	pieceHeight: 40,
	pieceWidth: 40
};

function buildBoard() {
  var temp = [];
  // Build each tile and save the tile object in an array that can be referenced later.
  for (var i = 0; i < config.boardHeight; i++) {
    for (var j = 0; j < config.boardWidth; j++) {
      var cell = new CreateCells(i,j);
      temp.push(cell);
    }
  }
  return temp;
}

function CreateCells(row, column) {
  // Used to create an object for each game tile that can be referenced to see
  // if the square contains a ship or has already been guessed
  this.row = row;
  this.column = column;
  this.clicked = false;
  this.hasShip = false;
}
