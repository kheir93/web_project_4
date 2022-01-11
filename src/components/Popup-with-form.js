import Popup from "./popup.js";

export default class PopupWithForm extends Popup {
  constructor({ handleFormSubmit }, popupSelector) {
    super(popupSelector),
    this._handleFormSubmit = handleFormSubmit,
    this._popupForm = this._popupElement.querySelector(".form"),
    this._inputList = this._popupElement.querySelectorAll(".form__input")
  };

  getInputValues() {
    this._inputValues = {};
    this._inputList.forEach((input) => (this._inputValues[input.name] = input.value));
    return this._inputValues
  };

  setEventListeners() {
    this._popupForm.reset()
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this.getInputValues())
    });
    super.setEventListeners();
  };

  close() {
    super.close()
  };

  submitHandler(submit) {
    this._handleFormSubmit = submit
  }
};


