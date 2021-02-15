import React from "react";
import PropTypes from "prop-types";

const TotalScreen = (props) => {
  const {accurancy, speed, onUserFormSubmit} = props;
  return (
    <div className="total-screen container">
      <h2 className="total-screen__title">Результаты проверки</h2>
      <p className="total-screen__text">
        Представьтесь, чтобы сохранить свой результат, а чтобы улучшить его нажмите кнопку &apos;Заново&apos;
      </p>
      <form onSubmit={onUserFormSubmit} className="total-screen__statistics statistics col-12 d-flex ">
        <div className='statistics__item'>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Ваше имя:</label>
            <input type="text" id="username" className="total-screen__username form-control bg-light"/>
          </div>
        </div>
        <div className='statistics__item'>
          <p>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#cfcfcf" className="bi bi-bullseye" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="M8 13A5 5 0 1 1 8 3a5 5 0 0 1 0 10zm0 1A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"/>
              <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>
              <path d="M9.5 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
            </svg>
                Точность:
          </p>
          <div className="progress">
            <div className={accurancy >= 80 ? `progress-bar bg-success` : `progress-bar bg-danger`} style={{width: `${accurancy}%`}} role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          <p>
            {accurancy}%
          </p>

        </div>
        <div className='statistics__item'>
          <p>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#cfcfcf" className="bi bi-speedometer2" viewBox="0 0 16 16">
              <path d="M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4zM3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10zm9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.389.389 0 0 0-.029-.518z"/>
              <path fillRule="evenodd" d="M0 10a8 8 0 1 1 15.547 2.661c-.442 1.253-1.845 1.602-2.932 1.25C11.309 13.488 9.475 13 8 13c-1.474 0-3.31.488-4.615.911-1.087.352-2.49.003-2.932-1.25A7.988 7.988 0 0 1 0 10zm8-7a7 7 0 0 0-6.603 9.329c.203.575.923.876 1.68.63C4.397 12.533 6.358 12 8 12s3.604.532 4.923.96c.757.245 1.477-.056 1.68-.631A7 7 0 0 0 8 3z"/>
            </svg>
                Скорость:
          </p>
          <p>
            {speed} зн/мин
          </p>
        </div>
        <button type="submit" className="total-screen__restart btn btn-outline-light">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#cfcfcf" className="bi bi-arrow-repeat" viewBox="0 0 16 16">
            <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
            <path fillRule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
          </svg>
          Заново
        </button>
      </form>
    </div>
  );
};

TotalScreen.propTypes = {
  onUserFormSubmit: PropTypes.func.isRequired,
  accurancy: PropTypes.number,
  speed: PropTypes.number,
};

export default TotalScreen;
