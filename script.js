let root = document.querySelector(".root");
let info = document.querySelector(".info");
let profile = document.querySelector(".profile");
let editopen = document.querySelector(".info__edit-button");
let form = document.querySelector(".form");




function popup() {

  root.classList.add("root__overlay");
  form.classList.add("form_action_popup");
  return form;
};
console.log(popup);

editopen.addEventListener("click", popup);


