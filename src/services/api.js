import {ERROR_MESSAGE} from "./const";
import {showServiceMessage} from "./utils";

const API = class {
  constructor(url, params) {
    this._url = url;
    this._params = params;
  }

  checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    showServiceMessage(ERROR_MESSAGE + response.status + response.statusText);
    throw new Error(`${response.status}: ${response.statusText}`);
  }

  getText() {

    return this._load({
      url: this._url,
      params: this._params,
    })
    .then((response) => response.text());
  }

  _load({url, params}) {

    return fetch(`${url}`, params)
      .then(this.checkStatus)
      .catch((err) => {
        showServiceMessage(ERROR_MESSAGE + err);
        throw err;
      });
  }
};

export default API;
