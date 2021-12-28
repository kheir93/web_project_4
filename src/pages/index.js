import "./index.css";
import Api from "../components/api.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/Popup-with-form.js";
import PopupWithImage from "../components/Popup-with-image.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import {
  defaultFormConfig,
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

//loading state//
function loading(isLoading, popupModal, submitButtonText) {
  if (isLoading) {
    popupModal.querySelector(".form__save").textContent = submitButtonText;
  }
    popupModal.querySelector(".form__save").textContent = submitButtonText;
}

//profile match//
const userInfo = new UserInfo({ name: infoName, about: infoAbout, avatar: infoAvatar })

//edit modal user data//
const profileForm = new PopupWithForm({
  handleFormSubmit: () => {
    loading(true, editModal, "Saving...");
    const field = profileForm.getInputValues();
      api.setUserInfo({
        name: field.name,
        about: field.about,
        avatar: userInfo.avatar
    })
      .then(() => {
        userInfo.setUserInfo(inputName.value, inputJob.value, inputAvatar.value);
        loading(false, editModal, "loaded!!!");
        profileForm.close()
    })
      .catch(err => console.log(err));
  }
}, ".edit-modal")

//popup avatar data//
const avatarForm = new PopupWithForm({
  handleFormSubmit: () => {
    const field = avatarForm.getInputValues()
    loading(true, avatarModal, "Saving...")
      api.setUserAvatar({
        avatar: field.avatar
    })
    .then(() => {
      infoAvatar.src = field.avatar
      loading(false, avatarModal, "loaded!!!")
      avatarForm.close()
    })
    .catch(err => console.log(err));
  }
}, ".avatar-modal")

//popup delete window//
const deleteCardModal = new PopupWithForm({}, ".delete-modal")

deleteCardModal.setEventListeners();

avatarForm.setEventListeners();

profileForm.setEventListeners();

//avatar form//
avatarButton.addEventListener("click", () => {
  avatarForm.open();
  loading(true, avatarModal, "Save")
})

//edit profile form//
editButton.addEventListener("click", () =>{
  profileForm.open()
  loading(true, editModal, "Save")
  const fieldSync = userInfo.getUserInfo();
  inputName.value = fieldSync.profileName;
  inputJob.value = fieldSync.profileAbout;
  inputAvatar.value = fieldSync.profileAvatar;
})

//card zoom//
const popupPlace = new PopupWithImage(".place-modal");

popupPlace.setEventListeners();

//card template//
api.getAppInfo()
  .then(([profile, cards]) => {
    const profileId = profile._id;
    userInfo.setUserInfo(profile.name, profile.about)
    infoAvatar.src = profile.avatar
    const renderCard = new Section({
      data: cards,
      renderer: createCard
    }, ".elements")

    renderCard.renderItems()

    const cardSubmitHandler = new PopupWithForm({
      handleFormSubmit: (data) => {
        loading(true, addModal, 'Saving...');
        api.newCard(data)
          .then((res) => {
            createCard(res),
            loading(false, addModal, 'yep'),
            cardSubmitHandler.close()
          })
          .catch(err => console.log(err));
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

    function createCard(data) {
      const newCard = new Card({
        data,
        handleCardImage: () => {
          popupPlace.open(data);
        },
        cardDelete: (cardId) => {
          deleteCardModal.open();
          loading(true, deleteModal, "Yes");
          deleteCardModal.submitHandler(() => {
            loading(true, deleteModal, "Saving...");
            api.removeCard(cardId)
              .then(() => {
                newCard.removeCard();
                loading(false, deleteModal, "yes!!!");
                deleteCardModal.close()
              })
            .catch(err => console.log(err))
          })
        },

        likeOwner: (cardId) => {
          if (newCard.isLiked()) {
            api.removeLike(cardId)
              .then((result) => {
                newCard.likesCount(result.likes.length) || newCard.removeLike()
              })
              .catch(err => console.log(err))
          } else {
            api.addLike(cardId)
              .then((result) => {
                newCard.likesCount(result.likes.length) || newCard.addLike()
              })
              .catch(err => console.log(err))
          }
        }
      }, "#cardTemplate", profileId)
      renderCard.addItem(newCard.generateCard())
    };
  })
  .catch(err => console.log(err));
