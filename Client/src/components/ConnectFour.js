import { useState } from 'react';
import '../App.css';
import MyForm from './ScoreForm';

function Square({value, onSquareClick, color}) {
    return (
        <button style={{ color: color ? '#06D6A0' : '#EF476F' }} className="square btn border" onClick={onSquareClick}>
            {value}
        </button>
    );
}

function calculateWinner(squares) {
  const lines = [
    [0, 8, 16, 24],
    [1, 9, 17, 25],
    [2, 10, 18, 26],
    [3, 11, 19, 27],
    [3, 9, 15, 21],
    [4, 10, 16, 22],
    [5, 11, 17, 23],
    [6, 12, 18, 24],
    [7, 15, 23, 31],
    [8, 16, 24, 32],
    [9, 17, 25, 33],
    [10, 18, 26, 34],
    [10, 16, 22, 28],
    [11, 17, 23, 29],
    [12, 18, 24, 30],
    [13, 19, 25, 31],
    [14, 22, 30, 38],
    [15, 23, 31, 39],
    [16, 24, 32, 40],
    [17, 25, 33, 41],
    [17, 23, 29, 35],
    [18, 24, 30, 36],
    [19, 25, 31, 37],
    [20, 26, 32, 38],
    [0, 1, 2, 3],
    [1, 2, 3, 4],
    [2, 3, 4, 5],
    [3, 4, 5, 6],
    [7, 8, 9, 10],
    [8, 9, 10, 11],
    [9, 10, 11, 12],
    [10, 11, 12, 13],
    [14, 15, 16, 17],
    [15, 16, 17, 18],
    [16, 17, 18, 19],
    [17, 18, 19, 20],
    [21, 22, 23, 24],
    [22, 23, 24, 25],
    [23, 24, 25, 26],
    [24, 25, 26, 27],
    [28, 29, 30, 31],
    [29, 30, 31, 32],
    [30, 31, 32, 33],
    [31, 32, 33, 34],
    [35, 36, 37, 38],
    [36, 37, 38, 39],
    [37, 38, 39, 40],
    [38, 39, 40, 41],
    [0, 7, 14, 21],
    [1, 8, 15, 22],
    [2, 9, 16, 23],
    [3, 10, 17, 24],
    [4, 11, 18, 25],
    [5, 12, 19, 26],
    [6, 13, 20, 27],
    [7, 14, 21, 28],
    [8, 15, 22, 29],
    [9, 16, 23, 30],
    [10, 17, 24, 31],
    [11, 18, 25, 32],
    [12, 19, 26, 33],
    [13, 20, 27, 34],
    [14, 21, 28, 35],
    [15, 22, 29, 36],
    [16, 23, 30, 37],
    [17, 24, 31, 38],
    [18, 25, 32, 39],
    [19, 26, 33, 40],
    [20, 27, 34, 41]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c, d] = lines[i];
    if (
        squares[a].value !== "" && 
        squares[a].value === squares[b].value && 
        squares[a].value === squares[c].value && 
        squares[a].value === squares[d].value
    ){
        return squares[a].value;
    }
  }
  for(let i = 0; i < squares.length; i++) {
    if(squares[i].value === ""){
        return null;
    }
  }
  return "Tie";
}

