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
function addKeyPressHandler(e, func) {
  if (e.code === "Enter") {
    addNewTask(usrInput.value);
    usrInput.value = "";
  }
}

// This Functions created the UI for the current Tasks in the Local Storage
function loadTasks() {
  // Making a counter to make sure we only create
  // the "Complete Tasks" header only once
  let counter = 0;
  for (var j = 0; j < toDo_list.length; j++) {
    // Checking if the Task has been marked as completed
    if (toDo_list[j].isDone === true) {
      // Checking to see if it's the first completed task,
      // then create the Completed section
      if (counter == 0) {
        creatCmpltHeader();
      }
      completedTasksHandler(toDo_list[j], toDo_list[j].idNum);
      counter++;
    } else {
      addTask(toDo_list[j]);
    }
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
  let checkBox = document.createElement("input");

  newTask.setAttribute("data-task-id", task.idNum);
  checkBox.type = "checkbox";

  delBtn.addEventListener("click", removeHandler);
  editBtn.addEventListener("click", editHandler);
  checkBox.addEventListener("change", checkBoxHandler);

  // Adding appropriate classes to each element
  newTask.classList.add("new-task");
  delBtn.classList.add("del-btn");
  editBtn.classList.add("edit-btn");
  checkBox.classList.add("check-box");

  delBtn.appendChild(document.createTextNode("Delete"));
  editBtn.appendChild(document.createTextNode("Edit"));
  taskText.appendChild(document.createTextNode(task.text));

  // Appending each element to document
  document.querySelector("body > section > ul").appendChild(newTask);
  newTask.appendChild(checkBox);
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
  // New Tasks Parent element
  let parentElem = document.querySelector(".tasks");
  // Completed tasks parent
  let cmpltparent = document.querySelectorAll(".cmpltTasks");

  parentElem.querySelectorAll("*").forEach((n) => n.remove());
  cmpltparent.forEach((n) => n.remove());
  // Reload all tasks
  loadTasks();
}

// This function handled the editing of a task
function editHandler(e) {
  let taskId = e.target.parentElement.getAttribute("data-task-id");
  let textElem = e.target.previousSibling;

  beforeEditReplace(textElem, "input");

  let newInput = document.querySelector(
    "[data-task-id=" + CSS.escape(taskId) + "] > input"
  );

  newInput.addEventListener("keypress", function func(e) {
    if (e.code === "Enter") {
      afterEditReplace(newInput, "label", taskId);
    }
  });
}

// This function Changes the Task to an input, for user to Edit the previous task
function beforeEditReplace(source, newType) {
  const text = source.innerHTML;
  // Create the document fragment
  const frag = document.createDocumentFragment();

  // Fill it with what's in the source element
  while (source.firstChild) {
    frag.appendChild(source.firstChild);
  }
  // Create the new element
  const newElem = document.createElement(newType);

  // Empty the document fragment into it
  newElem.appendChild(frag);
  newElem.value = text;

  // Replace the source element with the new element on the page
  source.parentNode.replaceChild(newElem, source);
}

// This function gets the new User's input, and replace it with the old task
function afterEditReplace(source, newType, id) {
  const text = source.value;
  // Create the document fragment
  const frag = document.createDocumentFragment();

  // Fill it with what's in the source element
  while (source.firstChild) {
    frag.appendChild(source.firstChild);
  }
  // Create the new element
  const newElem = document.createElement(newType);

  // Empty the document fragment into it
  newElem.appendChild(frag);
  newElem.innerHTML = text;

  // Searching for the appropriate index in local storage
  var foundIndex = toDo_list.findIndex((el) => {
    return el.idNum === id;
  });
  // Changing Local storage with the new value
  toDo_list[foundIndex].text = text;
  localStorage.setItem("tasks", JSON.stringify(toDo_list));

  // Replace the source element with the new element on the page
  source.parentNode.replaceChild(newElem, source);
}

function checkBoxHandler(e) {
  let taskId = e.target.parentElement.getAttribute("data-task-id");
  // Searching for the appropriate index in local storage
  var foundIndex = toDo_list.findIndex((el) => {
    return el.idNum === taskId;
  });
  // If the checkbox is checked
  if (this.checked) {
    // Apply changes to UI and move it to completed section
    // completedTasksHandler(taskId);
    // Changing Local storage with the new value
    toDo_list[foundIndex].isDone = true;
    localStorage.setItem("tasks", JSON.stringify(toDo_list));
    reRender();
  }
  // If the task is not completed yet set isDone to false
  else {
    toDo_list[foundIndex].isDone = false;
    localStorage.setItem("tasks", JSON.stringify(toDo_list));
    reRender();
  }
}

// Create a function named create2ndHeader which will just create the header
// and then in loadtask we make the rest of the tasks
// in checkBox handler, we will just reRender.

function creatCmpltHeader() {
  let $ul = document.createElement("ul");
  let $hr = document.createElement("hr");
  let $completedHeader = document.createElement("h2");
  let $br = document.createElement("br");

  $ul.classList.add("cmpltTasks");
  $hr.classList.add("hr");
  $completedHeader.appendChild(document.createTextNode("Completed Tasks"));

  document.querySelector("body > section ").appendChild($ul);
  $ul.appendChild($hr);
  $ul.appendChild($completedHeader);
  $ul.appendChild($br);
}

// This Function handles the tasks after they have been checked as completed
function completedTasksHandler(task, taskId) {
  let checkedSec = document.querySelector(".cmpltTasks");
  console.log("I was called");
  addTask(task);
  let checkedTask = document.querySelector(
    "[data-task-id=" + CSS.escape(taskId) + "]"
  );
  checkedSec.appendChild(checkedTask);
}
