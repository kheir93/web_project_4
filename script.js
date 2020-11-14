let root = document.querySelector(".root");
let info = document.querySelector(".info");
let profile = document.querySelector(".profile");
let editopen = document.querySelector(".info__edit-button");
let form = document.querySelector(".form");
let save = document.querySelector(".form__save");


function popup() {
  form.classList.add("form_action_popup");
  root.classList.add("root__overlay");
};

editopen.addEventListener("click", popup);



function handleFormSubmit(evt) {
  evt.preventDefault();

  let nameInput = document.querySelector('.form__name[value="Jacques Cousteau"}');
  let jobInput = document.querySelector(".form__about");
  let infoName = document.querySelector(".info__name");
  let infoabout = document.querySelector(".info__about");

  nameInput.textContent(infoName);
  jobInput.textContent(infoabout);

};

console.log(handleFormSubmit)
save.addEventListener('submit', handleFormSubmit);
