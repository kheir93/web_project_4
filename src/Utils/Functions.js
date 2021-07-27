import * as obj from "./constants.js"

function esc(open) {
  return document.addEventListener("keydown", (evt) => escapeKeyHandler(evt, open));
}

//Display modal popup//
export function openPopup(open) {
  open.classList.add("popup_open");
  //document.addEventListener("keydown", (evt) => escapeKeyHandler(evt, open));
  esc(open);
}

//Closing modal popup//
export function closePopup(close) {
  close.classList.remove("popup_open");
  document.removeEventListener("keydown", escapeKeyHandler);
}

//Escape key function//
export function escapeKeyHandler(evt, target) {
  if (evt.key === "Escape") {
    closePopup(target);
  }
}

//Popup profile form with edit button//
export function popupProfile() {
  openPopup(obj.editModal);
  inputName.value = infoName.textContent;
  inputJob.value = infoAbout.textContent;
}

//Profile submit function//
export function handleFormSubmit(evt) {
  evt.preventDefault();
  infoName.textContent = inputName.value;
  infoAbout.textContent = inputJob.value;
  closePopup(obj.editModal)
}
