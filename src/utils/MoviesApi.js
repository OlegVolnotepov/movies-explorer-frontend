//const JWT = localStorage.getItem('token');
class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getAllMovies() {
    return fetch(`${this._url}/`, {}).then((res) => this._checkResponse(res));
  }
}

const moviesApi = new Api({
  url: "https://api.nomoreparties.co/beatfilm-movies",
  headers: {
    "Content-Type": "application/json",
  },
});

export default moviesApi;
