class FormValidator {

  constructor(config, formElement) {
    this._formSelector = config.formSelector
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
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
    };

  _hideInputError(inputElement) {
    const errorElement = this._element.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
    };

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
      });
    };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      return this._showInputError(inputElement, inputElement.validationMessage);
    }
    this._hideInputError(inputElement);
  };

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      const valid = () => {
      buttonElement.classList.add(this._formSubmitInactive);
      buttonElement.disabled = true;
    }
      return valid()
    }
    buttonElement.classList.remove(this._formSubmitInactive);
    buttonElement.disabled = false;
  };

  _setEventListeners() {
    const inputList = Array.from(this._element.querySelectorAll(this._inputSelector));
    const buttonElement = this._element.querySelector(this._formSubmit);
    inputList.forEach(inputElement => {
      inputElement.addEventListener ("input" , () => {
      this._checkInputValidity(inputElement);
      this._toggleButtonState(inputList, buttonElement, this._formSubmitInactive);
      });
    });
  }

  enableValidation() {
    this._element.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
};

export default FormValidator;
