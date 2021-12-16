export default class Card {
  constructor({ data, handleCardImage, cardDelete, deleteModal, isLiked }, cardTemplate, userId) {

    this._isLiked = isLiked,
    this._handleCardImage = handleCardImage,
    this._cardDelete = cardDelete,
    this._deleteModal = deleteModal,
    this._cardTemplate = cardTemplate,
    this._cardElement = this._getTemplate(),
    this._card = this._cardElement,

    this._userId = userId,
    this._link = data.link,
    this._name = data.name,
    this._likes = data.likes,
    this._id = data._id,
    this._owner = data.owner,
    this.cardLike = this._card.querySelector(".card__like-icon")
    this.cardLikeActive = this._card.querySelector("card__like-icon_active")
  };

  getId() {
    return this._id;
  }

  showLikes() {
    if (this._likes.some((likes) => likes._id === this._userId)) {
      this.cardLike = this._cardTemplate.querySelector(".card__like-icon")
      return this.cardLike.classList.add("card__like-icon_active")
    }

  }

  likesCount(total) {
    this._cardTemplate.querySelector(".card__like-count").textContent = total;
  }

  handleCardLike() {
    this.cardLike = this._cardTemplate.querySelector(".card__like-icon")
    this.cardLike.addEventListener("click", () => {
      this._isLiked(this.getId());
    })
  }

  //Template structure//
  _getTemplate() {
    this._cardElement = document
      .querySelector(this._cardTemplate)
      .content.querySelector(".card")
      .cloneNode(true)
    return this._cardElement
  }

  //Listeners//
  _setEventListeners() {
     //Card zoom handling//
    this._cardImage.addEventListener("click", () => {
      this._handleCardImage()
    });
    //Card delete handling//
    this.handleCardDelete();
    //Like button management//
    this.handleCardLike();
  }

  //Remove card//
  removeCard() {
    this._cardTemplate.remove(".card");
  }

  //popup confirmation madal//
   handleCardDelete() {
    this._deleteButton = this._cardTemplate.querySelector(".card__delete");
    this._deleteModal = document.querySelector(".delete-modal");
    this._deleteButton.addEventListener("click", (e) => {
      e.preventDefault();
      this._cardDelete(this.getId())
    })
  }

  //Display template//
  generateCard() {
    this._cardTemplate = this._getTemplate();
    this._cardImage = this._cardTemplate.querySelector(".card__image");
    this._cardTitle = this._cardTemplate.querySelector(".card__caption");
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    //Card like handling//
    this.handleCardLike();
    //hide bin button//
    this.hideBin();
    //increase / decrease likes count//
    this.likesCount(this._likes.length);
    //highlighting my likes//
    this.showLikes();

    this._setEventListeners();
    return this._cardTemplate
  };

  hideBin() {
    if (this._owner._id !== this._userId) {
      this._deleteButton = this._cardTemplate.querySelector(".card__delete");
      this._deleteButton.style.display = "none"
    }
  }
}

