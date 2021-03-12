const editModal = document.querySelector(".edit-modal");

const inputName = document.querySelector(".form__input_name");
const inputJob = document.querySelector(".form__input_job");
const inputImage = document.querySelector(".form__input_image");
const inputTitle = document.querySelector(".form__input_title");

const addModal = document.querySelector(".add-modal");

const placeModal = document.querySelector(".place-modal");
const PlaceModalImage = document.querySelector(".place-modal__image");
const placeModalCaption = document.querySelector(".place-modal__caption");

const profile = document.querySelector(".profile");
const editButton = document.querySelector(".profile__edit-button");
const infoName = document.querySelector(".profile__name");
const infoAbout = document.querySelector(".profile__about");
const addButton = document.querySelector(".profile__add-button");

//display add popup form//
function openPopup(open) {
  open.classList.add("popup_open");
}

//closing add popup//
function closePopup(close) {
  close.classList.remove("popup_open");
}

//popup profile form with edit button//
function popupProfile() {
  openPopup(editModal);
  inputName.value = infoName.textContent;
  inputJob.value = infoAbout.textContent;
}

editButton.addEventListener("click", popupProfile);

//profile submit function//
function handleFormSubmit(evt) {
  evt.preventDefault();
  infoName.textContent = inputName.value;
  infoAbout.textContent = inputJob.value;
  closePopup(editModal)
}

//save profile//
editModal.addEventListener("submit", handleFormSubmit);

//close profile form//
editModal.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup__close-button") || (evt.target.classList.contains("edit-modal"))) {
      closePopup(editModal);
    } else { if (evt.target.classList.contains("form"))  {
      openPopup(editModal)
      }
    }
  });

//close profile form with escape key//
editButton.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") {
    closePopup(editModal)
   }
});

//popup place form//
addButton.addEventListener("click", () => {
  openPopup(addModal);
  const cardImage = document.querySelector(".card__image")
  const cardTitle = document.querySelector(".card__caption")
  inputTitle.value = cardTitle.textContent;
  inputImage.value = cardImage.src;
});

//Add place submit function//
function handleAddSubmit(evt) {
  evt.preventDefault();
  closePopup(addModal)
  const cardData = {link: inputImage.value, name: inputTitle.value}
  const cardElement = cloneCard(cardData)
  elements.prepend(cardElement)
}

//close place form//
addModal.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("popup__close-button") || (evt.target.classList.contains("add-modal"))) {
    closePopup(addModal);
  } else { if (evt.target.classList.contains("form"))  {
    openPopup(addModal)
    }
  }
});

//close place form with escape key//
addButton.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") {
    closePopup(addModal)
  }
});

//save place//
addModal.addEventListener("submit", handleAddSubmit);



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

  //card zoom//
  cardImage.addEventListener("click", () => {
    placeModalCaption.textContent = cardTitle.textContent;
    PlaceModalImage.src = cardImage.src;
    openPopup(placeModal);
  });

  //close place image//
  placeModal.addEventListener("click", (evt) => {
   if (evt.target.classList.contains("place-modal__close") || (evt.target.classList.contains("place-modal"))) {
      closePopup(placeModal);
    } else { if (evt.target.classList.contains("place-modal__image"))  {
      openPopup(placeModal)
      }
    }
  });

  //close place image with escape key//
  cardImage.addEventListener("keydown", function (evt) {
    if (evt.key === "Escape") {
      closePopup(placeModal)
    }
  });

  return cardElement
}

//cards//
initialCards.forEach(card => {
const cardElement = cloneCard(card)
elements.prepend(cardElement)
});
