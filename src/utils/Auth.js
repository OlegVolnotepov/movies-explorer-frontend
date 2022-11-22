import React from "react";

export const BASE_URL = "https://api.voleg.nomorepartiesxyz.ru";

//const JWT = localStorage.getItem('token');

function checkResponse(response) {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка: ${response.status}`);
  //for (var key in response) console.log(key + ": " + response[key]);
  // response.json().then((body) => {
  //   return Promise.reject(`Ошибка: ${body.message})`);
  // });
}
// return Promise.reject(
//   `Ошибка: ${response.json().then((body) => {
//     console.log(body.message);
//   })}`
// );
//}

// export const register = (email, password) => {
//   return fetch(`${BASE_URL}/signup`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ password, email }),
//   }).then((response) => checkResponse(response));
// };
export const register = (email, password, name) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name }),
  }).then((response) => checkResponse(response));

  // }).then((response) => {
  //   if (response.ok) {
  //     auth(email, password);
  //   } else {
  //     return Promise.reject(`Ошибка: ${response.status}`);
  //   }
  // });
};

export const auth = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  }).then((response) => checkResponse(response));
};

export const checkValidityToken = (JWT) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JWT}`,
    },
  }).then((response) => checkResponse(response));
};
