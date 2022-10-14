import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

function findFour(squares) {
  

  //horizontal winning lines
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 4; col++) {
      var v = squares[row][col];
      if (
        v != null &&
        squares[row][col + 1] === v &&
        squares[row][col + 2] === v &&
        squares[row][col + 3] === v
      ) {
        
        return [
          [row, col],
          [row, col + 1],
          [row, col + 2],
          [row, col + 3],
        ];
      }
    }
  }
  //vertical winning lines
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 7; col++) {
      const v = squares[row][col];
      if (
        v != null &&
        squares[row + 1][col] === v &&
        squares[row + 2][col] === v &&
        squares[row + 3][col] === v
      ) {
        return [
          [row, col],
          [row + 1, col],
          [row + 2, col],
          [row + 3, col],
        ];
      }
    }
  }

  //diagonal going down right to left
  for (let row = 0; row < 3; row++) {
    for (let col = 3; col < 7; col++) {
      const v = squares[row][col];
      if (
        v != null &&
        squares[row + 1][col - 1] === v &&
        squares[row + 2][col - 2] === v &&
        squares[row + 3][col - 3] === v
      ) {
        return [
          [row, col],
          [row + 1, col - 1],
          [row + 2, col - 2],
          [row + 3, col - 3],
        ];
      }
    }
  }
  //diagonal going up right to left
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 4; col++) {
      const v = squares[row][col];
      if (
        v != null &&
        squares[row + 1][col + 1] === v &&
        squares[row + 2][col + 2] === v &&
        squares[row + 3][col + 3] === v
      ) {
        return [
          [row, col],
          [row + 1, col + 1],
          [row + 2, col + 2],
          [row + 3, col + 3],
        ];
      }
    }
  }

  return null;
}

function Square(props) {
  var isN = false;

  if (props.value && props.value === "R") {
    isN = true;

    return (
      <button
        disabled={isN}
        className="squarered"
        onClick={props.onClick}
      ></button>
    );
  } else if (props.value && props.value === "Y") {
    isN = true;

    return (
      <button
        disabled={isN}
        className="squareyellow"
        onClick={props.onClick}
      ></button>
    );
  } else if (props.value && props.value === "W") {
    isN = true;

    return (
      <button
        disabled={isN}
        className="winningrow"
        onClick={props.onClick}
      ></button>
    );
  } else {
    return (
      <button
        disabled={isN}
        className="square hover-effect"
        onClick={props.onClick}
      ></button>
    );
  }
}

class Board extends React.Component {
  renderSquare(r, c) {
    return (
      <Square
        value={this.props.squares[r][c]}
        onClick={() => this.props.onClick(r, c)}
      />
    );
  }

  render() {
    return (
      <div className="backBoard">
        <div className="board-row">
          {this.renderSquare(5, 0)}
          {this.renderSquare(5, 1)}
          {this.renderSquare(5, 2)}
          {this.renderSquare(5, 3)}
          {this.renderSquare(5, 4)}
          {this.renderSquare(5, 5)}
          {this.renderSquare(5, 6)}
        </div>
        <div className="board-row">
          {this.renderSquare(4, 0)}
          {this.renderSquare(4, 1)}
          {this.renderSquare(4, 2)}
          {this.renderSquare(4, 3)}
          {this.renderSquare(4, 4)}
          {this.renderSquare(4, 5)}
          {this.renderSquare(4, 6)}
        </div>
        <div className="board-row">
          {this.renderSquare(3, 0)}
          {this.renderSquare(3, 1)}
          {this.renderSquare(3, 2)}
          {this.renderSquare(3, 3)}
          {this.renderSquare(3, 4)}
          {this.renderSquare(3, 5)}
          {this.renderSquare(3, 6)}
        </div>
        <div className="board-row">
          {this.renderSquare(2, 0)}
          {this.renderSquare(2, 1)}
          {this.renderSquare(2, 2)}
          {this.renderSquare(2, 3)}
          {this.renderSquare(2, 4)}
          {this.renderSquare(2, 5)}
          {this.renderSquare(2, 6)}
        </div>
        <div className="board-row">
          {this.renderSquare(1, 0)}
          {this.renderSquare(1, 1)}
          {this.renderSquare(1, 2)}
          {this.renderSquare(1, 3)}
          {this.renderSquare(1, 4)}
          {this.renderSquare(1, 5)}
          {this.renderSquare(1, 6)}
        </div>

        <div className="board-row">
          {this.renderSquare(0, 0)}
          {this.renderSquare(0, 1)}
          {this.renderSquare(0, 2)}
          {this.renderSquare(0, 3)}
          {this.renderSquare(0, 4)}
          {this.renderSquare(0, 5)}
          {this.renderSquare(0, 6)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      record: [
        {
          squares: Array(6).fill(Array(7).fill(null)),
        },
      ],
      xIsNext: true,
    };
  }

  handleClick(r, c) {
    const record = this.state.record;
    const current = record[record.length - 1];
    var squares1 = current.squares.slice();
    if (findFour(squares1) || squares1[r][c]) {
      return;
    }
    var idx = 0;
    while (true) {
      if (squares1[idx][c] == null) {
        break;
      }
      idx++;
    }

    var squares2 = squares1[idx].slice();
    squares2[c] = this.state.xIsNext ? "R" : "Y";
    squares1[idx] = squares2;
    this.setState({
      record: record.concat([
        {
          squares: squares1,
        },
      ]),
      xIsNext: !this.state.xIsNext,
    });
  }

  restart() {
    this.setState({
      record: [
        {
          squares: Array(6).fill(Array(7).fill(null)),
        },
      ],
      xIsNext: true,
    });
  }

  takeBack() {
    if (this.state.record.length === 1) {
      return;
    }
    this.setState({
      record: this.state.record.slice(0, this.state.record.length - 1),
      xIsNext: !this.state.xIsNext,
    });
  }

  

  render() {
    const record = this.state.record;
    const current = record[record.length - 1];
    const winner = findFour(current.squares);

    const restartBtn = (
      <button className="options hover-effect" onClick={() => this.restart()}>
        {"Restart"}
      </button>
    );
    const takeBackBtn = (
      <button className="options hover-effect" onClick={() => this.takeBack()}>
        {"Take Back Move"}
      </button>
    );

    let status;
    if (winner) {
      for (let x = 0; x < 4; x++) {
        current.squares[winner[x][0]][winner[x][1]] = "W";
      }

      status = "Winner: " + (this.state.xIsNext ? "Yellow" : "Red");
    } else {
      status = "Next player: " + (this.state.xIsNext ? "Red" : "Yellow");
    }
    return (
      <div>
        <h1 className="title"> {"CONNECT FOUR"} </h1>
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={(r, c) => this.handleClick(r, c)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
          </div>
          <div className="menu">
            <div>{restartBtn}</div>
            <div>{takeBackBtn}</div>
          </div>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
