'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gameSchema = new mongoose.Schema({

  gamefull: {type: Boolean, default: false},
  watchable: {type: Boolean, default: true},
  private: {type: Boolean, default: false},
  started: {type: Boolean, default: false},
  completed: {type: Boolean, default: false},
  playerturn: String,
  created: {type: Date, default: Date.now},

  player1: {
    username: {type: String, ref: 'users'},
    gameboard: Array,
    guessNum: Number,
    hitNum: {type: Number, default: 0},
    gameWon: {type: Boolean, default: false},
    shipPositions: {
      carrier: {
        name: String,
        position: Array,
        sunk: {type: Boolean, default: false}
      },
      battleship: {
        name: String,
        position: Array,
        sunk: {type: Boolean, default: false}
      },
      destroyer1: {
        name: String,
        position: Array,
        sunk: {type: Boolean, default: false}
      },
      destroyer2: {
        name: String,
        position: Array,
        sunk: {type: Boolean, default: false}
      },
      cruiser: {
        name: String,
        position: Array,
        sunk: {type: Boolean, default: false}
      }
    }
  },

  player2: {
    username: {type: String, ref: 'users'},
    gameboard: Array,
    guessNum: Number,
    hitNum: {type: Number, default: 0},
    gameWon: {type: Boolean, default: false},
    shipPositions: {
      carrier: {
        name: String,
        position: Array,
        sunk: {type: Boolean, default: false}
      },
      battleship: {
        name: String,
        position: Array,
        sunk: {type: Boolean, default: false}
      },
      destroyer1: {
        name: String,
        position: Array,
        sunk: {type: Boolean, default: false}
      },
      destroyer2: {
        name: String,
        position: Array,
        sunk: {type: Boolean, default: false}
      },
      cruiser: {
        name: String,
        position: Array,
        sunk: {type: Boolean, default: false}
      }
    }
  }
});

var gameModel = mongoose.model('gamestate', gameSchema);

module.exports = gameModel;
