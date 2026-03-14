import {Player} from "../player.js";
import {GameBoard} from "../gameBoard.js";

test('player has a name and gameboard', () => {
    const testPlayer = new Player('human');
    expect(testPlayer.type).toBe('human');
    expect(testPlayer.playerBoard).toBeInstanceOf(GameBoard);
});