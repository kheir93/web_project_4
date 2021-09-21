import Api from "../components/api.js";
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
  avatarButton,
  editButton,
  infoAvatar,
  addModal,
  addButton,
  avatarModal,
  infoName,
  infoAbout,
  inputAvatar,
  inputImage,
  inputTitle,
  inputJob,
  inputName
} from "../utils/constants.js";

//ATHENTICATION//
const api = new Api({
  baseUrl: 'https://around.nomoreparties.co/v1/group-13',
  headers: {
    authorization: "4b9bb316-6c12-461f-86a3-76e6af7325ba",
    "Content-Type": "application/json"
  }
});

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

//Avatar form field validation handling//
const avatarModalValidator = new FormValidator(defaultFormConfig, avatarModal);
//Profile form fields validation handling//
const editModalValidator = new FormValidator(defaultFormConfig, editModal);
//card form fields validation handling//
const addModalValidator = new FormValidator(defaultFormConfig, addModal);

//Forms validation check//
editModalValidator.enableValidation();
addModalValidator.enableValidation();
avatarModalValidator.enableValidation();

//Profile match//
const profileInfo = new UserInfo({name: infoName, about: infoAbout, avatar: infoAvatar})
const avatarInfo = new UserInfo({avatar: infoAvatar})



//Edit modal user data//
const profileForm = new PopupWithForm({
  handleFormSubmit: ({name, about, avatar}) => {
    api.setUserInfo({
      name: infoName.textContent = inputName.value,
      about: infoAbout.textContent = inputJob.value,
      avatar: avatarForm
    })
      .then((res) => {
      return profileInfo.setUserInfo({name, about, avatar})
      })
  }
}, ".edit-modal")

const avatarForm = new PopupWithForm({
  handleFormSubmit: () => {
    api.setUserAvatar({
      avatar: infoAvatar.src = inputAvatar.value
    })
      .then((res) => {
        infoAvatar.src
      })
  }
}, ".avatar-modal")

avatarForm.setEventListeners();

profileForm.setEventListeners();

//Avatar form//
avatarButton.addEventListener("click", () => {
  avatarForm.open()
  api.getUserInfo({
    avatar: inputAvatar.value = infoAvatar.src,
    name: inputName.value = infoName.src,
    about: inputJob.value = infoAbout.src
  })


  //inputAvatar.value = fieldSync
  //console.log(fieldSync);
  //console.log(fieldSync)
})

//Edit profile form//
editButton.addEventListener("click", () =>{
  profileForm.open();
  const fieldSync = profileInfo.getUserInfo();
  inputName.value = fieldSync.profileName;
  inputJob.value = fieldSync.profileAbout;
  inputAvatar.value = fieldSync.profileAvatar
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
