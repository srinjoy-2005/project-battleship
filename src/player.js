import {GameBoard as board } from "./gameBoard.js";

class Player {
    type;
    playerBoard;
    constructor(type) {
        this.type = type;
        this.playerBoard = new board();
    }

    randomlyPlaceFleet() {
        const ships = [5, 4, 3, 3, 2];

        ships.forEach(length => {
            let placed = false;

            while (!placed) {
                const direction = Math.random() < 0.5 ? 'x' : 'y';
                const x = Math.floor(Math.random() * 10);
                const y = Math.floor(Math.random() * 10);

                placed = this.playerBoard.placeShip(x,y,length,direction);
            }
        });
    }
}

export { Player };