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

function handleFormSubmit(event) {
  event.preventDefault();
};

function handleFormSubmit() {

  let nameInput = document.querySelector(".form__name")
  let jobInput = document.querySelector(".form__about")

  nameInput.value = "Jacques Cousteau" + "";
  jobInput.value = "Explorer" + "";

    var name = nameInput.value;
    infoName.textContent = name;
    var job = jobInput.value;
    infoAbout.textContent = job;
  };


console.log(handleFormSubmit);
form.addEventListener('submit', handleFormSubmit());
console.log(addEventListener);

