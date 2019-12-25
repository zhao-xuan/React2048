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
            gameboardState: Array(4).fill(Array(4).fill(2)),
            numToGrid: normalColor
        }
    }

    randomPosition(probOfFour) {
        let numOfInitialGrid = Math.random() < 0.5 ? 2 : 3;
        for (var i = 0; i < numOfInitialGrid; i++) {
            let x = Math.floor(Math.random()*4);
            let y = Math.floor(Math.random()*4);
            this.state.gameboardState[x][y] = Math.random() < probOfFour ? 4 : 2;
        }
    }

    handleMove(e) {
        switch (e.keyCode) {
            case 37: this.handleMoveLeft(); alert(); break;
            case 38: this.handleMoveUp(); break;
            case 39: this.handleMoveRight(); break;
            case 40: this.handleMoveDown(); break;
            default : break;
        }
    }

    handleMoveUp() {
        let gameboardState = this.state.gameboardState;
        let moveTo = 0;
        for (var i = gameboardState.length - 1; i > 0; i--) {
            for (var j = 0; j < gameboardState[i].length; j++) {
                for (var k = i - 1; k >= 0; k--) {
                    let kth = gameboardState[k][j];
                    if (kth != 0 && kth != gameboardState[i][j]) {
                        moveTo = k + 1;
                        break;
                    }
                }
                if (moveTo != i) {
                    //animation
                    var temp = this.state.gameboardState[i][j];
                    this.state.gameboardState[i][j] = this.state.gameboardState[moveTo][j];
                    this.state.gameboardState[moveTo][j] = temp;
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
                    if (kth != 0 && kth != gameboardState[i][j]) {
                        moveTo = k - 1;
                        break;
                    }
                }
                if (moveTo != i) {
                    //animation
                    var temp = this.state.gameboardState[i][j];
                    this.state.gameboardState[i][j] = this.state.gameboardState[moveTo][j];
                    this.state.gameboardState[moveTo][j] = temp;
                }
            }
        }
    }

    handleMoveLeft() {
        let gameboardState = this.state.gameboardState;
        let moveTo = 0;
        for (var i = 0; i < gameboardState; i++) {
            for (var j = gameboardState[i].length - 1; j > 0; j--) {
                for (var k = j - 1; k >= 0; k--) {
                    let kth = gameboardState[i][k]
                    if (kth != 0 && kth != gameboardState[i][j]) {
                        moveTo = k + 1;
                        break;
                    }
                }
                if (moveTo != i) {
                    //animation
                    var temp = this.state.gameboardState[i][j];
                    this.state.gameboardState[i][j] = this.state.gameboardState[i][moveTo];
                    this.state.gameboardState[i][moveTo] = temp;
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
                    if (kth != 0 && kth != gameboardState[i][j]) {
                        moveTo = k - 1;
                        break;
                    }
                }
                if (moveTo != i) {
                    //animation
                    var temp = this.state.gameboardState[i][j];
                    this.state.gameboardState[i][j] = this.state.gameboardState[i][moveTo];
                    this.state.gameboardState[i][moveTo] = temp;
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
            <div className="gameboard" onKeyDown={(e) => this.handleMove(e)}>
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