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

let open = document.querySelector(".popup");
let title = document.querySelector(".popup__form-title");
let save = document.querySelector(".popup__form-save");


//let input = document.querySelector(".popup__form-input")//
let popupForm = document.querySelector(".popup__form");
let popupClose = document.querySelector(".popup__form-close");

let popupZoom = document.querySelector(".zoom");
let popupZoomImage = document.querySelector(".zoom__image");
let popupZoomOut = document.querySelector(".zoom__close");
let textZoom = document.querySelector(".zoom__caption");

let profile = document.querySelector(".profile");
let editButton = document.querySelector(".profile__edit-button");
let infoName = document.querySelector(".profile__name");
let infoAbout = document.querySelector(".profile__about");
let addButton = document.querySelector(".profile__add-button");

//display popup form//
function popup() {
  open.classList.add("popup_open");
}

//no-save closing popup//
function discard() {
  popout();
};

//closing popup//
function popout() {
  open.classList.remove("popup_open");
}

//popup profile form wit edit button//
function popupProfile() {
  popup();
  let inputName = document.querySelector("#inputName");
  let inputJob = document.querySelector("#inputJob");
  title.textContent = "Edit profile";
  inputName.style.display = "flex";
  inputJob.style.display = "flex";
  inputImage.style.display = "none";
  inputTitle.style.display = "none";
  inputName.value = infoName.textContent;
  inputJob.value = infoAbout.textContent;
};

editButton.addEventListener("click", popupProfile);

//save profile updates//
function handleFormSubmit(evt) {
  evt.preventDefault();
  infoName.textContent = inputName.value;
  infoAbout.textContent = inputJob.value;
  popout();
};


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


//popup form with add button//
function popupAdd() {
  popup();
  cardImage = document.querySelector("#card__image");
  cardTitle = document.querySelector("#card__caption");
  inputImage.disabled = false;
  inputTitle.disabled = false;
  inputTitle.value = cardTitle.textContent;
  inputImage.value = cardImage.src;
  title.textContent = "New place";
  inputTitle.style.display = "flex";
  inputImage.style.display = "flex";
  inputName.style.display = "none";
  inputJob.style.display = "none";
};

//save places updates//
function handleAddSubmit(evt) {
  evt.preventDefault();
  initialCards.splice(places(0, initialCards.length[initialCards]));
  cardImage = document.querySelector("#card__image");
  cardTitle = document.querySelector("#card__caption");
  cardTitle.textContent = inputTitle.value;
  cardImage.src = inputImage.value;
  popout();
};

//popup places form//
addButton.addEventListener("click", popupAdd);

//save profile//
popupForm.addEventListener("submit", handleFormSubmit);

//save places//
popupForm.addEventListener("submit", handleAddSubmit);

//close button//
popupClose.addEventListener("click", discard);
