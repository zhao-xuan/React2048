import React from 'react';
import './App.css';
import Game from './Board'

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
      <Game />
    </div>
  );
}

export default App;
