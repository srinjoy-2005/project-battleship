import {GameBoard as board } from "./gameBoard.js";

class Player {
    type;
    playerBoard;
    constructor(type) {
        this.type = type;
        this.playerBoard = new board();
    }
}

export { Player };