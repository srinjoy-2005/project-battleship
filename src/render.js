import {Ship} from "./ship.js";

class Render {

    #gameLogic;// reference to game logic for accessing gameboard and players
    #lockBoard = false; 
    #gameOver= false;
    constructor(GameLogic){
        this.#gameLogic = GameLogic;  
    }

    renderButtons(){
        const buttonArea = document.querySelector(".button-area");
        buttonArea.innerHTML = ""; 
        const restartBtn = document.createElement("button");
        restartBtn.textContent = "Restart Game";
        restartBtn.addEventListener("click", () => {
            this.#gameLogic.createGame();
            const {human, computer} = this.#gameLogic.getPlayers();
            this.renderBoard(human);
            this.renderBoard(computer);
            this.displayStatus('Make a Move!');
            this.#gameOver = false;
        });
        buttonArea.appendChild(restartBtn);
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
        this.displayStatus('Make a Move!')
    }

    createCell(player, container, i, j) {
        const board = player.playerBoard;
        const cell = document.createElement("div");
        cell.classList.add("cell");

        // Human attacking Computer
        if (player.type === 'computer') {
            //function must be async to maintain order of execution after timeout
            cell.addEventListener("click", async () => {
                if (this.#lockBoard) return;
                if (this.#gameOver) return;

                try {
                    this.#lockBoard = true;

                    // Human attacks
                    const result = this.#gameLogic.playRound(i, j);
                    // re-render the computer board (the one we clicked)
                    this.renderBoard(this.#gameLogic.getPlayers().computer);

                    // Handle outcome messages / game-over for human attack
                    if (result === 'miss') {
                        this.displayStatus("Miss! Computer's turn...");
                    } else if (result === 'hit') {
                        this.displayStatus("Hit! You get another turn.");
                    } else if (result === 'hit-sunk') {
                        this.displayStatus("You sank a ship! You get another turn.");
                    } else if (result === 'human') {
                        // human won
                        this.displayStatus("Victory! You sank the fleet!");
                        this.#gameOver = true;
                        return;
                    }

                    // If human missed, run the computer's turn(s)
                    if (result === 'miss') {
                        // allow a short pause before computer starts
                        await new Promise(resolve => setTimeout(resolve, 800));

                        // Computer will keep playing while it hits (and stop when it misses)
                        let compResult;
                        do {
                            compResult = this.#gameLogic.playRound(); // no args -> computer branch inside playRound
                            // re-render human board to show computer hits/misses
                            this.renderBoard(this.#gameLogic.getPlayers().human);

                            if (compResult === 'hit') {
                                this.displayStatus("Computer scored a hit! Computer plays again...");
                            } else if (compResult === 'hit-sunk') {
                                this.displayStatus("Computer sank one of your ships! Computer plays again...");
                            } else if (compResult === 'miss') {
                                this.displayStatus("Computer missed. Your turn.");
                            } else if (compResult === 'computer') {
                                // computer won
                                this.#gameOver = true;
                                this.displayStatus("Defeat! The computer won.");
                                return;
                            }

                            // small delay between computer repeated moves
                            if (compResult === 'hit' || compResult === 'hit-sunk') {
                                await new Promise(resolve => setTimeout(resolve, 500));
                            }
                        } while (compResult === 'hit' || compResult === 'hit-sunk');
                    }

                } catch (err) {
                    this.displayStatus(err.message);
                } finally {
                    this.#lockBoard = false;
                }
            });
        }

        // --- 2. Styling Logic ---
        const value = board.getValue(i, j);
        const isHit = board.checkHit(i, j);

        if (value instanceof Ship) {
            if (player.type === 'human' || isHit) {
                cell.classList.add("ship");
            }
            
            // Sunk styling
            if (value.isSunk()) {
                cell.classList.add("sunk");
                
            }
        }

        // Hit/Miss styling
        if (isHit) {
            cell.classList.add("hit");
        }

        container.appendChild(cell);
    }

    displayStatus(message){
        const statusDiv = document.getElementById("status");
        statusDiv.textContent = message;
        console.log(message);
        
    }
}

export default Render;
