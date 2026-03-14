import {Ship} from '../ship.js';

test('ship can be hit', () => {
    const testShip = new Ship(1);
    testShip.hit();
    expect(testShip.isSunk()).toBe(true);
});

test('ship can be hit multiple times', () => {
    const testShip = new Ship(3);
    testShip.hit();
    testShip.hit();
    expect(testShip.isSunk()).toBe(false);
    testShip.hit();
    expect(testShip.isSunk()).toBe(true);
});