class FormValidator {

  constructor(config, formElement) {

    //this._formSelector = config.formSelector
    this._popupSelector = config.popupSelector,
    this._formSubmit = config.formSubmit,
    this._inputSelector = config.inputSelector,
    this._inputErrorClass = config.inputErrorClass,
    this._errorClass = config.errorClass,
    this._formSubmitInactive = config.formSubmitInactive,

    this._element = formElement
};

_showInputError(inputElement, errorMessage) {
  const errorElement = this._element.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(this._inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(this._errorClass);
  };


_hideInputError(inputElement) {
  const errorElement = this._element.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(this._inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(this._errorClass);
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(this._element, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(this._element, inputElement);
    }
  };

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      buttonElement.classList.add(this._formSubmitInactive);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._formSubmitInactive);
      buttonElement.disabled = false;
    }
  };

  _hasInvalidInput() {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _setEventListeners(inputElement) {
    /*const inputList = Array.from(this._element);
    const buttonElement = this._element.querySelector(this._formSubmit);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {*/
      this._element.addEventListener("input", function () {
        this._checkInputValidity;
        this._toggleButtonState;
    });
  //});
};

  enableValidation() {
    this._element.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
  };


  /*config = {
    popupSelector: ".popup",
    formSelector : ".form",
    formSubmit: ".form__save",
    inputSelector: ".form__input",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__input-error_active",
    formSubmitInactive: "form__save_inactive"
  };*/
};

export default FormValidator;
