let root = document.querySelector(".root");
let info = document.querySelector(".info");
let profile = document.querySelector(".profile");
let editopen = document.querySelector(".info__edit-button");
let form = document.querySelector(".form");
let save = document.querySelector(".form__save");
let infoName = document.querySelector(".info__name");
let infoAbout = document.querySelector(".info__about");

function popup() {
  form.classList.add("form_action_popup");
  root.classList.add("root__overlay");
};

editopen.addEventListener("click", popup);


document.querySelector(".form").addEventListener('submit', function handleFormSubmit(evt) {
  evt.preventDefault();

  let inputName = document.querySelector(".form__name");
  let inputJob = document.querySelector(".form__about");

  let name = inputName.value;
  infoName.textContent = name;

  let job = inputJob.value;
  infoAbout.textContent = job;
  form.classList.remove("form_action_popup");
  root.classList.remove("root__overlay");
  });


