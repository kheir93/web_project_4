const openEdit = document.querySelector(".popup-edit");
const popupFormEdit = document.querySelector(".popup-edit__form");
const popupCloseEdit = document.querySelector(".popup-edit__form-close");

const inputName = document.querySelector(".popup-add__form-input_name");
const inputJob = document.querySelector(".popup-add__form-input_job");

const openAdd = document.querySelector(".popup-add");
const popupAddForm = document.querySelector(".popup-add__form");
const popupCloseAdd = document.querySelector(".popup-add__form-close");

const inputImage = document.querySelector(".popup-add__form-input_image");
const inputTitle = document.querySelector(".popup-add__form-input_title");

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
function popupProfileForm(popupOpen) {
  openEdit.classList.toggle("popup-edit_open");
};

//display add popup form//
function popupPlaceForm(popupOpen) {
  openAdd.classList.toggle("popup-add_open");
};

//closing edit popup//
function closeProfileForm() {
  openEdit.classList.remove("popup-edit_open");
};

//closing add popup//
function closeAddForm() {
  openAdd.classList.remove("popup-add_open");
};

//closing zoom popup//
function closeImage() {
  cardImage.classList.remove("popup-image_open");
};

//no-save closing popup//
function profileDiscard() {
  closeProfileForm();
};

//popup profile form with edit button//
function popupProfile() {
  popupProfileForm();
  inputName.value = infoName.textContent;
  inputJob.value = infoAbout.textContent;
};

editButton.addEventListener("click", popupProfile);

//save profile updates//
function handleFormSubmit(evt) {
  evt.preventDefault();
  infoName.textContent = inputName.value;
  infoAbout.textContent = inputJob.value;
  popupProfileForm();
};

//save profile//
popupFormEdit.addEventListener("submit", handleFormSubmit);

//close profile button//
popupCloseEdit.addEventListener("click", popupProfileForm);

//no-save closing popup//
function discard() {
  //closeAddForm();
  closeProfileForm();
};

popupPlaceClose.addEventListener("click", () => {popupPlace.classList.remove("popup-place_open")});

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

function handleAddSubmit(evt) {
  evt.preventDefault();
  cardTitle.textContent = inputTitle.value;
  cardImage.src = inputImage.value;
  popupPlaceForm()
  addPlace()
}

//close add form//
popupCloseAdd.addEventListener("click", () => {popupPlaceForm()})

//save places//
popupAddForm.addEventListener("submit", handleAddSubmit);

//popup form with add button//
function addPlace() {
  cardContent()
  inputTitle.value = cardTitle.textContent;
  inputImage.value = cardImage.src;
};

//popup placesform//
addButton.addEventListener("click", () => {
  popupPlaceForm();
  addPlace()
});

const cardTemplate = document.querySelector("#cardTemplate").content.querySelector(".card");
const elements = document.querySelector(".elements");

initialCards.forEach(importedCard => {cloneCard(importedCard)});

function cloneCard(importedCard) {
  if (cloneCard  === "") {
    return;
  }
  const cardElement =  cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__caption");
  const cardImage = cardElement.querySelector(".card__image");
  const cardLike = cardElement.querySelector(".card__like");
  const cardDelete = cardElement.querySelector(".card__delete");

  cardTitle.textContent = importedCard.name;
  cardImage.src = importedCard.link;

  //Toggle likeButton//
  cardLike.addEventListener("click", () => { cardLike.classList.toggle("card__like_active") });

  //Remove card//
  cardDelete.addEventListener("click", () => { cardElement.classList.add("card_remove") });

  function zoomIn() {
    popupPlaceCaption.textContent = cardTitle.textContent;
    popupPlaceZoom.src = cardImage.src;
    popupPlace.classList.toggle("popup-place_open");
  }

  //placeszoom//
  cardImage.addEventListener("click", zoomIn);

  elements.prepend(cardElement);

  return cardElement;
};

