import * as React from "react";
const text = `Lorem, ipsum`;

const Status = {
  NOT_PASSED: `not-passed`,
  PASSED: `passed`,
  NEXT: `next`,
  WRONG: `wrong`,
};

const arrayToObject = (arr) => {
  return arr.split(``).map((it, i) => {
    let obj = Object.assign({}, {
      id: i,
      symbol: it,
      status: `not-passed`
    });
    return obj;
  });
};

const changeSymbolStatus = (arr, item, currentStatus) => {
  if (currentStatus === Status.PASSED) {
    let changedArr = arr.slice().map((it) => {
      if (it.id === item.id) {
        return Object.assign(it, {status: currentStatus});
      } else if (it.id === item.id + 1) {
        return Object.assign(it, {status: Status.NEXT});
      } else {
        return it;
      }
    });
    return changedArr;
  }
  let changedArr = arr.slice().map((it) => {
    if (it.id === item.id) {
      return Object.assign(it, {status: currentStatus});
    } else {
      return it;
    }
  });
  return changedArr;


};

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      score: 0,
      mistakes: 0,
      textArray: arrayToObject(text),
      currentKey: ``,
      currentLetter: ``,
    };

    this._keyPressHandler = this._keyPressHandler.bind(this);
  }

  _keyPressHandler(evt) {

    this.setState({currentKey: String.fromCharCode(evt.keyCode)});
    this.setState({currentLetter: this.state.textArray[this.state.score]});

    if (this.state.currentKey === this.state.currentLetter.symbol) {
      this.setState((state) => {
        return {
          textArray: changeSymbolStatus(state.textArray, state.currentLetter, Status.PASSED),
          score: state.score + 1};
      });

      if (this.state.score >= this.state.textArray.length) {
        this.setState({
          score: 0,
          textArray: arrayToObject(text),
        });
      }
    } else {
      this.setState((state) => {
        return {
          textArray: changeSymbolStatus(state.textArray, state.currentLetter, Status.WRONG),
          mistakes: state.mistakes + 1,
        };
      });
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
          Ошибок: {this.state.mistakes}
        </p>
      </div>
    );
  }
}


export default App;

