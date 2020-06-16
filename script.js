var darkBtn = document
  .querySelector(".slider")
  .addEventListener("click", darkModeFun);

function darkModeFun() {
  let element = document.querySelector(".content");
  element.classList.toggle("dark-theme");
}
