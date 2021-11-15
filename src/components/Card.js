
export default class Card {
  constructor({ data, handleCardImage, cardDelete}, cardTemplate) {
    this._link = data.link,
    this._title = data.title,
    this._handleCardImage = handleCardImage,
    this._cardDelete = cardDelete,
    this._cardTemplate = cardTemplate
    this._card = this._cardElement;
  };

  //Template structure//
  _getTemplate() {
    this._cardElement = document
      .querySelector(this._cardTemplate)
      .content.querySelector(".card")
      .cloneNode(true)
    return this._cardElement
  };

  //Listeners//
  _setEventListeners() {
     //Card zoom handling//
    this._cardImage.addEventListener("click", () => {
      this._handleCardImage()
    });
    //Card like handling//
    this._handleCardLike();
    //Card delete handling//
    this.handleCardDelete();
  };

  //Toggle likeButton//
   _handleCardLike() {
    const cardLike = this._cardTemplate.querySelector(".card__like")
    cardLike.addEventListener("click", () => { cardLike.classList.toggle("card__like_active") });
   };

  //Remove card//
   handleCardDelete() {
    //this._card.remove('.card');
    this._cardDelete = this._cardTemplate.querySelector(".card__delete");
    //const deletePopup = document.querySelector(".delete-modal");
    //cardDelete.addEventListener("click", deletePopup);
    return this._cardDelete.addEventListener("submit", () => {this._cardTemplate.classList.add("card_remove")})
   };

  //Display template//
  generateCard() {
    this._cardTemplate = this._getTemplate();
    this._cardImage = this._cardTemplate.querySelector(".card__image");
    this._cardTitle = this._cardTemplate.querySelector(".card__caption");
    this._cardTitle.textContent = this._title;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._title;
    this._setEventListeners();

    return this._cardTemplate;
  };
};


