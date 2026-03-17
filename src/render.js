import {Ship} from "./ship.js";

class Render {

    #gameLogic;// reference to game logic for accessing gameboard and players
    // #onCellClick; // callback function for cell click events
    constructor(GameLogic){
        this.#gameLogic = GameLogic;  
    }


    renderBoard(player) {
        const board = player.playerBoard;
        console.log(board);
        const size  = board.getSize();
        // const size  = 10;
        const boardArea = document.getElementById(`${player.type}-board`);
        boardArea.innerHTML = ""; 
        console.log(`${player.type}-board`,boardArea);
        
        for(let i=0;i<size;i++){
            for(let j=0;j<size;j++){
                this.createCell(player, boardArea, i,j);
            }
        }
    }

    createCell(player, container,i,j){
        const board = player.playerBoard;
        const cell = document.createElement("div");
        cell.classList.add("cell");

        if (player.type === 'computer') {
            cell.addEventListener("click",()=>{
                try{
                    this.#gameLogic.playRound(i,j);
                    this.renderBoard(this.#gameLogic.getPlayers().computer);
                    alert('computer is playing');
                    //wait 1 sec
                    const timeout = setTimeout(() => {
                        this.#gameLogic.playRound();
                        this.renderBoard(this.#gameLogic.getPlayers().human);
                    }, 1000);
                } catch (err) {
                    alert(err.message);
                }
            });
        }
        const value = board.getValue(i, j);
        //css will consider if it is ship or not, or a 'hit ship', or 'sunk ship'
        if (value instanceof Ship) {
            cell.classList.add("ship");
        }
        if (board.checkHit(i, j)) {
            cell.classList.add("hit");
        }
        if (board.getValue(i,j) instanceof Ship && board.getValue(i,j).isSunk()) {
            cell.classList.add("sunk");
        }
        container.appendChild(cell);
    }
}

export default Render;
