import React from 'react';
import './App.css';
import Board from './Board'

/*
1. Define board and single grid
2. Define animations of sliding and merging
3. Define logics: key detection, move in four directions
4. Define MVC model: update UI
*/

const score = 0;

function App() {
  return (
    <div className="App">
      <div className="info">
        <h3 id="gameTitle">2048</h3>
        <h6 id="score">{score}</h6>
      </div>
      <Board />
    </div>
  );
}

export default App;
