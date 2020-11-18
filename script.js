let root = document.querySelector(".root");
let profile = document.querySelector(".profile");
let editOpen = document.querySelector(".profile__edit-button");
let open = document.querySelector(".popup");
let save = document.querySelector(".popup__form-save");
let infoName = document.querySelector(".profile__name");
let infoAbout = document.querySelector(".profile__about");

function popup() {
  open.classList.add("popup_action_open");
  //root.classList.add("root__overlay");
};

editOpen.addEventListener("click", popup);

let inputName = document.querySelector("#inputName");
let inputJob = document.querySelector("#inputJob");

let popupForm = document.querySelector(".popup__form");
let popupClose = document.querySelector(".popup__form-close");

function handleFormSubmit(evt) {
  let popupClose = document.querySelector(".popup__form-close");
evt.preventDefault();

  name = inputName.value;
  infoName.textContent = name;

  job = inputJob.value;
  infoAbout.textContent = job;
  open.classList.remove("popup_action_open");
};

function discard(evt) {
  evt.preventDefault();
  open.classList.remove("popup_action_open");
};


  console.log(handleFormSubmit);
  console.log(discard);
  popupForm.addEventListener("submit", handleFormSubmit);
  popupClose.addEventListener("click", discard);
