const JWT = localStorage.getItem("jwt");

class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  // _checkResponse(res) {
  //   if (res.ok) {
  //     return res.json();
  //   }
  //   return Promise.reject(`Ошибка: ${res.status}`);
  // }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _fetchWithBody(path, methodName, bodyContent) {
    return fetch(`${this._url}${path}`, {
      method: methodName,
      headers: this._headers,
      body: JSON.stringify(bodyContent),
    }).then(this._checkResponse);
  }

  // getMovies() {
  //   return fetch(`${this._url}/movies`, {
  //     headers: this._headers,
  //   }).then((res) => this._checkResponse(res));
  // }
  getMovies() {
    return fetch(`${this._url}/movies`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._checkResponse(res));
  }

  addNewCard(name, url) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: url,
      }),
    }).then((res) => this._checkResponse(res));
  }

  getUser() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then((res) => this._checkResponse(res));
  }

  setUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => this._checkResponse(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then((res) => this._checkResponse(res));
  }

  //old setLike
  // addMovie(film) {
  //   return fetch(`${this._url}/movies`, {
  //     method: "POST",
  //     headers: {
  //       authorization: `Bearer ${localStorage.getItem("jwt")}`,
  //     },
  //     body: JSON.stringify({
  // country: film.country,
  // director: film.director,
  // duration: film.duration,
  // year: film.year,
  // description: film.description,
  // image: film.image.url,
  // trailerLink: film.trailerLink,
  // nameRU: film.nameRU,
  // nameEN: film.nameEN,
  // thumbnail: film.image.formats.thumbnail.url,
  // movieId: film.movieId,
  //     }),
  //   }).then((res) => this._checkResponse(res));
  // }
  addMovie(film) {
    return this._fetchWithBody("/movies", "POST", film);
  }

  deleteMovie(id) {
    return fetch(`${this._url}/movies/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then((res) => this._checkResponse(res));
  }

  unSetLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then((res) => this._checkResponse(res));
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: `${!isLiked ? "DELETE" : "PUT"}`,
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then((res) => this._checkResponse(res));
  }

  updateUser(newName, newEmail) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        name: newName,
        email: newEmail,
      }),
    }).then((res) => this._checkResponse(res));
  }
}

const api = new Api({
  url: "https://api.voleg.nomorepartiesxyz.ru",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
  },
});

export default api;
