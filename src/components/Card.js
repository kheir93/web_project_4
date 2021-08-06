
export default class Card {
  constructor({data, handleCardImage}, cardTemplate) {
    this._link = data.link,
    this._title = data.title,
    this._handleCardImage = handleCardImage,
    this._cardTemplate = cardTemplate
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
    this._handleCardDelete();
  };

   //Toggle likeButton//
   _handleCardLike() {
    const cardLike = this._cardTemplate.querySelector(".card__like")
    cardLike.addEventListener("click", () => { cardLike.classList.toggle("card__like_active") });
   };

   //Remove card//
   _handleCardDelete() {
    const cardDelete = this._cardTemplate.querySelector(".card__delete");
    cardDelete.addEventListener("click", () => {this._cardTemplate.classList.add("card_remove")})
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


