import React from "react";
import PropTypes from "prop-types";

const ResultScreen = (props) => {
  const {results} = props;
  return (
    <div className="result-screen container">
      <h2 className="result-screen__title">Лучшие результаты:</h2>
      <div className="row result-screen__headers">
        <div className="col-6">Имя</div>
        <div className="col-3">Скорость</div>
        <div className="col-3">Точность</div>
      </div>
      {results.map((it) => {
        return <ul key={it.name + it.userSpeed} className="result-screen__list">
          <li className="result-screen__item row">
            <div className="col-6">{it.name}</div>
            <div className="col-3">{it.userSpeed} зн./мин.</div>
            <div className="col-3">{it.userAccurancy}%</div>
          </li>
        </ul>;
      })}

    </div>
  );
};

ResultScreen.propTypes = {
  results: PropTypes.arrayOf(
      {
        name: PropTypes.string,
        userSpeed: PropTypes.number,
        userAccurancy: PropTypes.number,
      }
  ).isRequired,
};

export default ResultScreen;
