import {Status} from './const.js';

const arrayToObject = (arr) => {
  return arr.split(``).map((it, i) => {
    if (i === 0) {
      let obj = Object.assign({}, {
        id: i,
        symbol: it,
        status: `next`
      });
      return obj;
    }
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

const calculateAccuracy = (scores, mistakes) => {
  let total = scores + mistakes;
  let mistakesPercent = mistakes !== 0 ? (mistakes / total) * 100 : 0;
  let result = 100 - Math.round(mistakesPercent);
  return result;
};

export {changeSymbolStatus, arrayToObject, calculateAccuracy};
