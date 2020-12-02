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

let openEdit = document.querySelector(".popup-edit");
let titleEdit = document.querySelector(".popup-edit__form-title");
let saveEdit = document.querySelector(".popup-edit__form-save");
let popupFormEdit = document.querySelector(".popup-edit__form");
let popupCloseEdit = document.querySelector(".popup-edit__form-close");

let openAdd = document.querySelector(".popup-add");
let titleAdd = document.querySelector(".popup-add__form-title");
let saveAdd = document.querySelector(".popup-add__form-save");
let popupFormAdd = document.querySelector(".popup-add__form");
let popupCloseAdd = document.querySelector(".popup-add__form-close");

let popupZoom = document.querySelector(".zoom");
let popupZoomImage = document.querySelector(".zoom__image");
let popupZoomOut = document.querySelector(".zoom__close");
let textZoom = document.querySelector(".zoom__caption");

let profile = document.querySelector(".profile");
let editButton = document.querySelector(".profile__edit-button");
let infoName = document.querySelector(".profile__name");
let infoAbout = document.querySelector(".profile__about");
let addButton = document.querySelector(".profile__add-button");

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

//no-save closing popup//
function profileDiscard() {
  popoutEdit();
};

//no-save closing popup//
function cardDiscard() {
  popoutAdd();
};

//popup profile form wit edit button//
function popupProfile() {
  popupEdit();
  let inputName = document.querySelector("#inputName");
  let inputJob = document.querySelector("#inputJob");
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
popupCloseEdit.addEventListener("click", profileDiscard);


//popup form with add button//
function addPlace() {
  popupAdd();
  cardImage = document.querySelector("#card__image");
  cardTitle = document.querySelector("#card__caption");
  inputTitle.value = cardTitle.textContent;
  inputImage.value = cardImage.src;
};

//popup places form//
addButton.addEventListener("click", addPlace);

//save places updates//
function handleAddSubmit(evt) {
  evt.preventDefault();
  initialCards.splice(places(0, initialCards.length[initialCards]));
  cardImage = document.querySelector("#card__image");
  cardTitle = document.querySelector("#card__caption");
  cardTitle.textContent = inputTitle.value;
  cardImage.src = inputImage.value;
  popoutAdd();
};


//save places//
popupFormAdd.addEventListener("submit", handleAddSubmit);

//close card button//
popupCloseAdd.addEventListener("click", cardDiscard);




initialCards.forEach((arrayMatch) => { places(arrayMatch) });

function places(arrayMatch) {
  let elements = document.querySelector("#elements");
  const cardTemplate = document.querySelector("#cardTemplate").content;
  const cardElement = cardTemplate.cloneNode(true);

  const card = cardElement.querySelector("#card");
  const cardTitle = cardElement.querySelector("#card__caption");
  cardTitle.textContent = arrayMatch.name;
  const cardImage = cardElement.querySelector("#card__image");
  cardImage.src = arrayMatch.link;
  cardImage.alt = cardTitle.textContent;
  const cardLike = cardElement.querySelector("#card__like");
  const cardOut = cardElement.querySelector("#card__delete");

  elements.prepend(card);

  function zoom() {
    textZoom.textContent = cardTitle.textContent;
    popupZoomImage.src = cardImage.src;
    popupZoom.classList.add("zoom_in");
  }

  //places zoom//
  cardImage.addEventListener("click", zoom);

  popupZoomOut.addEventListener("click", () => { popupZoom.classList.remove("zoom_in") });

  cardLike.addEventListener("click", () => { cardLike.classList.toggle("card__like_active") });

  cardOut.addEventListener("click", () => { card.classList.add("card_remove") });
};



