import FormValidator from "./FormValidator.js";
import initialCards from "./initialcards.js";
import Card from "./Card.js";
import * as obj from "./const.js"
import * as functions from "./functions.js"

//Default conf for formvalidator load//
const defaultFormConfig = {
  popupSelector: ".popup",
  formSelector : ".form",
  formSubmit: ".form__save",
  inputSelector: ".form__input",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
  formSubmitInactive: "form__save_inactive"
};

//Profile form fields validation handling//
const editModalValidator = new FormValidator(defaultFormConfig, obj.editModal);
//card form fields validation handling//
const addModalValidator = new FormValidator(defaultFormConfig, obj.addModal);

//Forms validation check//
editModalValidator.enableValidation();
addModalValidator.enableValidation();

//Add place submit function//
const handleAddSubmit = (evt) => {
  evt.preventDefault();
  functions.closePopup(obj.addModal);
  renderCard({
    name: inputTitle.value,
    link: inputImage.value
  }, obj.elements);
}

//Card fulfillment//
const renderCard = (data, elements) => {
  const cardData = new Card(data, "#cardTemplate");
  elements.prepend(cardData.generateCard());
}

//Card populating//
initialCards.forEach((data) => {
  renderCard(data, elements)
});

//Edit profile form//
obj.editButton.addEventListener("click", functions.popupProfile);

//Save profile//
obj.editModal.addEventListener("submit", functions.handleFormSubmit);

//Close profile form//
obj.editModal.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup__close-button") || (evt.target.classList.contains("edit-modal"))) {
      functions.closePopup(obj.editModal);
    }
});

//Popup place form//
obj.addButton.addEventListener("click", () => {
  functions.openPopup(obj.addModal);
  const cardImage = document.querySelector(".card__image");
  const cardTitle = document.querySelector(".card__caption");
  inputTitle.value = cardTitle.textContent;
  inputImage.value = cardImage.src;
});

//Close place form//
obj.addModal.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("popup__close-button") || (evt.target.classList.contains("add-modal"))) {
    functions.closePopup(obj.addModal);
  }
});

//Save place//
obj.addModal.addEventListener("submit", handleAddSubmit);

//Close place image//
obj.placeModal.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("place-modal__close") || (evt.target.classList.contains("place-modal"))) {
    functions.closePopup(obj.placeModal);
    }
});
