var darkModeBtn = document
  .getElementById("test")
  .addEventListener("click", darkMode);

function darkMode() {
  //   console.log(document.getElementsByClassName("test-class"));
  //   alert("This is darker");
  document.body.style.backgroundImage = "url('./img/bckg2.jpg')";
}
