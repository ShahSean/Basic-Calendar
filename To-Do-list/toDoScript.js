// Setting up Data Structure
let toDoList = [];
let trash = [];

function loadFromLocalStorage() {
  const tasks = localStorage.getItem("tasks");

  if (tasks) {
    toDoList = JSON.parse(tasks);
  }
}

function commitToLocalStorage(list) {
  localStorage.setItem("tasks", JSON.stringify(list));
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

let usrInput = document.getElementById("usr-input");
let subBtn = document.querySelector("#submit-btn");
let srchBar = document.querySelector(".search-bar");

// Submit Button Event Listeners
subBtn.addEventListener("click", addBtnClickHandler);
usrInput.addEventListener("keypress", addKeyPressHandler);

// Search bar Listeners
srchBar.addEventListener("keyup", searchBarHander);

// Add-To-List Button handler
function addBtnClickHandler(e) {
  addNewTask(usrInput.value);
  usrInput.value = "";
}
// Keyboard Enter key handler
function addKeyPressHandler(e, func) {
  if (e.code === "Enter" || e.code === "NumpadEnter") {
    addNewTask(usrInput.value);
    usrInput.value = "";
  }
}

// Flag to make sure the completed section header and
// clear button is created only once
let completedSectionCreated = false;

// This function creates the UI for the current Tasks from the toDoList array
function loadTasks() {
  for (let j = 0; j < toDoList.length; j++) {
    // Checking if the Task has been marked as completed
    if (toDoList[j].isDone === true) {
      // Check to see wether the completed section has already been created
      if (!completedSectionCreated) {
        createCmpltHeader();
        clearAllBtn();
        completedSectionCreated = true;
      }
      completedTasksHandler(toDoList[j], toDoList[j].idNum);
    } else {
      addTask(toDoList[j]);
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
  toDoList.push(data);
  addTask(data);
  commitToLocalStorage(toDoList);
}

// This Function Add the Tasks
function addTask(task) {
  let newTask = document.createElement("li");
  let taskText = document.createElement("label");
  let delBtn = document.createElement("button");
  let editBtn = document.createElement("button");
  let checkBox = document.createElement("input");

  newTask.setAttribute("data-task-id", task.idNum);
  newTask.setAttribute("draggable", true);
  // taskText.setAttribute("contenteditable", true);
  checkBox.type = "checkbox";

  // taskText.addEventListener("click", editText);
  delBtn.addEventListener("click", removeHandler);
  editBtn.addEventListener("click", editHandler);
  checkBox.addEventListener("change", checkBoxHandler);

  // Draggable Listeners
  newTask.addEventListener("dragstart", dragStart);
  // newTask.addEventListener("dragover", dragOver);
  // newTask.addEventListener("dragenter", dragEnter);
  // newTask.addEventListener("dragleave", dragLeave);
  // newTask.addEventListener("dragdrop", dragDrop);
  newTask.addEventListener("dragend", dragEnd);

  // Adding appropriate classes to each element
  taskText.classList.add("lbl");
  newTask.classList.add("new-task");
  newTask.classList.add("draggable");
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
    const foundIndex = toDoList.findIndex((el) => {
      return el.idNum === removeId;
    });

    toDoList.splice(foundIndex, 1);

    commitToLocalStorage(toDoList);
    reRender();
  }
}

// This function forces the Tasks UI section to be re-rendered
function reRender() {
  // New Tasks Parent element
  let newTaskParent = document.querySelector(".tasks");
  // Completed tasks parent
  let cmpltparent = document.querySelector(".cmpltTasksSec");

  if (newTaskParent) {
    newTaskParent.querySelectorAll("*").forEach((n) => n.remove());
  }

  if (cmpltparent) {
    cmpltparent.querySelectorAll("*").forEach((n) => n.remove());
  }

  // Reload all tasks
  loadTasks();
}

// This function handled the editing of a task
function editHandler(e) {
  let taskId = e.target.parentElement.getAttribute("data-task-id");
  let textElem = e.target.previousSibling;

  beforeEditReplace(textElem, "input");

  let newInput = document.querySelector(
    "[data-task-id=" + CSS.escape(taskId) + "] > input:nth-child(2)"
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
  const foundIndex = toDoList.findIndex((el) => {
    return el.idNum === id;
  });
  // Changing Local storage with the new value
  toDoList[foundIndex].text = text;
  commitToLocalStorage(toDoList);

  // Replace the source element with the new element on the page
  source.parentNode.replaceChild(newElem, source);
}

function checkBoxHandler(e) {
  let taskId = e.target.parentElement.getAttribute("data-task-id");
  // Searching for the appropriate index in local storage
  const foundIndex = toDoList.findIndex((el) => {
    return el.idNum === taskId;
  });
  // If the checkbox is checked
  if (this.checked) {
    // Apply changes to UI and move it to completed section
    // Changing Local storage with the new value
    toDoList[foundIndex].isDone = true;
    commitToLocalStorage(toDoList);
    reRender();
  }
  // If the task is not completed yet set isDone to false
  else {
    toDoList[foundIndex].isDone = false;
    commitToLocalStorage(toDoList);
    reRender();
  }
}

// Create a function named create2ndHeader which will just create the header
// and then in loadtask we make the rest of the tasks
// in checkBox handler, we will just reRender.

function createCmpltHeader() {
  let $div = document.createElement("div");
  let $ul = document.createElement("ul");
  let $hr = document.createElement("hr");
  let $completedHeader = document.createElement("h2");
  let $br = document.createElement("br");

  $ul.classList.add("cmpltTasksSec");
  $ul.classList.add("task-containers");
  $hr.classList.add("hr");
  $completedHeader.appendChild(document.createTextNode("Completed Tasks"));

  document.querySelector("body > section").appendChild($div);
  $div.appendChild($hr);
  $div.appendChild($completedHeader);
  $div.appendChild($br);
  $div.appendChild($ul);
}

// This function creates the Clear All Button
function clearAllBtn() {
  let $div = document.createElement("div");
  let $clrBtn = document.createElement("button");
  let cmpltSec = document.querySelector(".cmpltTasksSec");

  $clrBtn.appendChild(document.createTextNode("Clear All"));
  $div.classList.add("clr-btn");

  $clrBtn.addEventListener("click", clearAllHandler);
  cmpltSec.after($div);
  $div.appendChild($clrBtn);
}

// This functions handles the behaviour of the Clear All Button
function clearAllHandler() {
  trash = toDoList.filter((task) => task.isDone == true);
  toDoList = toDoList.filter((task) => task.isDone == false);
  commitToLocalStorage(toDoList);
  reRender();
}

// This Function handles the tasks after they have been checked as completed
function completedTasksHandler(task, taskId) {
  let checkedSec = document.querySelector(".cmpltTasksSec");
  addTask(task);
  let checkedTask = document.querySelector(
    "[data-task-id=" + CSS.escape(taskId) + "]"
  );
  checkedSec.appendChild(checkedTask);
  // Setting the Checkbox's UI to true
  let checkBx = checkedTask.querySelector(".check-box");
  checkBx.checked = true;
  // Modifying the CSS for Completed Tasks
  let lbl = checkedTask.querySelector("label");
  let editBtn = checkedTask.querySelector(".edit-btn");
  lbl.classList.add("cmplt-task");
  // Removing Edit Button in Completed Tasks Section
  editBtn.classList.toggle("cmplt-edit-btn");
}

// This function handles the functionality of Search Bar
function searchBarHander(e) {
  let inputText = e.target.value.toLowerCase();
  // Filtering the list based on user's input in Search bar
  toDoList.filter(function (task) {
    let taskText = task.text;
    let taskId = task.idNum;
    let element = document.querySelector(
      "[data-task-id=" + CSS.escape(taskId) + "]"
    );
    // if the user's input was found in the list, show that, and hide others
    if (taskText.toLowerCase().indexOf(inputText) != -1) {
      element.style.display = "grid";
    } else {
      element.style.display = "none";
    }
  });
}

///////////////////////////////////
// Drag and Drop
///////////////////////////////////

function containerDistinction() {
  console.log("I was called");
  // Putting both New Tasks and Completed tasks into one variable
  let containers = document.querySelectorAll(".task-containers");
  containers.forEach((container) => {
    container.addEventListener("dragover", (e) => {
      e.preventDefault();
      const elementAfter = getDragAfterElemenet(container, e.clientY);
      // The item that we are currently dragging
      const draggable = document.querySelector(".dragging");
      if (elementAfter == null) {
        container.appendChild(draggable);
      } else {
        container.insertBefore(draggable, elementAfter);
      }
    });
  });
}

// This function would return the element after
// our current element that's been dragged
// If it's at the end of the container, it would return nothing, so
// we know that we need to append it to the end.
function getDragAfterElemenet(container, y) {
  const draggableElements = [
    ...container.querySelectorAll(".draggable:not(.dragging)"),
  ];
  return draggableElements.reduce(
    (closest, containerChild) => {
      const box = containerChild.getBoundingClientRect();
      // The space between the center of the box and our mouse cursor
      const offset = y - box.top - box.height / 2;
      // When we are above a Box, we get negtive numbers !
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: containerChild };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

// This function will be called when a drag is started
function dragStart(e) {
  e.target.classList.add("dragging");
  containerDistinction();
  setTimeout((fun) => (e.target.style.display = "none"), 0);
}

// This function will be called when a drag is ended
function dragEnd(e) {
  setTimeout((fun) => (e.target.style.display = "grid"), 0);
  e.target.classList.remove("dragging");
}

// This function Starts the App
function startApp() {
  loadFromLocalStorage(); // Try to load list from Local Storage

  if (toDoList.length > 0) {
    loadTasks();
  }
}

startApp();
