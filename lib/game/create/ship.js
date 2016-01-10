'use strict';

module.exports = shipObject;

var shipObject = {
  carrier: {
    name: 'carrier',
    position: [
      {row: -1, column: -1, hit: false},
      {row: -1, column: -1, hit: false},
      {row: -1, column: -1, hit: false},
      {row: -1, column: -1, hit: false},
      {row: -1, column: -1, hit: false}
    ],
    sunk: false
  },
  battleship: {
    name: 'battleship',
    position: [
      {row: -1, column: -1, hit: false},
      {row: -1, column: -1, hit: false},
      {row: -1, column: -1, hit: false},
      {row: -1, column: -1, hit: false}
    ],
    sunk: false
  },
  destroyer1: {
    name: 'destroyer',
    position: [
      {row: -1, column: -1, hit: false},
      {row: -1, column: -1, hit: false},
      {row: -1, column: -1, hit: false}
    ],
    sunk: false
  },
  destroyer2: {
    name: 'destroyer',
    position: [
      {row: -1, column: -1, hit: false},
      {row: -1, column: -1, hit: false},
      {row: -1, column: -1, hit: false}
    ],
    sunk: false
  },
  cruiser: {
    name: 'cruiser',
    position: [
      {row: -1, column: -1, hit: false},
      {row: -1, column: -1, hit: false}
    ],
    sunk: false
  }
};
