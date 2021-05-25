import FormValidator from "./FormValidator.js"
import initialCards from "./initialcards.js"

const editModal = document.querySelector(".edit-modal");
const addModal = document.querySelector(".add-modal");

const inputName = document.querySelector(".form__input_name");
const inputJob = document.querySelector(".form__input_job");
const inputImage = document.querySelector(".form__input_image");
const inputTitle = document.querySelector(".form__input_title");

const placeModal = document.querySelector(".place-modal");
const PlaceModalImage = document.querySelector(".place-modal__image");
const placeModalCaption = document.querySelector(".place-modal__caption");

const editButton = document.querySelector(".profile__edit-button");
const infoName = document.querySelector(".profile__name");
const infoAbout = document.querySelector(".profile__about");
const addButton = document.querySelector(".profile__add-button");

const cardTemplate = document.querySelector("#cardTemplate").content.querySelector(".card");
const elements = document.querySelector(".elements");

const defaultFormConfig = {
  popupSelector: ".popup",
  formSelector : ".form",
  formSubmit: ".form__save",
  inputSelector: ".form__input",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
  formSubmitInactive: "form__save_inactive"
};

const editFormValidator = new FormValidator(defaultFormConfig, editModal);
const addModalValidator = new FormValidator(defaultFormConfig, addModal);

editFormValidator.enableValidation();
addModalValidator.enableValidation();

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

//Add place submit function//
function handleAddSubmit(evt) {
  evt.preventDefault();
  closePopup(addModal)
  const cardData = {link: inputImage.value, name: inputTitle.value}
  const cardElement = cloneCard(cardData)
  elements.prepend(cardElement)
}

function cloneCard(card) {

  const cardElement =  cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__caption");
  const cardImage = cardElement.querySelector(".card__image");
  const cardLike = cardElement.querySelector(".card__like");
  const cardDelete = cardElement.querySelector(".card__delete");

  cardTitle.textContent = card.name;
  cardImage.src = card.link;

  //Toggle likeButton//
  cardLike.addEventListener("click", () => { cardLike.classList.toggle("card__like_active") });

  //Remove card//
  cardDelete.addEventListener("click", () => { cardElement.classList.add("card_remove") });

  //card zoom//
  cardImage.addEventListener("click", () => {
    placeModalCaption.textContent = cardTitle.textContent;
    PlaceModalImage.src = cardImage.src;
    openPopup(placeModal);
  });

  return cardElement
}

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
  const cardImage = document.querySelector(".card__image")
  const cardTitle = document.querySelector(".card__caption")
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

//cards//
initialCards.forEach(card => {
const cardElement = cloneCard(card)
elements.prepend(cardElement)
});


