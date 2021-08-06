import Popup from "./popup.js"

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._link = this._popupElement.querySelector(".place-modal__image");
    this._title = this._popupElement.querySelector(".place-modal__caption");
  }

  open({link, title}) {
    this._link.src = link;
    this._title.textContent = title;
    super.open()
  }
}

export default PopupWithImage
