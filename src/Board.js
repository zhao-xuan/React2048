import React from 'react'
import Tile from './Tile'

const normalColor = {
    0: ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0)"],
    2: ["green", "white"],
    4: ["green", "white"],
    8: ["green", "white"],
    16: ["green", "white"],
    32: ["green", "white"],
    64: ["green", "white"],
    128: ["green", "white"],
    256: ["green", "white"],
    512: ["green", "white"],
    1024: ["green", "white"],
    2048: ["green", "white"],
    4096: ["green", "white"],
    8192: ["green", "white"]
}

var cellSpace = 10;
var cellSideLength = 100;

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameboardState: [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ],
            numToGrid: normalColor,
            score: 0
        }
    }

    componentDidMount() {
        this.randomInitPosition(0.3);
    }

    randomInitPosition(probOfFour) {
        let gameboardState = this.state.gameboardState;
        let numOfInitialGrid = Math.random() < 0.5 ? 2 : 3;
        for (var i = 0; i < numOfInitialGrid; i++) {
            let x = Math.floor(Math.random() * 4);
            let y = Math.floor(Math.random() * 4);
            gameboardState[x][y] = Math.random() < probOfFour ? 4 : 2;
        }

        this.setState({ gameboardState: gameboardState });
    }

    generateNewTile(probOfFour) {
        let gameboardState = this.state.gameboardState;
        let countZeros = 0;
        for (var i = 0; i < gameboardState.length; i++) {
            for (var j = 0; j < gameboardState[i].length; j++) {
                if (gameboardState[i][j] === 0) {
                    countZeros++;
                }
            }
        }

        let random = Math.floor(Math.random() * countZeros);
        let fillZero = 0;
        for (var a = 0; a < gameboardState.length; a++) {
            for (var b = 0; b < gameboardState[a].length; b++) {
                if (random === fillZero && gameboardState[a][b] === 0) {
                    gameboardState[a][b] = Math.random() < probOfFour ? 4 : 2;
                    this.setState({ gameboardState: gameboardState });
                    return;
                }
                if (gameboardState[a][b] === 0) {
                    fillZero++;
                }
            }
        }
    }

    handleMove(e) {
        switch (e.keyCode) {
            case 37: if (this.handleMoveLeft()) { this.generateNewTile(0.3) } break;
            case 38: if (this.handleMoveUp()) { this.generateNewTile(0.3) } break;
            case 39: if (this.handleMoveRight()) { this.generateNewTile(0.3) } break;
            case 40: if (this.handleMoveDown()) { this.generateNewTile(0.3) } break;
            default: break;
        }
    }

    handleMoveUp() {
        let gameboardState = this.state.gameboardState;
        let moveTo = 0;
        var changed = false;
        for (var i = 1; i < gameboardState.length; i++) {
            for (var j = 0; j < gameboardState[i].length; j++) {
                if (gameboardState[i][j] !== 0) {
                    for (var k = i - 1; k >= 0; k--) {
                        let kth = gameboardState[k][j];
                        if (kth !== 0 && kth !== gameboardState[i][j]) {
                            moveTo = k + 1;
                            break;
                        }
                    }
                    if (moveTo !== i) {
                        if (gameboardState[moveTo][j] === 0) {
                            gameboardState[moveTo][j] = gameboardState[i][j];
                            gameboardState[i][j] = 0;
                        } else if (gameboardState[moveTo][j] === gameboardState[i][j]) {
                            gameboardState[moveTo][j] = gameboardState[i][j] * 2;
                            this.setState({score : this.state.score + gameboardState[i][j]*2})
                            gameboardState[i][j] = 0;
                        }
                        changed = true;
                    }
                }
                moveTo = 0;
            }
        }

        this.setState({ gameboardState: gameboardState });
        return changed;
    }

    handleMoveDown() {
        let gameboardState = this.state.gameboardState;
        let moveTo = gameboardState.length - 1;
        var changed = false;
        for (var i = gameboardState.length - 2; i >= 0; i--) {
            for (var j = 0; j < gameboardState[i].length; j++) {
                if (gameboardState[i][j] !== 0) {
                    for (var k = i + 1; k < gameboardState.length; k++) {
                        let kth = gameboardState[k][j];
                        if (kth !== 0 && kth !== gameboardState[i][j]) {
                            moveTo = k - 1;
                            break;
                        }
                    }
                    if (moveTo !== i) {
                        //animation
                        if (gameboardState[moveTo][j] === 0) {
                            gameboardState[moveTo][j] = gameboardState[i][j];
                            gameboardState[i][j] = 0;
                        } else if (gameboardState[moveTo][j] === gameboardState[i][j]) {
                            gameboardState[moveTo][j] = gameboardState[i][j] * 2;
                            this.setState({score : this.state.score + gameboardState[i][j]*2})
                            gameboardState[i][j] = 0;
                        }
                        changed = true;
                    }
                }

                moveTo = gameboardState.length - 1;
            }
        }

        this.setState({ gameboardState: gameboardState });
        return changed;
    }

    handleMoveLeft() {
        let gameboardState = this.state.gameboardState;
        let moveTo = 0;
        var changed = false;
        for (var i = 0; i < gameboardState.length; i++) {
            for (var j = 1; j < gameboardState[i].length; j++) {
                if (gameboardState[i][j] !== 0) {
                    for (var k = j - 1; k >= 0; k--) {
                        let kth = gameboardState[i][k]
                        if (kth !== 0 && kth !== gameboardState[i][j]) {
                            moveTo = k + 1;
                            break;
                        }
                    }
                    if (moveTo !== j) {
                        //animation
                        if (gameboardState[i][moveTo] === 0) {
                            gameboardState[i][moveTo] = gameboardState[i][j];
                            gameboardState[i][j] = 0;
                        } else if (gameboardState[i][moveTo] === gameboardState[i][j]) {
                            gameboardState[i][moveTo] = gameboardState[i][j] * 2;
                            this.setState({score : this.state.score + gameboardState[i][j]*2})
                            gameboardState[i][j] = 0;
                        }
                        changed = true;
                    }
                }

                moveTo = 0;
            }
        }

        this.setState({ gameboardState: gameboardState });
        return changed;
    }

    handleMoveRight() {
        let gameboardState = this.state.gameboardState;
        let moveTo = gameboardState.length - 1;
        var changed = false;
        for (var i = 0; i < gameboardState.length; i++) {
            for (var j = gameboardState[i].length - 2; j >= 0; j--) {
                if (gameboardState[i][j] !== 0) {
                    for (var k = j + 1; k < gameboardState[j].length; k++) {
                        let kth = gameboardState[i][k]
                        if (kth !== 0 && kth !== gameboardState[i][j]) {
                            moveTo = k - 1;
                            break;
                        }
                    }
                    if (moveTo !== j) {
                        //animation
                        if (gameboardState[i][moveTo] === 0) {
                            gameboardState[i][moveTo] = gameboardState[i][j];
                            gameboardState[i][j] = 0;
                        } else if (gameboardState[i][moveTo] === gameboardState[i][j]) {
                            gameboardState[i][moveTo] = gameboardState[i][j] * 2;
                            this.setState({score : this.state.score + gameboardState[i][j]*2})
                            gameboardState[i][j] = 0;
                        }
                        changed = true;
                    }
                }

                moveTo = gameboardState.length - 1;
            }
        }

        this.setState({ gameboardState: gameboardState });
        return changed;
    }

    renderGrid(x, y) {
        const num = this.state.gameboardState[x][y];
        const windowWidth = window.innerWidth / 2 - 250;
        const windowHeight = 160

        return (
            <Tile id={"tile-" + x + "-" + y} bgcolor={this.state.numToGrid[num][0]} numcolor={this.state.numToGrid[num][1]} left={windowWidth + 20 + y * 120} top={windowHeight + 20 + x * 123} num={num}></Tile>
        );
    }

    gridAnimation(fromx, fromy, to, dir) {
        var timer = null;
        var target = this.getPos(to, dir)
        var el = document.getElementById("tile-" + fromx + "-" + fromy);
        timer = setInterval(function () {
            if (parseInt(el.style[dir]) === target) {
                clearInterval(timer);
            }
            var speed = (target - parseInt(el.style[dir])) / 5;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            el.style[dir] = parseInt(el.style[dir]) + speed + 'px';
        }, 50)
    }

    getPos(i, dir) {
        let pos = cellSpace + i * (cellSpace * 2 + cellSideLength);
        return (dir === 'top') ? (pos + 106) : (pos + (window.innerWidth - 250))
    }

    newGame() {
        this.setState({ gameboardState : [
            [0, 0, 0, 0],
            [0, 4, 0, 0],
            [0, 0, 2, 0],
            [0, 0, 0, 0]
        ]})
    }

    render() {
        return (
            <div>
                <div className="info">
                    <h1 id="gameTitle">2048</h1>
                    <button id="newgame" onClick={e => this.newGame()}>New Game</button>
                    <h3 id="score">Score: {this.state.score}</h3>
                    <h3 id="bestscore">Best: {this.state.score}</h3>
                </div>
                <div className="gameboard" onKeyDown={e => this.handleMove(e)} tabIndex="0">
                    <div className="row" id="row-0">
                        <div className="boardGrid" id="board-0-0"></div>
                        <div className="boardGrid" id="board-0-1"></div>
                        <div className="boardGrid" id="board-0-2"></div>
                        <div className="boardGrid" id="board-0-3"></div>
                    </div>
                    <div className="row" id="row-1">
                        <div className="boardGrid" id="board-1-0"></div>
                        <div className="boardGrid" id="board-1-1"></div>
                        <div className="boardGrid" id="board-1-2"></div>
                        <div className="boardGrid" id="board-1-3"></div>
                    </div>
                    <div className="row" id="row-2">
                        <div className="boardGrid" id="board-2-0"></div>
                        <div className="boardGrid" id="board-2-1"></div>
                        <div className="boardGrid" id="board-2-2"></div>
                        <div className="boardGrid" id="board-2-3"></div>
                    </div>
                    <div className="row" id="row-3">
                        <div className="boardGrid" id="board-3-0"></div>
                        <div className="boardGrid" id="board-3-1"></div>
                        <div className="boardGrid" id="board-3-2"></div>
                        <div className="boardGrid" id="board-3-3"></div>
                    </div>
                    {this.renderGrid(0, 0)}
                    {this.renderGrid(0, 1)}
                    {this.renderGrid(0, 2)}
                    {this.renderGrid(0, 3)}
                    {this.renderGrid(1, 0)}
                    {this.renderGrid(1, 1)}
                    {this.renderGrid(1, 2)}
                    {this.renderGrid(1, 3)}
                    {this.renderGrid(2, 0)}
                    {this.renderGrid(2, 1)}
                    {this.renderGrid(2, 2)}
                    {this.renderGrid(2, 3)}
                    {this.renderGrid(3, 0)}
                    {this.renderGrid(3, 1)}
                    {this.renderGrid(3, 2)}
                    {this.renderGrid(3, 3)}
                </div>
            </div>
        )
    }
}