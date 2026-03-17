//usage - first run startgame once for starting/restarting new game

import { Player } from "./player.js";

//Done: TODO: whole thing should be a class, need to have access to gameboard for displaying ui

class GameLogic{
    #setupShips(player) {
        player.playerBoard.placeShip(0,0,5,'x');
        player.playerBoard.placeShip(2,0,4,'x');
        player.playerBoard.placeShip(4,0,3,'x');
        player.playerBoard.placeShip(6,0,3,'x');
        player.playerBoard.placeShip(8,0,2,'x');
    }

    #switchPlayer() {
        this.currentPlayer =this.currentPlayer === 'human' ? 'computer' : 'human';
    }

    constructor(){
        this.human = null;
        this.computer = null;
        this.currentPlayer = 'human';
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
                this.human.playerBoard.receiveAttack(row, col);
                console.log(`Computer attacked (${row}, ${col})`);
                success = true; // attack succeeded
            } catch (err) {
                console.log(err.message);
                // already attacked → retry
            }
        }
    }
    
    playRound(row, column) {
        try {
            if (this.currentPlayer === 'human') {
                this.computer.playerBoard.receiveAttack(row, column);
                console.log(`Human attacked (${row}, ${column})`);
            } else {
                this.playRandom();
                console.log(`Computer attacked (${row}, ${column})`);
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

        this.#switchPlayer();
        return null;
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