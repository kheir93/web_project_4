import FormValidator from "../components/FormValidator.js";
import initialCards from "../components//initialcards.js";
import Card from "../components//Card.js";
import * as functions from "../utils//functions.js";
import Section from "../components/Section.js";
import "./index.css";
import {
  defaultCard,
  editModal,
  editButton,
  addModal,
  placeModal,
  elements,
  addButton
} from "../utils/constants.js";

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
const editModalValidator = new FormValidator(defaultFormConfig, editModal);
//card form fields validation handling//
const addModalValidator = new FormValidator(defaultFormConfig, addModal);

//Forms validation check//
editModalValidator.enableValidation();
addModalValidator.enableValidation();

//Add place submit function//
const handleAddSubmit = (evt) => {
  evt.preventDefault();
  functions.closePopup(addModal);
  new Card({
    name: inputTitle.value,
    link: inputImage.value
  }, defaultCard);
}

//Card fulfillment//
/*const renderCard = (data, elements) => {
  const cardData = new Card(data, "#cardTemplate");
  elements.prepend(cardData.generateCard());
}*/

//Card populating//
/*initialCards.forEach((data) => {
  renderCard(data, elements)
});*/

const renderCard = new Section({ data: initialCards, renderer: (item) => {
    const cardData = new Card(item, "#cardTemplate");
    const cardElement = cardData.generateCard();
    elements.prepend(cardElement);
  }
});

renderCard.renderItems();


//Card populating//
/*initialCards.forEach(data => {
  elements(data, defaultCard)
});*/

//Edit profile form//
editButton.addEventListener("click", functions.popupProfile);

//Save profile//
editModal.addEventListener("submit", functions.handleFormSubmit);

//Close profile form//
editModal.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup__close-button") || (evt.target.classList.contains("edit-modal"))) {
      functions.closePopup(editModal);
    }
});

//Popup place form//
addButton.addEventListener("click", () => {
  functions.openPopup(addModal);
  const cardImage = document.querySelector(".card__image");
  const cardTitle = document.querySelector(".card__caption");
  inputTitle.value = cardTitle.textContent;
  inputImage.value = cardImage.src;
});

//Close place form//
addModal.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("popup__close-button") || (evt.target.classList.contains("add-modal"))) {
    functions.closePopup(addModal);
  }
});

//Save place//
addModal.addEventListener("submit", handleAddSubmit);

//Close place image//
placeModal.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("place-modal__close") || (evt.target.classList.contains("place-modal"))) {
    functions.closePopup(placeModal);
    }
});
