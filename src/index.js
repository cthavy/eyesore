import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" style={props.style} onClick={props.onClick}></button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.MAX_ROUNDS = 10;
    this.SIGHT_TIER = ['Color-blind', 'Below Average', 'Average', 'Eagle', 'Robot']
    this.ROUND_TIMER = 20000;

    this.state = {
      currentRound: 0,
      score: 0,
      answerSquare: 0,
      status: null,

      baseColor: 'rgb(251, 232, 106)',
      offColor: 'rgb(240, 230, 100)'
    }
  }

  componentDidMount() {
    this.nextRound();
  }

  nextRound() {
    if (this.state.currentRound === this.MAX_ROUNDS) {
      // end the game
      return;
    }

    // add pause and turn off touch

    let R = this.randomizeHelper(244);
    let G = this.randomizeHelper(244);
    let B = this.randomizeHelper(244);
    let d = this.randomizeHelper(2) === 1 ? 6 : -6; // add difficulty

    let answer = this.randomizeHelper(9);

    this.setState({
      answerSquare: answer,
      baseColor: `rgb(${R}, ${G}, ${B})`,
      offColor: `rgb(${R+d}, ${G+d}, ${B+d})`
    });
  }

  randomizeHelper(base) {
    return Math.floor(Math.random()*base);
  }

  handleClick(i) {
    let score = this.state.score;
    let status = false;
    if (this.checkAnswer(i)) {
      status = true;
      score++;
    }

    this.setState({
      status: status,
      score: score,
      currentRound: this.state.currentRound+1
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
        onClick={() => this.handleClick(i)}
        style={divStyle}
      />
    )
  }

  render() {
    let status = this.state.status ? 'Correct' : 'Find the odd one out';
    if (this.state.currentRound === this.MAX_ROUNDS) {
      status = `Game is over. Score: ${this.state.score}/${this.MAX_ROUNDS}`
    }

    // @todo create more squares per round
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

  /**
   * Check if clicked on was correct
   * */ 
  checkAnswer(i) {
    if (i === this.state.answerSquare) {
      console.log('correct');
      return true;
    } else {
      console.log('incorrect');
      return false;
    }
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
