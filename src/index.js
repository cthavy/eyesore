import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" style={props.style} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);

    const MAX_ROUNDS = 10;
    const SIGHT_TIER = ['Color-blind', 'Below Average', 'Average', 'Eagle', 'Robot']
    const ROUND_TIMER = 10000;

    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,

      currentRound: 0,
      answerSquare: 0,
      baseColor: 'rgb(251, 232, 106)',
      offColor: 'rgb(240, 230, 100)'
    }
  }

  nextRound() {
    // todo add difficulty
    let R = Math.floor(Math.random()*245);
    let G = Math.floor(Math.random()*245);
    let B = Math.floor(Math.random()*245);

    this.setState({
      baseColor: `rgb(${R}, ${G}, ${B})`,
      offColor: `rgb(${R+5}, ${G+5}, ${B+5})`
    });
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (this.checkAnswer(squares) || squares[i]) return;

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    }, this.nextRound());
  }

  // render with random color and offset one
  renderSquare(i) {
    const divStyle = {
      backgroundColor: i === this.state.answerSquare ? this.state.offColor : this.state.baseColor,
      borderColor: i === this.state.answerSquare ? this.state.offColor : this.state.baseColor
    };

    return (
      <Square 
        value={this.state.squares[i]} 
        onClick={() => this.handleClick(i)}
        style={divStyle}
      />
    )
  }

  render() {
    const correct = this.checkAnswer(this.state.squares);
    let status = correct ? 'Correct' : ' ';

    // @todo create more squares per round
    // @question how do we make the css flexible enough as squares grow
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }

  /** @todo
   * Check if clicked on was correct
   * */ 
  checkAnswer(squares) {
    
  }
}

// @todo refactor naming
class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
