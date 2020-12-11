const popup = document.querySelector(".popup")

const openEdit = document.querySelector(".popup-edit");
const popupFormEdit = document.querySelector(".popup-edit__form");
const popupCloseEdit = document.querySelector(".popup-edit__form-close");
const saveEditButton = document.querySelector(".popup-edit__form-save");

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
const popupCloseButton = document.querySelector(".popup__close-button");
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

//display add popup form//
function popupOpen(open) {
  open.classList.add("popup_open")
}

//closing add popup//
function closePopup(close) {
  close.classList.remove("popup_open")
}


//popup profile form with edit button//
function popupProfile() {
  popupOpen(openEdit);
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

//close profile button//
//popupCloseEdit.addEventListener("click", popupProfileForm);

popupCloseEdit.addEventListener("click", () => {closePopup(openEdit)});

//no-save closing popup//
function discard() {
  //closeAddForm();
  closeProfileForm();
}

popupCloseButton.addEventListener("click", () => {closePopup(openAdd)});


function handleAddSubmit(evt) {
  evt.preventDefault();
  const data = {
    name: inputName,
    link: inputImage
  }
  cardTitle.textContent = inputTitle.value;
  cardImage.src = inputImage.value;
  closePopup(openAdd)
  addPlace()
}

//close add form//
//popupCloseButton.addEventListener("click", () => {popupPlaceForm(popupAddForm)})

//save places//
popupAddForm.addEventListener("submit", handleAddSubmit);

//popup form with add button//
function addPlace() {
  cardContent()
  inputTitle.value = cardTitle.textContent;
  inputImage.value = cardImage.src;
}

//popup placesform//
addButton.addEventListener("click", (data) => {
  popupOpen(openAdd);
  addPlace(data)
});

const cardTemplate = document.querySelector("#cardTemplate").content.querySelector(".card");
const elements = document.querySelector(".elements");

initialCards.forEach(importedCard => {

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
    popupOpen(popupPlace);
  }

  //close zommed place//
  popupPlaceClose.addEventListener("click", () => {closePopup(popupPlace)});

  //placeszoom//
  cardImage.addEventListener("click", zoomIn);

  elements.prepend(cardElement);

  return cardElement;
});
