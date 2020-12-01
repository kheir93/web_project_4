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
let inputName = document.querySelector("#inputName");
let inputJob = document.querySelector("#inputJob");
let inputTitle = document.querySelector("#inputTitle");
let inputImage = document.querySelector("#inputImage");
let input = document.querySelector(".popup__form-input")
let popupForm = document.querySelector(".popup__form");
let popupClose = document.querySelector(".popup__form-close");

let popupZoom = document.querySelector(".zoom");
let popupZoomImage = document.querySelector(".zoom__image");
let popupZoomOut = document.querySelector(".zoom__close");

let profile = document.querySelector(".profile");
let editButton = document.querySelector(".profile__edit-button");
let infoName = document.querySelector(".profile__name");
let infoAbout = document.querySelector(".profile__about");
let addButton = document.querySelector(".profile__add-button");

//display popup form//
function popup() {
  open.classList.add("popup_open");
}

//closing popup//
function popout() {
  open.classList.remove("popup_open");
}


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

  function popupAdd() {
    inputTitle.value = arrayMatch.link;
    inputImage.value = arrayMatch.name;
    title.textContent = "New place";
    inputTitle.style.display = "flex";
    inputImage.style.display = "flex";
    inputName.style.display = "none";
    inputJob.style.display = "none";
    popup();
  };

  addButton.addEventListener("click", popupAdd);

  function handleAddSubmit(evt) {
    evt.preventDefault();
    //initialCards.replaceWith(arrayMatch[0]);
    cardTitle.textContent = inputTitle.value;
    cardImage.src = inputImage.value;
    popout();
  };


  //cardImage.src = ;
  //cardTitle.textContent = ;

  //cardTitle.prepend(arrayCardTitle);
  //cardImage.prepend(arrayCardImage);

  cardLike.addEventListener("click", () => { cardLike.classList.toggle("card__like_active") });

  popupForm.addEventListener("submit", handleAddSubmit);

  cardOut.addEventListener("click", () => { card.classList.add("card_remove") });

  //popup form with add button//


  function zoom() {
    inputTitle.value = cardTitle.textContent
    popupZoomImage.src = cardImage.src;
    popupZoom.classList.add("zoom_in");
  }

  cardImage.addEventListener("click", zoom);

  popupZoomOut.addEventListener("click", () => { popupZoom.classList.remove("zoom_in") });

};

places(initialCards)
console.log(places)

//popup profile form wit edit button//
function popupProfile() {
  title.textContent = "Edit profile";
  inputImage.style.display = "none";
  inputTitle.style.display = "none"
  inputName.style.display = "flex";
  inputJob.style.display = "flex";
  inputName.value = infoName.textContent;
  inputJob.value = infoAbout.textContent;
  popup();
}

editButton.addEventListener("click", popupProfile);

function handleFormSubmit(evt) {
  evt.preventDefault();
  infoName.textContent = inputName.value;
  infoAbout.textContent = inputJob.value;
  popout();
};

popupForm.addEventListener("submit", handleFormSubmit);

function discard() {
  popout();
};

popupClose.addEventListener("click", discard);
