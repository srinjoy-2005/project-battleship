//usage - first run startgame once for starting/restarting new game

import { Player } from "./player.js";

//Done: TODO: whole thing should be a class, need to have access to gameboard for displaying ui
//Done: TODO: display message if some ship is sunk

class GameLogic{
    #switchPlayer() {
        this.currentPlayer =this.currentPlayer === 'human' ? 'computer' : 'human';
    }


    #setupShips(player) {
        if (player.type === 'computer') {
            player.randomlyPlaceFleet();
        } else {
            // For human, we can implement a simple random placement for now
            // In a full implementation, you'd want to allow the user to choose placements
            player.randomlyPlaceFleet();
        }
    }
    constructor(){
        this.human = null;
        this.computer = null;
        this.currentPlayer = 'human';
        this.aiMemory = {
            hits: [],       // successful hits
            targets: []     // next cells to try
        };
    }

    createGame() {
        this.human = new Player('human');
        this.computer = new Player('computer');
        this.currentPlayer = 'human';

        this.#setupShips(this.human);
        this.#setupShips(this.computer);
    }



    getPlayers() {
        return {
            human: this.human,
            computer: this.computer
        };
    }

    getCurrentPlayer() {
        return this.currentPlayer;
    }

    playRandom(){
        //only for computer player
        if (this.currentPlayer !== 'computer') {
            throw new Error("playRandom can only be called for computer player");
        }
        let success = false;
        while (!success) {
            const row = Math.floor(Math.random() * 10);
            const col = Math.floor(Math.random() * 10);
            try {
                const result = this.human.playerBoard.receiveAttack(row, col);
                console.log(`Computer attacked (${row}, ${col})`);
                success = true; // attack succeeded
                return result;
            } catch (err) {
                console.log(err.message);
                // return err.message;
                // already attacked → retry
            }
        }
    }

    #getNeighbors(row, col) {
        const directions = [
            [1, 0], [-1, 0], [0, 1], [0, -1]
        ];

        return directions
            .map(([dr, dc]) => [row + dr, col + dc])
            .filter(([r, c]) => r >= 0 && r < 10 && c >= 0 && c < 10);
    }

    advancedPlayRandom() {
        if (this.currentPlayer !== 'computer') {
            throw new Error("advanced playRandom can only be called for computer player");
        }

        let row, col;

        // 🎯 TARGET MODE
        if (this.aiMemory.targets.length > 0) {
            [row, col] = this.aiMemory.targets.shift();
        } else {
            // 🔍 HUNT MODE (random)
            do {
                row = Math.floor(Math.random() * 10);
                col = Math.floor(Math.random() * 10);
            } while (this.human.playerBoard.checkHit(row, col));
        }

        let result;
        try {
            result = this.human.playerBoard.receiveAttack(row, col);
            console.log(`Computer attacked (${row}, ${col})`);
        } catch {
            return this.advancedPlayRandom(); // retry if invalid
        }

        // 🎯 If HIT → add neighbors
        if (result === 'hit') {
            this.aiMemory.hits.push([row, col]);

            const neighbors = this.#getNeighbors(row, col);

            neighbors.forEach(([r, c]) => {
                if (!this.human.playerBoard.checkHit(r, c)) {
                    this.aiMemory.targets.push([r, c]);
                }
            });
        }

        // 💀 If ship sunk → reset targeting
        if (result === 'hit-sunk') {
            this.aiMemory.hits = [];
            this.aiMemory.targets = [];
        }

        return result;
    }
    
    playRound(row, column) {
        let result='';
        try {
            if (this.currentPlayer === 'human') {
                result  = this.computer.playerBoard.receiveAttack(row, column);
                console.log(`Human attacked (${row}, ${column})`);
            } else {
                result = this.advancedPlayRandom();
            }
        } catch (err) {
            throw err;
        }

        if (this.human.playerBoard.allSunk()) {
            return 'computer';
        }

        if (this.computer.playerBoard.allSunk()) {
            return 'human';
        }

        if (result==='miss') this.#switchPlayer();
        return result;
    }
}

// const gameLogic = new GameLogic();
// gameLogic.createGame();
// const {human, computer} = gameLogic.getPlayers();
// const hboard = human.playerBoard;
// const cboard = computer.playerBoard;
// console.log(hboard.getSize());
// console.log(cboard.getSize());


export default GameLogic;

{
// let human;
// let computer;

// function startGame() {
//     human = new Player('human');
//     computer = new Player('computer');

//     //predefined setup of ships on board
//     human.playerBoard.placeShip(0, 0, 5, 'x');
//     human.playerBoard.placeShip(2, 0, 4, 'x');
//     human.playerBoard.placeShip(4, 0, 3, 'x');
//     human.playerBoard.placeShip(6, 0, 3, 'x');
//     human.playerBoard.placeShip(8, 0, 2, 'x');

//     computer.playerBoard.placeShip(0, 0, 5, 'x');
//     computer.playerBoard.placeShip(2, 0, 4, 'x');
//     computer.playerBoard.placeShip(4, 0, 3, 'x');
//     computer.playerBoard.placeShip(6, 0, 3, 'x');
//     computer.playerBoard.placeShip(8, 0, 2, 'x');
    
// }

// let currentPlayer= 'human';
// startGame();
// function playRound(row, column){
    
//     const current = currentPlayer === 'human' ? 'computer' : 'human';

//     try{
//         if (current === 'computer') {
//             human.playerBoard.receiveAttack(row, column);
//             console.log(`Computer attacked (${row}, ${column})`);
//         } else {
//             computer.playerBoard.receiveAttack(row, column);
//             console.log(`Human attacked (${row}, ${column})`);
//         }
//     }catch (err) {
//         console.error(err.message);
//         return err.message;
//     }

//     if (human.playerBoard.allSunk()) {
//         console.log('Computer wins!');
//         return 1;
//     }

//     if (computer.playerBoard.allSunk()) {
//         console.log('Human wins!');
//         return 1;
//     }

//     currentPlayer = current;
//     return 0;
// }

// {// The commented part below is for testing the modules in console

// // //returns 1 if game over, 0 otherwise
// // function playRound(previous, human, computer) {
// //     const current = previous === 'human' ? 'computer' : 'human';

// //     let success = false;

// //     while (!success) {
// //         const row = Math.floor(Math.random() * 10);
// //         const col = Math.floor(Math.random() * 10);

// //         try {
// //             if (current === 'computer') {
// //                 human.playerBoard.receiveAttack(row, col);
// //                 console.log(`Computer attacked (${row}, ${col})`);
// //             } else {
// //                 computer.playerBoard.receiveAttack(row, col);
// //                 console.log(`Human attacked (${row}, ${col})`);
// //             }
// //             success = true; // attack succeeded
// //         } catch (err) {
// //             console.error(err.message);
// //             // already attacked → retry
// //         }
// //     }

// //     if (human.playerBoard.allSunk()) {
// //         console.log('Computer wins!');
// //         return 1;
// //     }

// //     if (computer.playerBoard.allSunk()) {
// //         console.log('Human wins!');
// //         return 1;
// //     }

// //     return 0;
// // }

// // function playGame(){
// //     const {human, computer} = startGame();
// //     let currentPlayer = 'human';
// //     //playround returns 1 if game over, 0 otherwise
// //     while (!playRound(currentPlayer, human, computer)) {
// //         currentPlayer = currentPlayer === 'human' ? 'computer' : 'human';
// //     }
// // }

// // playGame();
// }

// export {startGame, playRound};
}