/* eslint-disable react/prop-types */
import React from "react";

const WelcomeScreen = (props) => {
  const {onStartButtonClick} = props;
  return (
    <div className="welcome-screen container">
      <h1 className="welcome-screen__title">Привет</h1>
      <p className="welcome-screen__text">Это тренажер для слепой печати, ниже представлена подсказка, как нужно расположить пальцы при печати.
      Постарайся не смотреть на клавиатуру при печати. И не забудь <strong>проверить раскладку клавиатуры</strong>.
      </p>
      <p className="welcome-screen__text">
      Если готов, нажимай кнопку &apos;Начать&apos;
      </p>
      <img src="./img/keyboard.png" width="600" height="260" alt="Правильное расположение пальцев" className="welcome-screen__prompt"/>
      <button onClick={onStartButtonClick} type="button" className="welcome-screen__start btn btn-outline-light">Начать</button>
    </div>
  );
};

export default WelcomeScreen;
