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

export default class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameboardState: [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ],
            numToGrid: normalColor
        }
    }
    componentDidMount() {
        this.randomInitPosition(0.3);
    }

    randomInitPosition(probOfFour) {
        let gameboardState = this.state.gameboardState;
        let numOfInitialGrid = Math.random() < 0.5 ? 2 : 3;
        for (var i = 0; i < numOfInitialGrid; i++) {
            let x = Math.floor(Math.random()*4);
            let y = Math.floor(Math.random()*4);
            gameboardState[x][y] = Math.random() < probOfFour ? 4 : 2;
        }
        console.log(gameboardState)

        this.setState({gameboardState : gameboardState});
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
        let random = Math.floor(Math.random()*countZeros);
        let fillZero = 0;
        for (var i = 0; i < gameboardState.length; i++) {
            for (var j = 0; j < gameboardState[i].length; j++) {
                if (random === fillZero) {
                    gameboardState[i][j] = Math.random() < probOfFour ? 4 : 2;
                    break;
                }
                if (gameboardState[i][j] === 0) {
                    fillZero++;
                }
            }
        }

        this.setState({gameboardState : gameboardState});
    }

    handleMove(e) {
        switch (e.keyCode) {
            case 37: this.handleMoveLeft(); break;
            case 38: this.handleMoveUp(); break;
            case 39: this.handleMoveRight(); break;
            case 40: this.handleMoveDown(); break;
            default : break;
        }

        this.generateNewTile(0.3)

        console.log(this.state.gameboardState);
    }

    handleMoveUp() {
        let gameboardState = this.state.gameboardState;
        let moveTo = 0;
        for (var i = gameboardState.length - 1; i > 0; i--) {
            for (var j = 0; j < gameboardState[i].length; j++) {
                for (var k = i - 1; k >= 0; k--) {
                    let kth = gameboardState[k][j];
                    if (kth !== 0 && kth !== gameboardState[i][j]) {
                        moveTo = k + 1;
                        break;
                    }
                }
                if (moveTo !== i) {
                    //animation
                    if (gameboardState[moveTo][j] === 0) {
                        gameboardState[moveTo][j] = gameboardState[i][j];
                        gameboardState[i][j] = 0;
                        this.setState({gameboardState: gameboardState});
                    } else if (gameboardState[moveTo][j] === gameboardState[i][j]) {
                        gameboardState[moveTo][j] = gameboardState[i][j] * 2;
                        gameboardState[i][j] = 0;
                        this.setState({gameboardState: gameboardState});
                    }
                }
            }
        }
    }

    handleMoveDown() {
        let gameboardState = this.state.gameboardState;
        let moveTo = gameboardState.length - 1;
        for (var i = 0; i < gameboardState.length - 1; i++) {
            for (var j = 0; j < gameboardState[i].length; j++) {
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
                        this.setState({gameboardState: gameboardState});
                    } else if (gameboardState[moveTo][j] === gameboardState[i][j]) {
                        gameboardState[moveTo][j] = gameboardState[i][j] * 2;
                        gameboardState[i][j] = 0;
                        this.setState({gameboardState: gameboardState});
                    }
                }
            }
        }
    }

    handleMoveLeft() {
        let gameboardState = this.state.gameboardState;
        let moveTo = 0;
        for (var i = 0; i < gameboardState.length; i++) {
            for (var j = 1; j < gameboardState[i].length; j++) {
                for (var k = j - 1; k > 0; k--) {
                    let kth = gameboardState[i][k]
                    if (kth !== 0 && kth !== gameboardState[i][j]) {
                        moveTo = k + 1;
                        break;
                    }
                }
                console.log(moveTo + "@@@" + i)
                if (moveTo !== i) {
                    //animation
                    if (gameboardState[i][moveTo] === 0) {
                        gameboardState[i][moveTo] = gameboardState[i][j];
                        gameboardState[i][j] = 0;
                        this.setState({gameboardState: gameboardState});
                    } else if (gameboardState[i][moveTo] === gameboardState[i][j]) {
                        gameboardState[i][moveTo] = gameboardState[i][j] * 2;
                        gameboardState[i][j] = 0;
                        this.setState({gameboardState: gameboardState});
                    }
                }
            }
        }
    }

    handleMoveRight() {
        let gameboardState = this.state.gameboardState;
        let moveTo = -1;
        for (var i = gameboardState.length - 1; i > 0; i--) {
            for (var j = 0; j < gameboardState[i].length - 1; j++) {
                for (var k = i + 1; k < gameboardState.length[i]; k++) {
                    let kth = gameboardState[i][k]
                    if (kth !== 0 && kth !== gameboardState[i][j]) {
                        moveTo = k - 1;
                        break;
                    }
                }
                if (moveTo !== i) {
                    //animation
                    if (gameboardState[i][moveTo] === 0) {
                        gameboardState[i][moveTo] = gameboardState[i][j];
                        gameboardState[i][j] = 0;
                        this.setState({gameboardState: gameboardState});
                    } else if (gameboardState[i][moveTo] === gameboardState[i][j]) {
                        gameboardState[i][moveTo] = gameboardState[i][j] * 2;
                        gameboardState[i][j] = 0;
                        this.setState({gameboardState: gameboardState});
                    }
                }
            }
        }
    }

    renderGrid(x, y) {
        const num = this.state.gameboardState[x][y];

        return (
            <Tile id={"tile-" + x + "-" + y} bgcolor={this.state.numToGrid[num][0]} numcolor={this.state.numToGrid[num][1]} num={num}></Tile>
        );
    }

    render() {
        return (
            <div className="gameboard" onKeyDown={e => this.handleMove(e)} tabIndex="0">
                <div className="row" id="row-0">
                    <div className="boardGrid" id="board-0-0">{this.renderGrid(0, 0)}</div>
                    <div className="boardGrid" id="board-0-1">{this.renderGrid(0, 1)}</div>
                    <div className="boardGrid" id="board-0-2">{this.renderGrid(0, 2)}</div>
                    <div className="boardGrid" id="board-0-3">{this.renderGrid(0, 3)}</div>
                </div>
                <div className="row" id="row-1">
                    <div className="boardGrid" id="board-1-0">{this.renderGrid(1, 0)}</div>
                    <div className="boardGrid" id="board-1-1">{this.renderGrid(1, 1)}</div>
                    <div className="boardGrid" id="board-1-2">{this.renderGrid(1, 2)}</div>
                    <div className="boardGrid" id="board-1-3">{this.renderGrid(1, 3)}</div>
                </div>
                <div className="row" id="row-2">
                    <div className="boardGrid" id="board-2-0">{this.renderGrid(2, 0)}</div>
                    <div className="boardGrid" id="board-2-1">{this.renderGrid(2, 1)}</div>
                    <div className="boardGrid" id="board-2-2">{this.renderGrid(2, 2)}</div>
                    <div className="boardGrid" id="board-2-3">{this.renderGrid(2, 3)}</div>
                </div>
                <div className="row" id="row-3">
                    <div className="boardGrid" id="board-3-0">{this.renderGrid(3, 0)}</div>
                    <div className="boardGrid" id="board-3-1">{this.renderGrid(3, 1)}</div>
                    <div className="boardGrid" id="board-3-2">{this.renderGrid(3, 2)}</div>
                    <div className="boardGrid" id="board-3-3">{this.renderGrid(3, 3)}</div>
                </div>
            </div>
        )
    }
}