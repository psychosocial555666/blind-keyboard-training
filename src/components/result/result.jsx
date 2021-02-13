/* eslint-disable react/prop-types */
import React from "react";

const ResultScreen = () => {

  return (
    <div className="result-screen container">
      <h2 className="result-screen__title">Лучшие результаты:</h2>
      <div className="row result-screen__headers">
        <div className="col-6">Имя</div>
        <div className="col-3">Скорость</div>
        <div className="col-3">Точность</div>
      </div>
      <ul className="result-screen__list">
        <li className="result-screen__item row">
          <div className="col-6">Александр</div>
          <div className="col-3">120</div>
          <div className="col-3">90</div>
        </li>
      </ul>
    </div>
  );
};

export default ResultScreen;
