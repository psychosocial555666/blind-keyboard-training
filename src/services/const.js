
const MAX_PERCENT = 100;
const SECONDS_IN_MINUTE = 60;
const Status = {
  NOT_PASSED: `letter not-passed`,
  PASSED: `letter passed`,
  NEXT: `letter next`,
  WRONG: `letter wrong`,
};

const ScreenType = {
  WELCOME: `welcome`,
  MAIN: `main`,
  RESULT: `result`,
  TOTAL: `total`,
};

const ERROR_MESSAGE = `При загрузке произошла ошибка:`;

const WARNING_MESSAGE = `Смените раскладку клавиатуры`;

const URL = `https://baconipsum.com/api/?type=all-meat&sentences=1&&format=text`;

export {Status, URL, ScreenType, MAX_PERCENT, SECONDS_IN_MINUTE, ERROR_MESSAGE, WARNING_MESSAGE};
