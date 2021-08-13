import FormValidator from "../components/FormValidator.js";
import initialCards from "../Utils/initialcards.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/Popup-with-form.js";
import PopupWithImage from "../components/Popup-with-image.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";
import {
  editModal,
  editButton,
  addModal,
  addButton,
  infoName,
  infoAbout,
  inputImage,
  inputTitle,
  inputJob,
  inputName
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

//Profile match//
const profileInfo = new UserInfo ({name: infoName, about: infoAbout})

//Edit modal user data//
const profileForm = new PopupWithForm({
  handleFormSubmit: ({ name, about }) => {
    profileInfo.setUserInfo({ name, about });
  }
}, ".edit-modal")

profileForm.setEventListeners();

//Edit profile form//
editButton.addEventListener("click", () =>{
  profileForm.open();
  const fieldSync = profileInfo.getUserInfo()
  inputName.value = fieldSync.profileName;
  inputJob.value = fieldSync.profileAbout
})

//Card zoom//
const popupPlace = new PopupWithImage(".place-modal");
popupPlace.setEventListeners();

//Card template info//
const cardData = (data) => {
  const newCard = new Card({
  data: data,
  handleCardImage: () => {
    popupPlace.open(data)
   }
  }, "#cardTemplate");
  return newCard;
};

const renderCard = new Section ({
  renderer: (data) => {
    const card = cardData(data).generateCard()
    renderCard.addItem(card)
  }
}, ".elements")

//Populating with defaultCards//
renderCard.renderItems(initialCards);

//New card//
const placeSubmitHandler = new PopupWithForm({
  handleFormSubmit: (data) =>{
    renderCard.addItem(cardData(data).generateCard());
  }
}, ".add-modal")

placeSubmitHandler.setEventListeners();

//Popup place form//
addButton.addEventListener("click", () => {
  placeSubmitHandler.open()
  const cardImage = document.querySelector(".card__image");
  const cardTitle = document.querySelector(".card__caption");
  inputTitle.value = cardTitle.textContent;
  inputImage.value = cardImage.src;
})
