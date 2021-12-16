import "./index.css";
import Api from "../components/api.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/Popup-with-form.js";
import PopupWithImage from "../components/Popup-with-image.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import {
  editModal,
  avatarButton,
  editButton,
  infoAvatar,
  addModal,
  addButton,
  avatarModal,
  deleteModal,
  infoName,
  infoAbout,
  inputAvatar,
  inputImage,
  inputTitle,
  inputJob,
  inputName,
} from "../utils/constants.js";

//ATHENTICATION//
const api = new Api({
  baseUrl: 'https://around.nomoreparties.co/v1/group-13',
  headers: {
    authorization: "4b9bb316-6c12-461f-86a3-76e6af7325ba",
    "Content-Type": "application/json"
  }
});

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

//avatar form field validation handling//
const avatarModalValidator = new FormValidator(defaultFormConfig, avatarModal);
//profile form fields validation handling//
const editModalValidator = new FormValidator(defaultFormConfig, editModal);
//card form fields validation handling//
const addModalValidator = new FormValidator(defaultFormConfig, addModal);

//forms validation check//
editModalValidator.enableValidation();
addModalValidator.enableValidation();
avatarModalValidator.enableValidation();

//profile match//
const profileInfo = new UserInfo({name: infoName, about: infoAbout, avatar: infoAvatar})

//loading state//
function loading(isLoading, popupModal, submitButtonText) {
  if (isLoading) {
    popupModal.querySelector(".form__save").textContent = submitButtonText;
  }
    popupModal.querySelector(".form__save").textContent = submitButtonText;
}

//edit modal user data//
const profileForm = new PopupWithForm({
  handleFormSubmit: () => {
    loading(true, editModal, "Saving...")

      api.setUserInfo({
        name: infoName.textContent = inputName.value,
        about: infoAbout.textContent = inputJob.value,
    })
      .then(() => {
        loading(false, editModal, "loaded!!!")
    })

  }
}, ".edit-modal")

//popup avatar data//
const avatarForm = new PopupWithForm({
  handleFormSubmit: () => {
    loading(true, avatarModal, "Saving...")
      api.setUserAvatar({
        avatar: infoAvatar.src = inputAvatar.value
    })
    .then(() => {
     return loading(false, avatarModal, "loaded!!!")

    })
  }
}, ".avatar-modal")

//popup delete window//
const deleteCardModal = new PopupWithForm({}, ".delete-modal")

deleteCardModal.setEventListeners();

avatarForm.setEventListeners();

profileForm.setEventListeners();

//avatar form//
avatarButton.addEventListener("click", () => {
  avatarForm.open()
  loading(true, avatarModal, "Save")
  inputAvatar.value = infoAvatar.src;
})

//edit profile form//
editButton.addEventListener("click", () =>{
  profileForm.open()
  loading(true, editModal, "Save")
  const fieldSync = profileInfo.getUserInfo();
  inputName.value = fieldSync.profileName;
  inputJob.value = fieldSync.profileAbout;
})

//card zoom//
const popupPlace = new PopupWithImage(".place-modal");

popupPlace.setEventListeners();

//card template//
api.getAppInfo()
  .then(([profile, cards]) => {
    const profileId = profile._id;
    profileInfo.setUserInfo(profile.name, profile.about)
    infoAvatar.src = profile.avatar

    const renderCard = new Section({
      data: cards,
      renderer: cardData
    }, ".elements")

    renderCard.renderItems()

    const cardSubmitHandler = new PopupWithForm({
      handleFormSubmit: (data) => {
        loading(true, addModal, 'Saving...')
        api.newCard(data)
          .then((res) => {
            cardData(res);
            loading(false, addModal, 'yep')
            cardSubmitHandler.formClose()
            console.log(res)
          })
      }
    }, ".add-modal")

    cardSubmitHandler.setEventListeners();

    addButton.addEventListener("click", () => {
      cardSubmitHandler.open();
      loading(true, addModal, "Create")
      const cardImage = document.querySelector(".card__image");
      const cardTitle = document.querySelector(".card__caption");
      inputTitle.value = cardTitle.textContent;
      inputImage.value = cardImage.src
    })

    function cardData(data) {
      const newCard = new Card({
        data,
        handleCardImage: () => {
          popupPlace.open(data);
        },
        cardDelete: (cardId) => {
          deleteCardModal.open()
          loading(true, deleteModal, "Yes")
          deleteCardModal.submitHandler(() => {
            loading(true, deleteModal, "Saving...")
            api.removeCard(cardId)
              .then(() => {
                newCard.removeCard()
                loading(false, deleteModal, "yes!!!")
                deleteCardModal.formClose()
              })
            .catch(err => console.log(err));
          })
        },
        isLiked: (cardId) => {
          const like = newCard.cardLike.classList
          if (like.contains("card__like-icon_active")) {
            api.removeLike(cardId)
              .then((result) => {
                newCard.likesCount(result.likes.length) || /*newCard.showLikes() ||*/ like.remove("card__like-icon_active")
              })
              .catch(err => console.log(err))
          } else {
            api.addLike(cardId)
              .then((result) => {
                newCard.likesCount(result.likes.length) || like.add("card__like-icon_active")
              })
              .catch(err => console.log(err))
            }
            return newCard
        }
      }, "#cardTemplate", profileId)
      renderCard.addItem(newCard.generateCard())
    };
  })
  .catch(err => console.log(err));
