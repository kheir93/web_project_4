import FormValidator from "./FormValidator.js"
import initialCards from "./initialcards.js"
import Card from "./Card.js"

const editModal = document.querySelector(".edit-modal");
const addModal = document.querySelector(".add-modal");

const inputName = document.querySelector(".form__input_name");
const inputJob = document.querySelector(".form__input_job");
const inputImage = document.querySelector(".form__input_image");
const inputTitle = document.querySelector(".form__input_title");

const placeModal = document.querySelector(".place-modal");

const editButton = document.querySelector(".profile__edit-button");
const infoName = document.querySelector(".profile__name");
const infoAbout = document.querySelector(".profile__about");
const addButton = document.querySelector(".profile__add-button");

const elements = document.querySelector(".elements");

//default conf for formvalidator load//
const defaultFormConfig = {
  popupSelector: ".popup",
  formSelector : ".form",
  formSubmit: ".form__save",
  inputSelector: ".form__input",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
  formSubmitInactive: "form__save_inactive"
};

//profile form fields validation handling//
const editModalValidator = new FormValidator(defaultFormConfig, editModal);
//card form fields validation handling//
const addModalValidator = new FormValidator(defaultFormConfig, addModal);

//forms validation check//
editModalValidator.enableValidation();
addModalValidator.enableValidation();

//Add place submit function//
const handleAddSubmit = (evt) => {
  evt.preventDefault();
  closePopup(addModal);
  renderCard({
    name: inputTitle.value,
    link: inputImage.value
  }, elements);
}

//Card fulfillment//
const renderCard = (data, elements) => {
  const cardData = new Card(data, "#cardTemplate");
  elements.prepend(cardData.generateCard());
}

//Card populating//
initialCards.forEach((data) => {
  renderCard(data, elements)
})

//display modal popup//
function openPopup(open) {
  open.classList.add("popup_open");
  document.addEventListener("keydown", (evt) => escapeKeyHandler(evt, open));
}

//closing modal popup//
function closePopup(close) {
  close.classList.remove("popup_open");
  document.removeEventListener("keydown", escapeKeyHandler);
}

//Escape key function//
function escapeKeyHandler(evt, target) {
  if (evt.key === "Escape") {
    closePopup(target);
    }
}

//popup profile form with edit button//
function popupProfile() {
  openPopup(editModal);
  inputName.value = infoName.textContent;
  inputJob.value = infoAbout.textContent;
}

//profile submit function//
function handleFormSubmit(evt) {
  evt.preventDefault();
  infoName.textContent = inputName.value;
  infoAbout.textContent = inputJob.value;
  closePopup(editModal)
}

//edit profile form//
editButton.addEventListener("click", popupProfile);

//save profile//
editModal.addEventListener("submit", handleFormSubmit);

//close profile form//
editModal.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup__close-button") || (evt.target.classList.contains("edit-modal"))) {
      closePopup(editModal);
    }
});

//popup place form//
addButton.addEventListener("click", () => {
  openPopup(addModal);
  const cardImage = document.querySelector(".card__image");
  const cardTitle = document.querySelector(".card__caption");
  inputTitle.value = cardTitle.textContent;
  inputImage.value = cardImage.src;
});

//close place form//
addModal.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("popup__close-button") || (evt.target.classList.contains("add-modal"))) {
    closePopup(addModal);
  }
});

//save place//
addModal.addEventListener("submit", handleAddSubmit);

//close place image//
placeModal.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("place-modal__close") || (evt.target.classList.contains("place-modal"))) {
     closePopup(placeModal);
    }
});
