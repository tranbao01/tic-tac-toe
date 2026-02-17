import { useState } from 'react'
import './App.css'

function Square({value, onClick, highlight}){
  return <button className = {`square ${highlight ? 'win' : ''}`} onClick = {onClick} >{value}</button>
}
function calculateWinner(buttonValues){
  let boardWidth = buttonValues.length
  function downCheck(x,y){
    const button = buttonValues[x][y]
    if (button === null){
      return false
    }
    let count = 0
    let checker = x
    while (count < 4 && checker < boardWidth) {
      count += 1
      checker += 1
      const nextButton = buttonValues[checker][y]
      if (nextButton === button){
        continue
      }
      else {
        return false
      }
    }
    if (count === 4){
      return [[x,y],[x+1,y],[x+2,y],[x+3,y],[x+4,y]]
    }
    return false
  }
  function rightCheck(x,y){
    const button = buttonValues[x][y]
    if (button === null){
      return false
    }
    let count = 0
    let checker = y
    while (count < 4 && checker < boardWidth) {
      count += 1
      checker += 1
      const nextButton = buttonValues[x][checker]
      if (nextButton === button){
        continue
      }
      else {
        return false
      }
    }
    if (count === 4){
      return [[x,y],[x,y+1],[x,y+2],[x,y+3],[x,y+4]]
    }
    return false
  }
  function downRightCheck(x,y){
    const button = buttonValues[x][y]
    if (button === null){
      return false
    }
    let count = 0
    let checker1 = x
    let checker2 = y
    while (count < 4 && checker1 < boardWidth && checker2 < boardWidth) {
      count += 1
      checker1 += 1
      checker2 += 1
      const nextButton = buttonValues[checker1][checker2]
      if (nextButton === button){
        continue
      }
      else {
        return false
      }
    }
    if (count === 4){
      return [[x,y],[x+1,y+1],[x+2,y+2],[x+3,y+3],[x+4,y+4]]
    }
    return false
  }
  function downLeftCheck(x,y){
    const button = buttonValues[x][y]
    if (button === null){
      return false
    }
    let count = 0
    let checker1 = x
    let checker2 = y
    while (count < 4 && checker1 < boardWidth  && checker2 >= 0) {
      count += 1
      checker1 += 1
      checker2 -= 1
      const nextButton = buttonValues[checker1][checker2]
      if (nextButton === button){
        continue
      }
      else {
        return false
      }
    }
    if (count === 4){
      return [[x,y],[x+1,y-1],[x+2,y-2],[x+3,y-3],[x+4,y-4]]
    }
    return false
  }
  for (let x = 0; x < boardWidth; x++){
    for (let y = 0; y < boardWidth; y++){
      if (rightCheck(x,y) || downCheck(x,y) || downLeftCheck(x,y) || downRightCheck(x,y)){
        return rightCheck(x,y) || downCheck(x,y) || downLeftCheck(x,y) || downRightCheck(x,y) ;
      }
    }
  }
  return null;
}
export default function Board(){
  const boardWidth = 20;
  const [gameState,setGameState] = useState('X')
  const [buttonValues, setButtonValues] = useState(Array(boardWidth).fill(null).map(() => Array(boardWidth).fill(null)))
  const winner = calculateWinner(buttonValues)
  function isWinningLine(x,y){
    if (!winner){
      return false
    }
    if (winner.some(([r,c]) => r === x && c === y)) {
      return true
    }
    return false
  }
  function onClickSquare(x,y){
    if (winner){
      return
    }
    if (buttonValues[x][y] !== null){
      return
    }
    let buttonValuesCopy = buttonValues.map(row => row.slice());
    if (gameState === 'X'){
      buttonValuesCopy[x][y] = 'X'
      setGameState('O')
    }
    else if (gameState === 'O'){
      buttonValuesCopy[x][y] = 'O'
      setGameState('X')
    }
    setButtonValues(buttonValuesCopy)
    if (calculateWinner(buttonValuesCopy)){
      setGameState('X')
      setTimeout(() =>
        setButtonValues(Array(boardWidth).fill(null).map(() => Array(boardWidth).fill(null))),2000
      )
        
      
      
    }
  }

  return (
  <div className="board-shell">
    {buttonValues.map((row, r) => (
      <div className="board-row" key={r}>
        {row.map((value, i) => (
          <Square
            key={`${r}-${i}`}
            value={value}
            onClick={() => onClickSquare(r, i)}
            highlight = {winner ? isWinningLine(r, i) : false}
          />
        ))}
      </div>
    ))}
    <div className="status">
      {winner ? `Player ${buttonValues[winner[0][0]][winner[0][1]]} won` : <>Next to move: <span className="muted">Player {gameState}</span></>}
    </div>
  </div>
);

}