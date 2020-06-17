var usrInput = document.getElementById("usr-input");
let subBtn = document.querySelector("#submit-btn");

function addBtnClickHandler() {
  addTask(usrInput.value);
}
subBtn.addEventListener("click", addBtnClickHandler);

function addTask(text) {
  let taskBox = document.createElement("ul");
  let newTask = document.createElement("li");
  newTask.style.border = "2px solid blue";
  taskBox.appendChild(newTask);
  newTask.appendChild(document.createTextNode(text));
  document.querySelector("body > div").appendChild(taskBox);
}
