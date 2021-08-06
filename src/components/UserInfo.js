export default class UserInfo {
  constructor({name, about}) {
    this._name = name;
    this._about = about;
  }

  getUserInfo() {
    return {profileName: this._name.textContent, profileAbout: this._about.textContent};
  }

  setUserInfo({name, about}) {
    this._name.textContent = name;
    this._about.textContent = about;
  };
}
