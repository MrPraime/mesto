export class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
} 

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    })
    .then(this._checkResponse)
     
  }

  patchUserInfo(name, about) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      "Content-Type": "application/json",

      body: JSON.stringify({
        name: name,
        about: about,
      }),
    })
    .then(this._checkResponse)
     
  }

  getInitialCards() {
    return fetch(`${this._url}/cards `, {
      headers: this._headers,
    })
    .then(this._checkResponse)

  }

  postNewCard(name, link) {
    loading(true);
    return fetch(`${this._url}/cards `, {
      method: "POST",
      headers: this._headers,

      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
    .then(this._checkResponse)

  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then(this._checkResponse)
     
  }

  patchNewAvatar(avatarUrl) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,

      body: JSON.stringify({
        avatar: avatarUrl,
      }),
    })
    .then(this._checkResponse)
     
  }

  // addLike(id) {
  //   return fetch(`${this._url}/cards/likes/${id}`, {
  //     method: "PUT",
  //     headers: this._headers,
  //   })
  //   .then(this._checkResponse)

  // }

  // removeLike(id) {
  //   return fetch(`${this._url}/cards/likes/${id}`, {
  //     method: "DELETE",
  //     headers: this._headers,
  //   })
  //   .then(this._checkResponse);

  // }


  changeLikeCardStatus(id,like){
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: like ? 'DELETE' : 'PUT',
      headers: this._headers,
    })

  }


}
