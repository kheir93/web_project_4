class FormValidator {

  constructor(defaultFormConfig, formElement) {
    this._defaultFormConfig = defaultFormConfig,
    this._formElement = formElement,
    this._inputList = Array.from(this._formElement.querySelectorAll(this._defaultFormConfig.inputSelector)),
    this._buttonElement = this._formElement.querySelector(this._defaultFormConfig.formSubmit)
};

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._defaultFormConfig.inputErrorClass);
    errorElement.classList.add(this._defaultFormConfig.errorClass);
    errorElement.textContent = errorMessage;
    };

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._defaultFormConfig.inputErrorClass);
    errorElement.classList.remove(this._defaultFormConfig.errorClass);
    errorElement.textContent = "";
    };

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
      });
    };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      return this._showInputError(inputElement, inputElement.validationMessage);
    }
    this._hideInputError(inputElement);
  };

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.classList.add(this._defaultFormConfig.formSubmitInactive);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._defaultFormConfig.formSubmitInactive);
      this._buttonElement.disabled = false;
    }
  };

  _setEventListeners() {
    this._inputList.forEach(inputElement => {
      this._formElement.addEventListener("reset", () => {
        this.disableButton(this._buttonElement);
        this._inputList.forEach((inputElement) => {
          this._hideInputError(inputElement)
        })
      });
      this._formElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._inputList, this._buttonElement);
      });
    })
  }

  enableButton() {
    this._buttonElement.classList.remove(this._defaultFormConfig.formSubmitInactive);
    this._buttonElement.disabled = true;
  }

  disableButton() {
    this._buttonElement.classList.add(this._defaultFormConfig.formSubmitInactive);
    this._buttonElement.disabled = true;
  }

  resetValidation() {
    this._toggleButtonState(); //<== controlling the submit button ==

      this._inputList.forEach((inputElement) => {
        this._hideInputError(inputElement) //<== clearing errors ==
      });
  }


  enableValidation() {
    this._formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
};

export default FormValidator;
