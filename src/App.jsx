import { useState } from 'react'


function Square({value, onClick}){
  return <button className = 'square' onClick = {onClick} >{value}</button>
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
      return true
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
      return true
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
      return true
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
      return true
    }
    return false
  }
  for (let x = 0; x < boardWidth; x++){
    for (let y = 0; y < boardWidth; y++){
      if (rightCheck(x,y) || downCheck(x,y) || downLeftCheck(x,y) || downRightCheck(x,y)){
        return buttonValues[x][y];
      }
    }
  }
  return null;
}
export default function Board(){
  const boardWidth = 10;
  const [gameState,setGameState] = useState('X')
  const [buttonValues, setButtonValues] = useState(Array(boardWidth).fill(null).map(() => Array(boardWidth).fill(null)))
  const winner = calculateWinner(buttonValues)
  function onClickSquare(x,y){
    if (winner){
      return
    }
    if (buttonValues[x][y] !== null){
      return
    }
    let buttonValuesCopy = buttonValues.slice()
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

  return(
    <>
      {buttonValues.map((row,r) => (<div className = 'board-row'>
        {row.map((value,i) => (<Square key ={`${r}-${i}`} value = {value} onClick = {()=> onClickSquare(r,i)}></Square>)
      )}
      </div>)
      )}
      <div>{winner ? `Player ${winner} won ` : `Next to move: Player ${gameState}`}</div>
    </>
  )
}