export default function Board() {
    const [squares, setSquares] = useState(Array(42).fill({color: true, value: ""}));
    const [color, setColor] = useState(true);
    const [xIsNext, setXIsNext] = useState(true);
    const [Moves, setMoves] = useState(0);
    function handleClick(i) {
        if (calculateWinner(squares) || squares[i].value !== "") {
            return;
        }
        let maxInCol = i + (7 * 5);
        for(let j = 1; j < 7; j++) {
            if(squares[maxInCol].value === "") {
                break;
            }
            maxInCol -= 7;
        }
        const nextSquares = squares.map((square, i) => {
            if(i === maxInCol) {
                return {
                    color: !color,
                    value: xIsNext ? 'X' : 'O'
                }
            }
            return square;
        });
        setSquares(nextSquares);
        setXIsNext(!xIsNext);
        setColor(!color);
        setMoves(Moves + 1);     
    }

    const winner = calculateWinner(squares);
    let status;
    let gameIsOver = false;
    if (winner === "Tie") {
        status = 'Winner: Tie';
    } else if(winner){
        status = 'Winner: ' + winner;
        gameIsOver = true;
    } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

  return (
    <>
        <div className='ms-4'>
            <div className="status h5 mt-3">{status}</div>
            <div className="status h6 mt-2">Total Moves: {Moves}</div>
            <div className="board-row">
                <Square color={squares[0].color} value={squares[0].value} onSquareClick={() => handleClick(0)} />
                <Square color={squares[1].color} value={squares[1].value} onSquareClick={() => handleClick(1)} />
                <Square color={squares[2].color} value={squares[2].value} onSquareClick={() => handleClick(2)} />
                <Square color={squares[3].color} value={squares[3].value} onSquareClick={() => handleClick(3)} />
                <Square color={squares[4].color} value={squares[4].value} onSquareClick={() => handleClick(4)} />
                <Square color={squares[5].color} value={squares[5].value} onSquareClick={() => handleClick(5)} />
                <Square color={squares[6].color} value={squares[6].value} onSquareClick={() => handleClick(6)} />
            </div>
            <div className="board-row">
                <Square color={squares[7].color} value={squares[7].value} onSquareClick={() => handleClick(0)} />
                <Square color={squares[8].color} value={squares[8].value} onSquareClick={() => handleClick(1)} />
                <Square color={squares[9].color} value={squares[9].value} onSquareClick={() => handleClick(2)} />
                <Square color={squares[10].color} value={squares[10].value} onSquareClick={() => handleClick(3)} />
                <Square color={squares[11].color} value={squares[11].value} onSquareClick={() => handleClick(4)} />
                <Square color={squares[12].color} value={squares[12].value} onSquareClick={() => handleClick(5)} />
                <Square color={squares[13].color} value={squares[13].value} onSquareClick={() => handleClick(6)} />
            </div>
            <div className="board-row">
                <Square color={squares[14].color} value={squares[14].value} onSquareClick={() => handleClick(0)} />
                <Square color={squares[15].color} value={squares[15].value} onSquareClick={() => handleClick(1)} />
                <Square color={squares[16].color} value={squares[16].value} onSquareClick={() => handleClick(2)} />
                <Square color={squares[17].color} value={squares[17].value} onSquareClick={() => handleClick(3)} />
                <Square color={squares[18].color} value={squares[18].value} onSquareClick={() => handleClick(4)} />
                <Square color={squares[19].color} value={squares[19].value} onSquareClick={() => handleClick(5)} />
                <Square color={squares[20].color} value={squares[20].value} onSquareClick={() => handleClick(6)} />
            </div>
            <div className="board-row">
                <Square color={squares[21].color} value={squares[21].value} onSquareClick={() => handleClick(0)} />
                <Square color={squares[22].color} value={squares[22].value} onSquareClick={() => handleClick(1)} />
                <Square color={squares[23].color} value={squares[23].value} onSquareClick={() => handleClick(2)} />
                <Square color={squares[24].color} value={squares[24].value} onSquareClick={() => handleClick(3)} />
                <Square color={squares[25].color} value={squares[25].value} onSquareClick={() => handleClick(4)} />
                <Square color={squares[26].color} value={squares[26].value} onSquareClick={() => handleClick(5)} />
                <Square color={squares[27].color} value={squares[27].value} onSquareClick={() => handleClick(6)} />
            </div>
            <div className="board-row">
                <Square color={squares[28].color} value={squares[28].value} onSquareClick={() => handleClick(0)} />
                <Square color={squares[29].color} value={squares[29].value} onSquareClick={() => handleClick(1)} />
                <Square color={squares[30].color} value={squares[30].value} onSquareClick={() => handleClick(2)} />
                <Square color={squares[31].color} value={squares[31].value} onSquareClick={() => handleClick(3)} />
                <Square color={squares[32].color} value={squares[32].value} onSquareClick={() => handleClick(4)} />
                <Square color={squares[33].color} value={squares[33].value} onSquareClick={() => handleClick(5)} />
                <Square color={squares[34].color} value={squares[34].value} onSquareClick={() => handleClick(6)} />
            </div>
            <div className="board-row">
                <Square color={squares[35].color} value={squares[35].value} onSquareClick={() => handleClick(0)} />
                <Square color={squares[36].color} value={squares[36].value} onSquareClick={() => handleClick(1)} />
                <Square color={squares[37].color} value={squares[37].value} onSquareClick={() => handleClick(2)} />
                <Square color={squares[38].color} value={squares[38].value} onSquareClick={() => handleClick(3)} />
                <Square color={squares[39].color} value={squares[39].value} onSquareClick={() => handleClick(4)} />
                <Square color={squares[40].color} value={squares[40].value} onSquareClick={() => handleClick(5)} />
                <Square color={squares[41].color} value={squares[41].value} onSquareClick={() => handleClick(6)} />
            </div>
        </div>     
        <MyForm gameIsOver={gameIsOver} moves={Moves} />
    </>
  );
}
