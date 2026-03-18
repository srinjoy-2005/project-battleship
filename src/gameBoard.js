import { Ship } from "./ship.js";

class GameBoard{
    #size;
    #board;
    #hits;

    constructor(size=10){
        this.#size = size;
        this.#board = [];
        this.#hits = [];
        for(let i=0; i<this.#size; i++){
            this.#board[i] = [];
            this.#hits[i] = [];
            for(let j=0; j<this.#size; j++){
                this.#board[i][j] = null;
                this.#hits[i][j] = 0;
            }
        }
    }

    getValue(i,j){
        return this.#board[i][j];
    }

    getSize(){
        return this.#size;
    }
    checkHit(i,j){
        return this.#hits[i][j] === 1;
    }

    placeShip(row,col,length,axis){
        const ship = new Ship(length);
        if (this.invalidPlacement(row,col,length,axis)){
            return false;
        }
        for(let i=0; i<length; i++){
            if (axis === 'x'){
                this.#board[row][col+i] = ship;
            } else {
                this.#board[row+i][col] = ship;
            }
        }
        return true;
    }

    invalidPlacement(row,col,length,axis){
        if (row < 0 || row >= this.#size || col < 0 || col >= this.#size) {
            return true;
        }
        //out of bounds or overlap
        for(let i=0; i<length; i++){
            if (axis === 'x'){
                if (col+i >= this.#size || this.#board[row][col+i] !== null) {
                    return true;
                }
            } else {
                if (row+i >= this.#size || this.#board[row+i][col] !== null) {
                    return true;
                }
            }
        }
        return false;
    }

    receiveAttack(row,col){
        if (this.#hits[row][col]===1){
            throw new Error('Already attacked this cell');
        }

        this.#hits[row][col] = 1;
        const cell = this.#board[row][col];
        if (cell instanceof Ship){
            cell.hit();
            if (cell.isSunk()){
                return 'hit-sunk';
            }
            return 'hit';
        }

        return 'miss';
    }

    allSunk(){
        for(let i=0; i<this.#size; i++){
            for(let j=0; j<this.#size; j++){
                const cell = this.#board[i][j];
                if (cell instanceof Ship && !cell.isSunk()){
                    return false;
                }
            }
        }
        return true;
    }
}

// const testBoard = new GameBoard(5);
// testBoard.placeShip(0,0,3,'x');
// testBoard.placeShip(1,1,3,'y');
// for(let i=0;i<5;i++){
//     for(let j=0;j<5;j++){
//         process.stdout.write((testBoard.getValue(i,j) ? 'S' : '.') + ' ');
//     }
//     process.stdout.write('\n');
// }

export { GameBoard };