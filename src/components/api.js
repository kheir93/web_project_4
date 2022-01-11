export default class Api {
  constructor({ baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
      /*.then((result) => console.log(result))*/
    } else {
      return Promise.reject(`Error ${res.status}`);
    }
  }

  getAppInfo() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()])
  }

  getUserInfo() {
    return fetch(this._baseUrl + '/users/me', {
      headers: this._headers
    })
      .then(this._checkResponse)
  }

  setUserInfo(name, about) {
    return fetch(this._baseUrl + '/users/me/', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(
        name,
        about
      )
    })
      .then(this._checkResponse)
  }

  setUserAvatar({ avatar }) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar
      })
    })
      .then(this._checkResponse)
  }

  getInitialCards() {
    return fetch(this._baseUrl + '/cards', {
      headers: this._headers
    })
      .then(this._checkResponse)
  }

  newCard({ title, url }) {
    return fetch(this._baseUrl + '/cards', {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({
        name: title,
        link: url
      })
    })
      .then(this._checkResponse)
  }

  removeCard(cardId) {
    return fetch(this._baseUrl + '/cards/' + cardId, {
      headers: this._headers,
      method: 'DELETE'
    })
      .then(this._checkResponse)
  }

  addLike(cardId) {
    return fetch(this._baseUrl + '/cards/likes/' + cardId, {
      method: 'PUT',
      headers: this._headers
    })
      .then(this._checkResponse)
  }

  removeLike(cardId) {
    return fetch(this._baseUrl + '/cards/likes/' + cardId, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkResponse)
  }
}
