class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscUp = this._handleEscUp.bind(this);
  }

  _handleEscUp(evt) {
    evt.preventDefault();
    if(evt.key === "Escape") {
      return this.close();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup__close-button") || evt.target.classList.contains("popup")) {
      return  this.close();
      }
    });
  }

  open() {
    this._popupElement.classList.add("popup_open");
    document.addEventListener("keyup", this._handleEscUp);
  }

  close() {
    this._popupElement.classList.remove("popup_open");
    document.removeEventListener("keyup", this._handleEscUp);
  }
}

export default Popup;
