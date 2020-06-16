var darkBtn = document
  .querySelector(".slider")
  .addEventListener("click", darkModeFun);

function darkModeFun() {
  let darkContent = document.querySelector(".light-theme-content");
  let darkBody = document.querySelector(".light-theme-body");
  let darkNav = document.querySelector(".light-theme-nav");

  darkContent.classList.toggle("dark-theme-content");
  darkBody.classList.toggle("dark-theme-body");
  darkNav.classList.toggle("dark-theme-nav");
}
