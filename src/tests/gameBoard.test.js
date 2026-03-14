import {GameBoard as board} from "../gameBoard.js";
import { Ship } from "../ship.js";

test('empty gameboard creation', () => {
    const testGameBoard = new board(5);
    for(let i=0; i<5; i++){
        for(let j=0; j<5; j++){
            expect(testGameBoard.getValue(i,j)).toBe(null);
        }
    }
});

test('gameboard can place ship', () => {
    const testGameBoard = new board();
    const ship = new Ship(3);   
    testGameBoard.placeShip(1, 1, 3, 'x');
    expect(testGameBoard.getValue(1,1)).toBeInstanceOf(Ship);
    expect(testGameBoard.getValue(1,2)).toBeInstanceOf(Ship);
    expect(testGameBoard.getValue(1,3)).toBeInstanceOf(Ship);
});
test('gameboard can place ship vertically', () => {
    const testGameBoard = new board();
    const ship = new Ship(3);   
    testGameBoard.placeShip(1, 1, 3, 'y');
    expect(testGameBoard.getValue(1,1)).toBeInstanceOf(Ship);
    expect(testGameBoard.getValue(2,1)).toBeInstanceOf(Ship);
    expect(testGameBoard.getValue(3,1)).toBeInstanceOf(Ship);
});

test("cannot place ship outside board", () => {
    const testBoard = new board();

    const result = testBoard.placeShip(0,8,4,'x');

    expect(result).toBe(false);
});

test("cannot place overlapping ships", () => {
    const testBoard = new board();
    testBoard.placeShip(1,1,3,'x');

    const result = testBoard.placeShip(1,2,3,'x');

    expect(result).toBe(false);
});

test('gameboard can receive attack', () => {
    const testGameBoard = new board();
    testGameBoard.placeShip(0, 0, 3, 'x');
    testGameBoard.placeShip(1, 1, 3, 'x');

    const result = testGameBoard.receiveAttack(0,2);
    expect(result).toBe(true);
    expect(testGameBoard.getValue(1,2).isSunk()).toBe(false);
});

test('gameboard can check if all ships are sunk', () => {
    const testGameBoard = new board();
    testGameBoard.placeShip(0, 0, 2, 'x');
    testGameBoard.placeShip(1, 1, 2, 'x');

    expect(testGameBoard.allSunk()).toBe(false);

    testGameBoard.receiveAttack(0,0);
    testGameBoard.receiveAttack(0,1);
    expect(testGameBoard.allSunk()).toBe(false);

    testGameBoard.receiveAttack(1,1);
    testGameBoard.receiveAttack(1,2);
    expect(testGameBoard.allSunk()).toBe(true);
});

test('gameboard cannot receive attack on same cell twice', () => {
    const testGameBoard = new board();
    testGameBoard.placeShip(0, 0, 2, 'x');

    testGameBoard.receiveAttack(0,0);
    expect(() => testGameBoard.receiveAttack(0,0)).toThrow('Already attacked this cell');
});