import "./styles.css"
import GameLogic from "./driver.js";
import Render from "./render.js";

const gameLogic = new GameLogic();
gameLogic.createGame();
const {human, computer} = gameLogic.getPlayers();


const render = new Render(gameLogic);
render.renderBoard(human);
render.renderBoard(computer);

