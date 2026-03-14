import { Player } from "./player.js";

function startGame() {
    const human = new Player('human');
    const computer = new Player('computer');

    //predefined setup of ships on board
    human.playerBoard.placeShip(0, 0, 5, 'x');
    human.playerBoard.placeShip(2, 0, 4, 'x');
    human.playerBoard.placeShip(4, 0, 3, 'x');
    human.playerBoard.placeShip(6, 0, 3, 'x');
    human.playerBoard.placeShip(8, 0, 2, 'x');

    computer.playerBoard.placeShip(0, 0, 5, 'x');
    computer.playerBoard.placeShip(2, 0, 4, 'x');
    computer.playerBoard.placeShip(4, 0, 3, 'x');
    computer.playerBoard.placeShip(6, 0, 3, 'x');
    computer.playerBoard.placeShip(8, 0, 2, 'x');
    return {human, computer};
}

//returns 1 if game over, 0 otherwise
function playRound(previous, human, computer) {
    const current = previous === 'human' ? 'computer' : 'human';

    let success = false;

    while (!success) {
        const row = Math.floor(Math.random() * 10);
        const col = Math.floor(Math.random() * 10);

        try {
            if (current === 'computer') {
                human.playerBoard.receiveAttack(row, col);
                console.log(`Computer attacked (${row}, ${col})`);
            } else {
                computer.playerBoard.receiveAttack(row, col);
                console.log(`Human attacked (${row}, ${col})`);
            }
            success = true; // attack succeeded
        } catch (err) {
            // already attacked → retry
        }
    }

    if (human.playerBoard.allSunk()) {
        console.log('Computer wins!');
        return 1;
    }

    if (computer.playerBoard.allSunk()) {
        console.log('Human wins!');
        return 1;
    }

    return 0;
}

function playGame(){
    const {human, computer} = startGame();
    let currentPlayer = 'human';
    while (!playRound(currentPlayer, human, computer)) {
        currentPlayer = currentPlayer === 'human' ? 'computer' : 'human';
    }
}

export { playGame };