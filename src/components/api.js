export default class Api {
  constructor({ baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getAppInfo() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]
    )
  }

  getUserInfo() {
    return fetch(this._baseUrl + '/users/me', {
      headers: this._headers
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Error: ${res.status}`)
      })
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
      .then((res) => {
        if (res.ok) {
          return res.json()
            .then((result) => console.log(result))
        }
        return Promise.reject(`Error: ${res.status}`)
      })
  }

  setUserAvatar({ avatar }) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
            .then((result) => console.log(result))
        }
        return Promise.reject(`Error: ${res.status}`)
      })
  }

  getInitialCards() {
    return fetch(this._baseUrl + '/cards', {
      headers: this._headers
    })
      .then(res => {
        if (res.ok) {
          return res.json()

      }
        // if the server returns an error, reject the promise
        return Promise.reject(`Error: ${res.status}`)
      })
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
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Error: ${res.status}`)

      })
  }

  removeCard(cardId) {
    return fetch(this._baseUrl + '/cards/' + cardId, {
      headers: this._headers,
      method: 'DELETE'
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Error: ${res.status}`)
      })
  }

  likesManagement(cardId) {
    function method(isliked, disliked) {
    if (isliked) {
      const put = method = 'PUT'
    } else if(disliked) {
      const del = method = 'DELETE'
    }
  }
    return fetch(this._baseUrl + '/cards/likes/' + cardId, {
      method: method(isliked, disliked),
      headers: this._headers
    })
      .then((res) => {
        if (res.ok) {
          return res.json()

        }
        return Promise.reject(`Error: ${res.status}`)
      })
  }

  addLike(cardId) {
    return fetch(this._baseUrl + '/cards/likes/' + cardId, {
      method: 'PUT',
      headers: this._headers
    })
      .then((res) => {
        if (res.ok) {
          return res.json()

        }
        return Promise.reject(`Error: ${res.status}`)
      })
  }


  removeLike(cardId) {
    return fetch(this._baseUrl + '/cards/likes/' + cardId, {
      method: 'DELETE',
      headers: this._headers
    })
      .then((res) => {
        if (res.ok) {
          return res.json()

        }
        return Promise.reject(`Error: ${res.status}`)
      })
  }





_renderError(err) {
  /*error.textContent = err
  result.textContent = ""*/
  return console.log(err)
}

_renderResult(text) {
    /*result.textContent = text;
    error.textContent = ""*/
    console.log(text)
  }

_renderLoading(isLoading) {
    if (isLoading) {
      console.log(isLoading)
    }
    console.log("err")
  // other methods for working with the API
  }
}
