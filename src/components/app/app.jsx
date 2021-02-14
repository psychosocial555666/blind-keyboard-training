import * as React from "react";
import {Status, URL, ScreenType} from '../const.js';
import {arrayToObject, calculateAccuracy, calculateSpeed, changeSymbolStatus} from '../utils.js';
import API from "../api.js";
import MainScreen from "../main/main.jsx";
import WelcomeScreen from "../welcome/welcome.jsx";
import ResultScreen from "../result/result.jsx";
import TotalScreen from "../total/total.jsx";

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      score: 0,
      mistakes: 0,
      accurancy: 100,
      speed: 0,
      textArray: [],
      currentKey: ``,
      currentLetter: ``,
      time: 0,
      screen: ScreenType.WELCOME,
      results: [],
    };

    this.interval = null;
    this.storage = null;

    this._renderScreen = this._renderScreen.bind(this);
    this._switchScreen = this._switchScreen.bind(this);
    this._successInter = this._successInter.bind(this);
    this._unsuccessInter = this._unsuccessInter.bind(this);
    this._resetScore = this._resetScore.bind(this);
    this._startTimer = this._startTimer.bind(this);
    this._stopTimer = this._stopTimer.bind(this);
    this._getText = this._getText.bind(this);
    this._addOneSecond = this._addOneSecond.bind(this);
    this._writeUserResults = this._writeUserResults.bind(this);
    this._keyPressHandler = this._keyPressHandler.bind(this);
    this._startButtonClickHandler = this._startButtonClickHandler.bind(this);
    this._resultButtonClickHandler = this._resultButtonClickHandler.bind(this);
    this._userFormSubmitHandler = this._userFormSubmitHandler.bind(this);

  }

  _renderScreen(screen) {
    switch (screen) {
      case ScreenType.WELCOME:
        return (
          <WelcomeScreen
            onStartButtonClick={this._startButtonClickHandler}
          />
        );
      case ScreenType.MAIN:
        return (
          <MainScreen
            textArray={this.state.textArray}
            accurancy={this.state.accurancy}
            speed={this.state.speed}
            onKeyPress={this._keyPressHandler}/>
        );
      case ScreenType.RESULT:
        return (
          <ResultScreen results={this.state.results}/>
        );
      case ScreenType.TOTAL:
        return (
          <TotalScreen
            accurancy={this.state.accurancy}
            speed={this.state.speed}
            onUserFormSubmit={this._userFormSubmitHandler}
          />
        );
      default:
        break;
    }

    return null;
  }

  _addOneSecond() {
    this.setState((state) => {
      return {
        time: state.time + 1
      };
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
        score: state.score + 1
      };
    });
  }

  _resetScore() {
    this.setState({
      score: 0,
      mistakes: 0,
      accurancy: 100,
      speed: 0,
      currentKey: ``,
      currentLetter: ``,
      time: 0,
    });
    this._getText();
  }

  _unsuccessInter() {
    this.setState((state) => {
      return {
        textArray: changeSymbolStatus(state.textArray, state.currentLetter, Status.WRONG),
        mistakes: state.mistakes + 1,
      };
    });
  }

  _switchScreen(currentScreen) {
    this.setState({
      screen: currentScreen,
    });
  }

  _writeUserResults(username, speed, accurancy) {
    let currentResult = {
      name: username,
      userSpeed: speed,
      userAccurancy: accurancy
    };
    this.setState((state) => {
      return {
        results: state.results.concat(currentResult),
      };
    });
  }

  _userFormSubmitHandler(evt) {
    evt.preventDefault();
    let username = document.querySelector(`.total-screen__username`).value;
    this._writeUserResults(username, this.state.speed, this.state.accurancy);
    this._resetScore();
    this._switchScreen(ScreenType.MAIN);
    this._startTimer();
  }

  _startButtonClickHandler() {
    this._switchScreen(ScreenType.MAIN);
    this._startTimer();
  }

  _resultButtonClickHandler() {
    this._stopTimer();
    this._resetScore();
    this._switchScreen(ScreenType.RESULT);
  }

  _keyPressHandler(evt) {
    if (String.fromCharCode(evt.keyCode).match(/([а-яА-Я]+)/)) {
      // eslint-disable-next-line no-alert
      alert(`Смените раскладку клавиатуры`);
      return;
    }

    this.setState({currentKey: String.fromCharCode(evt.keyCode)});
    this.setState({currentLetter: this.state.textArray[this.state.score]});
    this.setState({accurancy: calculateAccuracy(this.state.score, this.state.mistakes)});
    this.setState({speed: calculateSpeed(this.state.score, this.state.time)});

    if (this.state.currentKey === this.state.currentLetter.symbol) {
      this._successInter();

      if (this.state.score >= this.state.textArray.length) {
        this._stopTimer();
        this._switchScreen(ScreenType.TOTAL);
      }
    } else {
      this._unsuccessInter();
    }
  }

  _getText() {
    const api = new API(URL);
    return api.getText()
    .then((data) => {
      this.setState({textArray: arrayToObject(data)});
    });
  }

  componentDidMount() {
    this._getText();
  }

  render() {

    return (
      <div className='container-fluid app-container'>
        <nav className="navbar navbar-dark bg-dark">
          <div className='container d-flex'>
            <a className="navbar-brand" href="#">
              <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="#cfcfcf" className="bi bi-keyboard" viewBox="0 0 16 16">
                <path d="M14 5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h12zM2 4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H2z"/>
                <path d="M13 10.25a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5zm0-2a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5zm-5 0A.25.25 0 0 1 8.25 8h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 8 8.75v-.5zm2 0a.25.25 0 0 1 .25-.25h1.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-1.5a.25.25 0 0 1-.25-.25v-.5zm1 2a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5zm-5-2A.25.25 0 0 1 6.25 8h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 6 8.75v-.5zm-2 0A.25.25 0 0 1 4.25 8h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 4 8.75v-.5zm-2 0A.25.25 0 0 1 2.25 8h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 2 8.75v-.5zm11-2a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5zm-2 0a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5zm-2 0A.25.25 0 0 1 9.25 6h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 9 6.75v-.5zm-2 0A.25.25 0 0 1 7.25 6h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 7 6.75v-.5zm-2 0A.25.25 0 0 1 5.25 6h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 5 6.75v-.5zm-3 0A.25.25 0 0 1 2.25 6h1.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-1.5A.25.25 0 0 1 2 6.75v-.5zm0 4a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5zm2 0a.25.25 0 0 1 .25-.25h5.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-5.5a.25.25 0 0 1-.25-.25v-.5z"/>
              </svg>
              BLIND_KEYBOARD_TRAINING</a>
            <form className="d-flex justify-content-end col-3">
              <button onClick={this._startButtonClickHandler} onMouseUp={(evt) => evt.target.blur()} className="btn btn-outline-success me-2" type="button">Тренажер</button>
              <button onClick={this._resultButtonClickHandler} onMouseUp={(evt) =>evt.target.blur()} className="btn btn-sm btn-outline-secondary" type="button">Результаты</button>
            </form>
          </div>
        </nav>
        {this._renderScreen(this.state.screen)}
      </div>
    );
  }
}

export default App;
