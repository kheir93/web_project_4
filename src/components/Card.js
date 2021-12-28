export default class Card {
  constructor({ data, handleCardImage, cardDelete, deleteModal, likeOwner }, cardTemplate, userId) {

    this._likeOwner = likeOwner,
    this._handleCardImage = handleCardImage,
    this._cardDelete = cardDelete,
    this._deleteModal = deleteModal,
    this._cardTemplate = cardTemplate,
    this._cardElement = this._getTemplate(),

    this._userId = userId,
    this._link = data.link,
    this._name = data.name,
    this._likes = data.likes,
    this._id = data._id,
    this._owner = data.owner,
    this._cardImage = this._cardElement.querySelector(".card__image"),
    this._cardTitle = this._cardElement.querySelector(".card__caption"),
    this._cardLike = this._cardElement.querySelector(".card__like-icon"),
    this._deleteButton = this._cardElement.querySelector(".card__delete"),
    this.cardLikeActive = "card__like-icon_active"
  };

  getId() {
    return this._id;
  }

  likeOwner() {
    if (this._likes.some((likes) => likes._id === this._userId)) {
      return this._cardLike.classList.add(this.cardLikeActive)
    }
  }

  likesCount(total) {
    this._cardElement.querySelector(".card__like-count").textContent = total;
  }

  handleCardLike() {
    this._cardLike.addEventListener("click", () => {
      this._likeOwner(this.getId())
    })
  }

  isLiked() {
    return this._cardLike.classList.contains(this.cardLikeActive)
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
    this.handleCardLike()
  }

  //Remove card//
  removeCard() {
    this._cardElement.remove(".card")
  }

  //popup confirmation madal//
   handleCardDelete() {
    this._deleteButton.addEventListener("click", (e) => {
      e.preventDefault();
      this._cardDelete(this.getId())
    })
  }

  //Display template//
  generateCard() {
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
    this.likeOwner();

    this._setEventListeners();
    return this._cardElement
  };

  addLike() {
    this._cardLike.classList.add(this.cardLikeActive)
  }

  removeLike() {
    this._cardLike.classList.remove(this.cardLikeActive)
  }

  hideBin() {
    if (this._owner._id !== this._userId) {
      this._deleteButton = this._cardElement.querySelector(".card__delete");
      this._deleteButton.style.display = "none"
    }
  }
}

