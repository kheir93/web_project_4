import Popup from "./popup.js";

export default class PopupWithForm extends Popup {
  constructor({ handleFormSubmit }, popupSelector) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector(".form")
  }

  _getInputValues() {
    this._inputList = this._popupElement.querySelectorAll(".form__input");
    this._inputValues = {};
    this._inputList.forEach((input) => (this._inputValues[input.name] = input.value));
    return this._inputValues
  }

  setEventListeners() {
    function timeout(ms) {
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), ms)
      });
    }
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues())
      timeout(1000).then(() => {
        super.close()
      })
    });
    super.setEventListeners();
  };

  formClose() {
    super.close();
    this._popupForm = this._popupElement.querySelector(".form")
  };

  submitHandler(submit) {
    this._handleFormSubmit = submit;
  }
};


