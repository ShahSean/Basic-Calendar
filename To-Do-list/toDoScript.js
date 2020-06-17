var usrInput = document.getElementById("usr-input").value;
let subBtn = document
  .querySelector("#submit-btn")
  .addEventListener("click", addTask);

function addTask(e) {
  e.preventDefault();
  let taskBox = document.createElement("ul");
  let newTask = document.createElement("li");
  newTask.style.border = "2px solid blue";
  taskBox.appendChild(newTask);
  newTask.appendChild(document.createTextNode(usrInput));
  document.querySelector("body > div > div").appendChild(taskBox);
}
