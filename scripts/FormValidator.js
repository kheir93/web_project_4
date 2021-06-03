class FormValidator {

  constructor(config, formElement) {
    /*({
      popupSelector: ".popup",
      formSelector : ".form",
      formSubmit: ".form__save",
      inputSelector: ".form__input",
      inputErrorClass: "form__input_type_error",
      errorClass: "form__input-error_active",
      formSubmitInactive: "form__save_inactive"
    })*/
    this._formSelector = config.formSelector
    this._popupSelector = config.popupSelector,
    this._formSubmit = config.formSubmit,
    this._inputSelector = config.inputSelector,
    this._inputErrorClass = config.inputErrorClass,
    this._errorClass = config.errorClass,
    this._formSubmitInactive = config.formSubmitInactive,

    this._element = formElement

};

  _showInputError(inputElement, errorMessage, formElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
    };

  _hideInputError(inputElement, formElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
    };

  _checkInputValidity(formElement, inputElement, config) {
   if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage, config);
    } else {
        this._hideInputError(formElement, inputElement, config);
      }
    };

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._formSubmitInactive);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._formSubmitInactive);
      buttonElement.disabled = false;
    }
  };

  _setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    const buttonElement = formElement.querySelector(this._formSubmit);
    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", this._checkInputValidity, this._toggleButtonState) /*() {
      this._checkInputValidity(formElement, inputElement);
      this._toggleButtonState(inputList, buttonElement);
      */});
  //});
}

  enableValidation() {

    const formList = Array.from(document.querySelectorAll(this._popupSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    const fieldsetList = Array.from(this._element.querySelectorAll(this._formSelector));
    fieldsetList.forEach((fieldset) => {
      this._setEventListeners(fieldset);
   });
  });
}
};

export default FormValidator;
