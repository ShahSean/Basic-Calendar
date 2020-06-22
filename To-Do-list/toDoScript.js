// Setting up Data Structure
let toDo_list = [];
let i = 0;
if (localStorage.getItem("tasks")) {
  toDo_list = JSON.parse(localStorage.getItem("tasks"));
  loadTasks();
}

function timeStamp() {
  let time = 0,
    now = new Date();

  time = now.getFullYear();
  time += (now.getMonth < 9 ? "0" : "") + now.getMonth();
  time += (now.getDate < 10 ? "0" : "") + now.getDate();
  time += now.getUTCMilliseconds();
  return time;
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
  if (e.code === "Enter" || e.code === "NumpadEnter") {
    addNewTask(usrInput.value);
    usrInput.value = "";
  }
}

// This Functions created the UI for the current Tasks in the Local Storage
function loadTasks() {
  for (var j = 0; j < toDo_list.length; j++) {
    addTask(toDo_list[j]);
  }
}

// This Function Adds the newly added Tasks
function addNewTask(task) {
  let uniqueID = timeStamp();
  let data = {
    text: task,
    isDone: false,
    idNum: uniqueID,
  };
  toDo_list.push(data);
  addTask(data);
  localStorage.setItem("tasks", JSON.stringify(toDo_list));
}
// This Function Add the Tasks

function addTask(task) {
  let newTask = document.createElement("li");
  let delBtn = document.createElement("button");

  newTask.setAttribute("data-task-id", task.idNum);

  delBtn.addEventListener("click", removeHandler);

  newTask.classList.add("new-task");
  delBtn.classList.add("del-btn");

  delBtn.appendChild(document.createTextNode("Delete"));
  newTask.appendChild(document.createTextNode(task.text));
  newTask.appendChild(delBtn);

  document.querySelector("body > div").appendChild(newTask);
}

// This funciton handles the Deltion
function removeHandler(e) {
  const removeId = e.target.parentElement.getAttribute("data-task-id");

  if (confirm("Are you sure ?!")) {
    var elem = e.target.parentElement.parentElement;
    elem.removeChild(e.target.parentElement);
    var foundIndex = toDo_list.findIndex((el) => {
      return el.idNum === removeId;
    });
    toDo_list.splice(foundIndex, 1);
    console.log(JSON.stringify(toDo_list));
    localStorage.setItem("tasks", JSON.stringify(toDo_list));
  }
}
