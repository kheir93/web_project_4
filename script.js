let root = document.querySelector(".root");
let profile = document.querySelector(".profile");
let openPopup = document.querySelector(".profile__edit-button");
let open = document.querySelector(".popup");
let save = document.querySelector(".popup__form-save");
let infoName = document.querySelector(".profile__name");
let infoAbout = document.querySelector(".profile__about");
let inputName = document.querySelector("#inputName");
let inputJob = document.querySelector("#inputJob");
let popupForm = document.querySelector(".popup__form");
let popupClose = document.querySelector(".popup__form-close");

function popup() {
  open.classList.add("popup__open");
  name = infoName.textContent;
  inputName.value = name;
  job = infoAbout.textContent;
  inputJob.value = job;
};

openPopup.addEventListener("click", popup);

function handleFormSubmit(evt) {
  evt.preventDefault();
  name = inputName.value;
  infoName.textContent = name;

  job = inputJob.value;
  infoAbout.textContent = job;
  open.classList.remove("popup__open");
};

function discard(evt) {
  evt.preventDefault();
  open.classList.remove("popup__open");
};

popupForm.addEventListener("submit", handleFormSubmit);
popupClose.addEventListener("click", discard);
