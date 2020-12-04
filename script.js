const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];

const openEdit = document.querySelector(".popup-edit");
const popupFormEdit = document.querySelector(".popup-edit__form");
const popupCloseEdit = document.querySelector(".popup-edit__form-close");
const inputName = document.querySelector("#inputName");
const inputJob = document.querySelector("#inputJob");

const openAdd = document.querySelector(".popup-add");
const popupFormAdd = document.querySelector(".popup-add__form");
const popupCloseAdd = document.querySelector(".popup-add__form-close");

const popupPlace = document.querySelector(".popup-place");
const popupPlaceZoom = document.querySelector(".popup-place__image");
const popupPlaceClose = document.querySelector(".popup-place__close");
const popupPlaceCaption = document.querySelector(".popup-place__caption");

const profile = document.querySelector(".profile");
const editButton = document.querySelector(".profile__edit-button");
const infoName = document.querySelector(".profile__name");
const infoAbout = document.querySelector(".profile__about");
const addButton = document.querySelector(".profile__add-button");

function cardContent() {
  cardImage = document.querySelector(".card__image");
  cardTitle = document.querySelector(".card__caption");
}

//display edit popup form//
function popupEdit() {
  openEdit.classList.add("popup-edit_open");
};

//display add popup form//
function popupAdd() {
  openAdd.classList.add("popup-add_open");
};

//closing edit popup//
function popoutEdit() {
  openEdit.classList.remove("popup-edit_open");
};

//closing add popup//
function popoutAdd() {
  openAdd.classList.remove("popup-add_open");
};

//closing zoom popup//
function popoutImage() {
  cardImage.classList.remove("popup-image_open");
};

//no-save closing popup//
function profileDiscard() {
  popoutEdit();
};

//popup profile form with edit button//
function popupProfile() {
  popupEdit();
  inputName.value = infoName.textContent;
  inputJob.value = infoAbout.textContent;
};

editButton.addEventListener("click", popupProfile);

//save profile updates//
function handleFormSubmit(evt) {
  evt.preventDefault();
  infoName.textContent = inputName.value;
  infoAbout.textContent = inputJob.value;
  popoutEdit();
};

//save profile//
popupFormEdit.addEventListener("submit", handleFormSubmit);

//close profile button//
popupCloseEdit.addEventListener("click", discard);

//popup form with add button//
function addPlace() {
  popupAdd();
  cardContent();
  inputTitle.value = cardTitle.textContent;
  inputImage.value = cardImage.src;
};

//popup placesform//
addButton.addEventListener("click", addPlace);

//save places//
popupFormAdd.addEventListener("submit", handleAddSubmit);

//no-save closing popup//
function discard() {
  popoutAdd();
  popoutEdit();
};

//close card button//
popupCloseAdd.addEventListener("click", discard);

const fdp = initialCards.forEach((importedPlace) => { newPlaces(importedPlace) });

//save placesupdates//
function handleAddSubmit(evt) {
  evt.preventDefault();
  if (card[0] = card.length) {initialCards.slice(card)}
  cardContent();
  cardTitle.textContent = inputTitle.value;
  cardImage.src = inputImage.value;
  popoutAdd();
};

function newPlaces(importedPlace) {
  let elements = document.querySelector(".elements");
  const cardTemplate = document.querySelector("#cardTemplate").content;
  const cardElement = cardTemplate.cloneNode(true);

  const card = cardElement.querySelector(".card");
  const cardTitle = cardElement.querySelector(".card__caption");
  const cardImage = cardElement.querySelector(".card__image");
  const cardLike = cardElement.querySelector(".card__like");
  const cardDelete = cardElement.querySelector(".card__delete");

  cardTitle.textContent = importedPlace.name;
  cardImage.src = importedPlace.link;
  cardImage.alt = importedPlace.textContent;

  elements.prepend(card);

  function zoomIn() {
    popupPlaceCaption.textContent = cardTitle.textContent;
    popupPlaceZoom.src = cardImage.src;
    popupPlace.classList.add("popup-place_open");
  }

  //placeszoom//
  cardImage.addEventListener("click", zoomIn);

  popupPlaceClose.addEventListener("click", () => {popupPlace.classList.remove("popup-place_open")});

  cardDelete.addEventListener("click", () => {card.classList.add("card_remove")});

  //LikeButton//
  cardLike.addEventListener("click", () => { cardLike.classList.toggle("card__like_active") });

  //importedPlace = cardTemplate

};




