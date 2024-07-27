import React, { useState, useEffect } from 'react';
import Square from './Square';
import {patterns} from '../winningPatterns';

export default function Game() {
  const GRIDSIZE = 3;
  const [grid, setGrid] = useState(new Array(Math.pow(GRIDSIZE, 2)).fill(""));
  const [move, setMove] = useState('X');
  const [result, setResult] = useState({
    status: '',
    winner: '',
    winningPattern: [],
  });

  const clickSquare = (idx) => {
    // click, update the grid at that spot to become current move
    if (grid[idx] === "" && result.status !== 'won')  {
      const updatedGrid = grid.map((slot, currIdx) => idx === currIdx ? move : slot);
      setGrid(updatedGrid)
    }
  };

  const changeMove = () => {
    if (move === 'X') setMove('O');
    else setMove('X');
  };

  const checkIfWin = () => {
    // loop through patterns
    // if first pattern isn't "", check the rest of the slots with a winning found true flag
    for (const pattern of patterns) {
      const shapeToCompare = grid[pattern[0]];
      if (shapeToCompare === '') continue;
      let winnerFound = true;
      for (const idx of pattern) {
        if (shapeToCompare !== grid[idx]) {
          winnerFound = false;
          continue;
        }
      }
      if (winnerFound === true) {
        // change state of game
        setResult({
          status: 'won',
          winner: move,
          winningPattern: pattern,
        })
      }
    }
  };

  const checkIfTie = () => {
    let allFilled = true;
    for (const slot of grid) {
      if (slot === "") allFilled = false;
    }
    if (allFilled && result.status !== 'won') {
      setResult({
        status: 'tie',
        winner: '',
        winningPattern: [],
      })
    }
  };

  const resetGame = () => {
    setGrid(new Array(Math.pow(GRIDSIZE, 2)).fill(""));
    changeMove();
    setResult({
      status: '',
      winner: '',
      winningPattern: [],
    })
  };

  useEffect(() => {
    checkIfWin();
    checkIfTie();
    changeMove();
  }, [grid])

  const renderGrid = grid.map((shape, idx) => <Square key={idx} shape={shape} clickAction={() => clickSquare(idx)} winningColor={result.winningPattern.includes(idx)}/>)

  return (
    <>
      {
        result.status === 'won' ?
          <div>
            <p>Winner! {result.winner} {result.status}!</p>
            <button onClick={resetGame}>Reset Game</button>
          </div>
        : result.status === 'tie' ?
          <div>
            <p>Tie!</p>
            <button onClick={resetGame}>Reset Game</button>
          </div>
        : <span>Current move: {move}</span>
      }

      <div className='grid' style={{ gridTemplateColumns: `repeat(${GRIDSIZE}, 1fr)` }}>
        {renderGrid}
      </div>
    </>
  )
};
