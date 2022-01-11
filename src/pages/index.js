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

//profile match//
const userInfo = new UserInfo({ name: infoName, about: infoAbout, avatar: infoAvatar })

//edit modal user data//
const profileForm = new PopupWithForm({
  handleFormSubmit: (profile) => {
      profileForm.loading(true)
      api.setUserInfo({
        name: profile.name,
        about: profile.about,
    })
      .then((res) => {
        userInfo.setUserInfo(res.name, res.about, res.avatar);
        profileForm.loading(false, "loaded!!!");
        profileForm.close()
    })
      .catch(err => console.log(err));
  }
}, ".edit-modal")

//popup avatar data//
const avatarForm = new PopupWithForm({
  handleFormSubmit: (profile) => {
    avatarForm.loading(true)
      api.setUserAvatar({
        avatar: profile.avatar
      })
        .then((res) => {
          userInfo.setUserAvatar(res)
      avatarForm.loading(false, "loaded!!!");
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
  avatarForm.loading(false)
})

//edit profile form//
editButton.addEventListener("click", () =>{
  profileForm.open()
  profileForm.loading(false)
  const fieldSync = userInfo.getUserInfo();
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
    userInfo.setUserInfo(profile.name, profile.about);
    userInfo.setUserAvatar(profile);
    const renderCard = new Section({
      data: cards,
      renderer: createCard
    }, ".elements")

    renderCard.renderItems();

    const cardPopup = new PopupWithForm({
      handleFormSubmit: (data) => {
        cardPopup.loading(true);
        api.newCard(data)
          .then((res) => {
            createCard(res),
            cardPopup.loading(false, "Saved"),
            cardPopup.close()
          })
          .catch(err => console.log(err));
      }
    }, ".add-modal")

    cardPopup.setEventListeners();

    addButton.addEventListener("click", () => {
      cardPopup.open();
      cardPopup.loading(false);
    })

    function createCard(data) {
      const newCard = new Card({
        data,
        handleCardImage: () => {
          popupPlace.open(data);
        },
        cardDelete: (cardId) => {
          deleteCardModal.open();

          deleteCardModal.submitHandler(() => {
            deleteCardModal.loading(true, "Deleting...");
            api.removeCard(cardId)
              .then(() => {
                newCard.removeCard();
                deleteCardModal.loading(false);
                deleteCardModal.close()
              })
            .catch(err => console.log(err))
          })
        },

        likeOwner: (cardId) => {
          if (newCard.isLiked()) {
            api.removeLike(cardId)
              .then((res) => {
                newCard.likesCount(res.likes.length);
                newCard.removeLike()
              })
              .catch(err => console.log(err))
          } else {
            api.addLike(cardId)
              .then((res) => {
                newCard.likesCount(res.likes.length);
                newCard.addLike()
              })
              .catch(err => console.log(err))
          }
        }
      }, "#cardTemplate", profileId);
      renderCard.addItem(newCard.generateCard())
    };
  })
  .catch(err => console.log(err));
