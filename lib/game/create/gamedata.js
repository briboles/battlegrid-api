
var ships = require('./ship');
var board = require('./create.board')();

module.exports = function (user) {

  this.player1 = {
    gameboard: board,
    shipPositions: ships,
    username: user,
    sourceIP: '',
    cookie: '',
    gameWon: false,
    guessNum: 0
  };
  this.player2 = {
    gameboard: board,
    shipPositions: ships,
    username: '',
    sourceIP: '',
    cookie: '',
    gameWon: false,
    guessNum: 0
  };

  this.gameid = '';
  this.gamefull = false;
  this.watchable = false;
  this.playerturn = '';
  this.started = false;

};
