/* eslint-disable react/prop-types */
import React from "react";

const MainScreen = (props) => {
  const {textArray, accurancy, speed} = props;
  return (
    <div className="main-content container">
      <div className="row">
        <div className="main-content__text text col-9">
          <p>
            {textArray.map((it) => <span key={Math.random()} className={it.status}>{it.symbol}</span>)}
          </p>
        </div>
        <div className="main-content__statistics statistics col-3 d-flex ">
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
        </div>
      </div>
    </div>
  );
};

export default MainScreen;
