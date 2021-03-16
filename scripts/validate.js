//FORM VALIDATION MANAGEMENT//

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  formErrorActive(inputElement, errorElement);
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  formErrorInactive(inputElement, errorElement);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);

  } else {
    hideInputError(formElement, inputElement);

  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("form__save_inactive");
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove("form__save_inactive");
    buttonElement.disabled = false;
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".form__input"));
  const buttonElement = formElement.querySelector(".form__save");
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    const fieldsetList = Array.from(formElement.querySelectorAll(".form"));
    fieldsetList.forEach((fieldset) => {
      setEventListeners(fieldset);
    });
  });
};

function formErrorActive(type, input) {
  type.classList.add("form__input_type_error");
  input.classList.add("form__input-error_active");
}

function formErrorInactive(type, input) {
  type.classList.remove("form__input_type_error");
  input.classList.remove("form__input-error_active");
}

enableValidation({
  formSelector : ".form",
  InputSelector: ".form__input",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active"
});
