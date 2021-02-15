const popup = document.querySelector(".popup");

const openEdit = document.querySelector(".edit-modal");
const popupFormEdit = document.querySelector(".edit-modal__form");
const popupCloseEdit = document.querySelector(".edit-modal__form-close");
const saveEditButton = document.querySelector(".edit-modal__form-save");

const inputName = document.querySelector(".edit-modal__form-input-name");
const inputJob = document.querySelector(".edit-modal__form-input-job");

const openAddForm = document.querySelector(".add-modal");
const popupAddForm = document.querySelector(".add-modal__form");
const popupCloseAdd = document.querySelector(".add-modal__form-close");

const inputImage = document.querySelector(".add-modal__form-input-image");
const inputTitle = document.querySelector(".add-modal__form-input-title");

const popupPlace = document.querySelector(".place-modal");
const popupPlaceZoom = document.querySelector(".place-modal__image");
const popupPlaceClose = document.querySelector(".place-modal__close");
const popupCloseButton = document.querySelector(".popup__close-button");
const popupPlaceCaption = document.querySelector(".place-modal__caption");

const profile = document.querySelector(".profile");
const editButton = document.querySelector(".profile__edit-button");
const infoName = document.querySelector(".profile__name");
const infoAbout = document.querySelector(".profile__about");
const addButton = document.querySelector(".profile__add-button");

function cardContent() {
  cardImage = document.querySelector(".card__image")
  cardTitle = document.querySelector(".card__caption")
}

//display add popup form//
function openPopup(open) {
  open.classList.add("popup_open")
}

//closing add popup//
function closePopup(close) {
  close.classList.remove("popup_open")
}

//popup profile form with edit button//
function popupProfile() {
  openPopup(openEdit);
  inputName.value = infoName.textContent;
  inputJob.value = infoAbout.textContent;
}

editButton.addEventListener("click", popupProfile);

//save profile updates//
function handleFormSubmit(evt) {
  evt.preventDefault();
  infoName.textContent = inputName.value;
  infoAbout.textContent = inputJob.value;
  closePopup(openEdit)
}

//save profile//
popupFormEdit.addEventListener("submit", handleFormSubmit);

popupCloseEdit.addEventListener("click", () => {closePopup(openEdit)});

popupCloseButton.addEventListener("click", () => {closePopup(openAddForm)});

function handleAddSubmit(evt) {
  evt.preventDefault();

  //const card = document.querySelector(".card")
  closePopup(openAddForm)
  const cardData = {link: inputImage.value, name: inputTitle.value}
  const cardElement = cloneCard(cardData)
  elements.prepend(cardElement)
}

//save places//
popupAddForm.addEventListener("submit", handleAddSubmit);

//popup form with add button//
function addPlace() {
  cardContent()
  inputTitle.value = cardTitle.textContent;
  inputImage.value = cardImage.src;
}

//popup placesform//
addButton.addEventListener("click", () => {
  openPopup(openAddForm);
  addPlace()
});

const cardTemplate = document.querySelector("#cardTemplate").content.querySelector(".card");
const elements = document.querySelector(".elements");

function cloneCard(card) {

  const cardElement =  cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__caption");
  const cardImage = cardElement.querySelector(".card__image");
  const cardLike = cardElement.querySelector(".card__like");
  const cardDelete = cardElement.querySelector(".card__delete");

  cardTitle.textContent = card.name;
  cardImage.src = card.link;

  //Toggle likeButton//
  cardLike.addEventListener("click", () => { cardLike.classList.toggle("card__like_active") });

  //Remove card//
  cardDelete.addEventListener("click", () => { cardElement.classList.add("card_remove") });

  function zoomIn() {
    popupPlaceCaption.textContent = cardTitle.textContent;
    popupPlaceZoom.src = cardImage.src;
    openPopup(popupPlace);
  }

  //close zommed place//
  popupPlaceClose.addEventListener("click", () => {closePopup(popupPlace)});

  //placeszoom//
  cardImage.addEventListener("click", zoomIn);

  return cardElement
}

//cards//
initialCards.forEach(card => {
const cardElement = cloneCard(card)
elements.prepend(cardElement)
})








