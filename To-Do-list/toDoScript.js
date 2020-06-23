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
function addBtnClickHandler() {
  addNewTask(usrInput.value);
  usrInput.value = "";
}
// Keyboard Enter key handler    || e.code === "NumpadEnter"
function addKeyPressHandler(e) {
  if (e.code === "Enter" || e.code === "NumpadEnter") {
    addNewTask(text)(usrInput.value);
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
  let taskText = document.createElement("div");
  let delBtn = document.createElement("button");

  newTask.setAttribute("data-task-id", task.idNum);

  delBtn.addEventListener("click", removeHandler);

  newTask.classList.add("new-task");
  delBtn.classList.add("del-btn");

  delBtn.appendChild(document.createTextNode("Delete"));
  taskText.appendChild(document.createTextNode(task.text));

  document.querySelector("body > form > ul").appendChild(newTask);
  // document.querySelector("body > form> ul").appendChild(taskText);
  // // taskText.appendChild(delBtn);
  // document.querySelector("body > form> ul").appendChild(delBtn);
  newTask.appendChild(taskText);
  newTask.appendChild(delBtn);
}

// This funciton handles the Deltion
function removeHandler(e) {
  let test = Json.stringify(e.target.previousSibling);
  console.log("test is :" + test);
  const removeId = e.target.previousSibling.getAttribute("data-task-id");
  console.log("This is the remove ID : " + removeId);
  if (confirm("Are you sure ?!")) {
    // var elem = e.target.parentElement.parentElement.parentElement;
    // elem.removeChild(e.target.parentElement);

    var foundIndex = toDo_list.findIndex((el) => {
      return el.idNum === removeId;
    });

    toDo_list.splice(foundIndex, 1);
    console.log(JSON.stringify(toDo_list));
    localStorage.setItem("tasks", JSON.stringify(toDo_list));
  }
}
