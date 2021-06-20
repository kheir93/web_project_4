const placeModal = document.querySelector(".place-modal");
const PlaceModalImage = document.querySelector(".place-modal__image");
const placeModalCaption = document.querySelector(".place-modal__caption");

//display modal popup//
function openPopup(open) {
  open.classList.add("popup_open");
  document.addEventListener("keydown", (evt) => escapeKeyHandler(evt, open));
};

//closing modal popup//
function closePopup(close) {
  close.classList.remove("popup_open");
  document.removeEventListener("keydown", escapeKeyHandler);
};

//Escape key function//
function escapeKeyHandler(evt, target) {
  if (evt.key === "Escape") {
    closePopup(target);
  }
};

class Card {
  constructor(data, cardTemplate) {
    this._name = data.name,
    this._link = data.link,

    this._cardTemplate = cardTemplate
  };

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardTemplate)
      .content.querySelector(".card")
      .cloneNode(true)
      return cardElement
  };

  _setEventListeners() {
    this._handlecardLike();
    this._handlecardDelete();
    this._handlecardImage();
  };

   //Toggle likeButton//
   _handlecardLike() {
    const cardLike = this._cardTemplate.querySelector(".card__like")
    cardLike.addEventListener("click", () => { cardLike.classList.toggle("card__like_active") });
   };

   //Remove card//
   _handlecardDelete() {
    const cardDelete = this._cardTemplate.querySelector(".card__delete");
    cardDelete.addEventListener("click", () => { this._cardTemplate.classList.add("card_remove") });
   };

   //card zoom//
   _handlecardImage() {
    const cardImage = this._cardTemplate.querySelector(".card__image");
    cardImage.addEventListener("click", () => {
      placeModalCaption.textContent = this._name;
      PlaceModalImage.src = this._link;
      openPopup(placeModal);
   });
  };

  generateCard() {
    this._cardTemplate = this._getTemplate();
    this._setEventListeners();
    this._cardTemplate.querySelector(".card__image").src = this._link;
    this._cardTemplate.querySelector(".card__caption").textContent = this._name;
    return this._cardTemplate;
  };
};

export default Card;
