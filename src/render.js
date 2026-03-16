import {Ship} from "./ship.js";

class Render {

    #gameLogic;// reference to game logic for accessing gameboard and players
    constructor(GameLogic){
        this.#gameLogic = GameLogic;  
    }


    renderBoard(player) {
        const board = player.playerBoard;
        console.log(board);
        const size  = board.getSize();
        // const size  = 10;
        const boardArea = document.getElementById(`${player.type}-board`);
        // console.log(`${player.type}-board`,boardArea);
        
        for(let i=0;i<size;i++){
            for(let j=0;j<size;j++){
                this.createCell(board, boardArea, i,j);
            }
        }
    }

    createCell(board, container,i,j){
        const cell = document.createElement("div");
        cell.classList.add("cell");
        const value = board.getValue(i, j);
        //css will consider if it is ship or not, or a 'hit ship'
        if (value instanceof Ship) {
            cell.classList.add("ship");
        }
        if (board.checkHit(i, j)) {
            cell.classList.add("hit");
        }
        container.appendChild(cell);
    }
}

export default Render;
