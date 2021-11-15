export default class UserInfo {
  constructor({name, about, avatar}) {
    this._name = name;
    this._about = about;
    this._avatar = avatar;
  }

  getUserInfo() {
    return {profileName: this._name.textContent, profileAbout: this._about.textContent};
  }

  getUserAvatar() {
    return {profileAvatar: this._avatar.src}
  }

  setUserInfo(name, about, avatar) {
    this._name.textContent = name;
    this._about.textContent = about;
    this._about.src = avatar
  };

  setUserAvatar({avatar}) {
    this._avatar.src = avatar;
  }
}
