export default class Api {
  constructor({ baseUrl, headers, avatar, name, about}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._avatar = avatar;
    this._name = name;
    this._about = about
  }

  setUserInfo(name, about) {
    return fetch(this._baseUrl + '/users/me/', {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(
        name,
        about
      )
    })
      .then(res => res.json())
      .then((result) => console.log(result))
      .catch((err) => {
        return console.log(err)
    })
  }

  getUserInfo() {
    return fetch(this._baseUrl + '/users/me', {
      method: 'GET',
      headers: this._headers
    })
      .then(function (response) {
        return response;});
  }

  setUserAvatar(avatar) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(avatar)
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
            .then((result) => console.log(result))
        }
        return Promise.reject(`Error: ${res.status}`);
        })
      }


  getInitialCards() {
    return fetch("https://around.nomoreparties.co/v1/group-13/cards", {
      headers: {
        authorization: "4b9bb316-6c12-461f-86a3-76e6af7325ba"
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        // if the server returns an error, reject the promise
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.log(err); // log the error to the console
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
    } else {
      console.log("err")
    }
  // other methods for working with the API
  }
}
