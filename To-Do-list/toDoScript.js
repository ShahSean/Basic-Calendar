// Setting up Data Structure
let toDo = [];
let i = 0;
if (localStorage.getItem("toDo")) {
  toDo = JSON.parse(localStorage.getItem("toDo"));
  addExistingTask();
}

var usrInput = document.getElementById("usr-input");
let subBtn = document.querySelector("#submit-btn");

// Submit Button Event Listeners
subBtn.addEventListener("click", addBtnClickHandler);
usrInput.addEventListener("keypress", addKeyPressHandler);

// Add-To-List Button handler
function addBtnClickHandler() {
  addNewTask(usrInput.value);
  usrInput.value = "";
}
// Keyboard Enter key handler
function addKeyPressHandler(e) {
  if (e.code === "Enter") {
    addNewTask(usrInput.value);
    usrInput.value = "";
  }
}

// This Functions created the UI for the current Tasks in the Local Storage
function addExistingTask() {
  for (var j = 0; j < toDo.length; j++) {
    addTask(toDo[j].text);
  }
}

function addNewTask(task) {
  let data = { text: task, isDone: false };
  toDo.push(data);
  addTask(task);
  localStorage.setItem("toDo", JSON.stringify(toDo));
}

function addTask(task) {
  let newTask = document.createElement("li");
  newTask.setAttribute("data-id", i++);
  let delBtn = document.createElement("button");
  delBtn.addEventListener("click", removeHandler);

  newTask.style.listStyleType = "none";
  newTask.style.border = "1px solid grey";
  newTask.style.borderRadius = "0.6em";

  delBtn.style.margin = "2px 6px";
  delBtn.appendChild(document.createTextNode("Delete"));

  delBtn.classList.add("del-btn");

  newTask.appendChild(document.createTextNode(task));
  newTask.appendChild(delBtn);

  document.querySelector("body > div").appendChild(newTask);
}

function removeHandler(e) {
  const removeIndex = e.target.parentElement.getAttribute("data-id");
  console.log(removeIndex);

  if (confirm("Are you sure ?!")) {
    var elem = e.target.parentElement.parentElement;
    elem.removeChild(e.target.parentElement);
    toDo.splice(removeIndex, 1);
  }
}
