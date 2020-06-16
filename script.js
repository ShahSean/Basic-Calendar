var darkModeBtn = document
  .getElementById("test")
  .addEventListener("click", darkMode);

function darkMode() {
  //   console.log(document.getElementsByClassName("test-class"));
  //   alert("This is darker");
  //   document.body.style.backgroundColor = "red";
  // "rgb(" + [44, 34, 34, 0.96].join(",") + ")";
  //   document.querySelector(".content").style.backgroundColor =
  //     "rgb(" + [44, 34, 34, 0.56].join(",") + ")";
  const div = document.createElement("div");
  div.classList.toggle("dark-theme");
}
