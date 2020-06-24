// Setting up Data Structure
let toDo_list = [];
let i = 0;
// Checking if there is already a list in Local Storage
// If so, rebuilds the UI
if (localStorage.getItem("tasks")) {
  toDo_list = JSON.parse(localStorage.getItem("tasks"));
  loadTasks();
}

// This function creates a unique number which will be used as unique ID Number
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
function addBtnClickHandler(e) {
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
  let taskText = document.createElement("label");
  let delBtn = document.createElement("button");
  let editBtn = document.createElement("button");

  newTask.setAttribute("data-task-id", task.idNum);

  delBtn.addEventListener("click", removeHandler);
  editBtn.addEventListener("click", editHandler);

  newTask.classList.add("new-task");
  delBtn.classList.add("del-btn");
  editBtn.classList.add("edit-btn");

  delBtn.appendChild(document.createTextNode("Delete"));
  editBtn.appendChild(document.createTextNode("Edit"));
  taskText.appendChild(document.createTextNode(task.text));

  document.querySelector("body > section > ul").appendChild(newTask);
  newTask.appendChild(taskText);
  newTask.appendChild(editBtn);
  newTask.appendChild(delBtn);
}

// This funciton handles the Deltion
function removeHandler(e) {
  const removeId = e.target.parentElement.getAttribute("data-task-id");

  if (confirm("Are you sure ?!")) {
    var foundIndex = toDo_list.findIndex((el) => {
      return el.idNum === removeId;
    });

    toDo_list.splice(foundIndex, 1);

    localStorage.setItem("tasks", JSON.stringify(toDo_list));
    reRender();
  }
}

// This function forces the Tasks UI section to be re-rendered
function reRender() {
  let parentElem = document.querySelector(".tasks");
  parentElem.querySelectorAll("*").forEach((n) => n.remove());
  loadTasks();
}

function editHandler(e) {
  let taskId = e.target.parentElement.getAttribute("data-task-id");
  let taskText = e.target.previousSibling;

  let newInput = document.createElement("input");

  newInput.value = taskText.innerHTML;
  e.target.parentElement.appendChild(newInput);
  // console.log("Parent is: " + JSON.stringify(e.target.parentElement));
  console.log("Prev Sibling is: " + taskText.innerHTML);
  console.log("Task ID is : " + taskId);
  console.log("new input is : " + newInput.placeholder);
}
