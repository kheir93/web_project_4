import * as obj from "./const.js"
import * as functions from "./functions.js"

class Card {
  constructor(data, cardTemplate) {
    this._name = data.name,
    this._link = data.link,

    this._cardTemplate = cardTemplate

    this._popupModal = functions.openPopup
  };

  //Template structure//
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardTemplate)
      .content.querySelector(".card")
      .cloneNode(true)
      return cardElement
  };

  //Listeners//
  _setEventListeners() {
    this._handleCardLike();
    this._handleCardDelete();
    this._handleCardImage();
  };

   //Toggle likeButton//
   _handleCardLike() {
    const cardLike = this._cardTemplate.querySelector(".card__like")
    cardLike.addEventListener("click", () => { cardLike.classList.toggle("card__like_active") });
   };

   //Remove card//
   _handleCardDelete() {
    const cardDelete = this._cardTemplate.querySelector(".card__delete");
    cardDelete.addEventListener("click", () => {this._cardTemplate.remove() })
   };

   //Card zoom//
   _handleCardImage() {
    const cardImage = this._cardTemplate.querySelector(".card__image");
    cardImage.addEventListener("click", () => {
      obj.placeModalCaption.textContent = this._name;
      obj.PlaceModalImage.src = this._link;
      this._popupModal(obj.placeModal)
   });
  };

  //Display template//
  generateCard() {
    this._cardTemplate = this._getTemplate();
    this._setEventListeners();
    this._cardTemplate.querySelector(".card__image").src = this._link;
    this._cardTemplate.querySelector(".card__caption").textContent = this._name;
    return this._cardTemplate;
  };
};

export default Card;
