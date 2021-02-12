import * as React from "react";
import {Status, text} from '../const.js';
import {arrayToObject, calculateAccuracy, changeSymbolStatus} from '../utils.js';

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      score: 0,
      mistakes: 0,
      accurancy: 100,
      textArray: arrayToObject(text),
      currentKey: ``,
      currentLetter: ``,
      time: 0,
    };

    this.interval = null;

    this._successInter = this._successInter.bind(this);
    this._unsuccessInter = this._unsuccessInter.bind(this);
    this._resetScore = this._resetScore.bind(this);
    this._startTimer = this._startTimer.bind(this);
    this._stopTimer = this._stopTimer.bind(this);
    this._addOneSecond = this._addOneSecond.bind(this);
    this._keyPressHandler = this._keyPressHandler.bind(this);
    this._startButtonClickHandler = this._startButtonClickHandler.bind(this);
  }

  _addOneSecond() {
    this.setState((state) => {
      return {
        time: state.time + 1};
    });
  }

  _startTimer() {
    this.interval = setInterval(this._addOneSecond, 1000);
  }

  _stopTimer() {
    clearInterval(this.interval);
  }

  _successInter() {
    this.setState((state) => {
      return {
        textArray: changeSymbolStatus(state.textArray, state.currentLetter, Status.PASSED),
        score: state.score + 1};
    });
  }

  _resetScore() {
    this.setState({
      score: 0,
      textArray: arrayToObject(text),
    });
  }

  _unsuccessInter() {
    this.setState((state) => {
      return {
        textArray: changeSymbolStatus(state.textArray, state.currentLetter, Status.WRONG),
        mistakes: state.mistakes + 1,
      };
    });
  }

  _startButtonClickHandler() {
    this._startTimer();
  }

  _keyPressHandler(evt) {

    this.setState({currentKey: String.fromCharCode(evt.keyCode)});
    this.setState({currentLetter: this.state.textArray[this.state.score]});
    this.setState({accurancy: calculateAccuracy(this.state.score, this.state.mistakes)});


    if (this.state.currentKey === this.state.currentLetter.symbol) {
      this._successInter();

      if (this.state.score >= this.state.textArray.length) {
        this._resetScore();
        this._stopTimer();
      }
    } else {
      this._unsuccessInter();
    }
  }

  componentDidMount() {
    document.addEventListener(`keypress`, this._keyPressHandler);
  }

  render() {

    return (
      <div>
        <p>
          {this.state.textArray.map((it) => <span key={Math.random()} className={it.status}>{it.symbol}</span>)}
        </p>

        <p>
          Точность: {this.state.accurancy}%
        </p>

        <p>
          Скорость: {this.state.time} sec.
        </p>

        <button onClick={this._startButtonClickHandler}>Начать</button>

      </div>
    );
  }
}


export default App;

