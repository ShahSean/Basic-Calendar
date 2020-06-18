let toDo = [];
if (localStorage.getItem("toDo")) {
  toDo = JSON.parse(localStorage.getItem("toDo"));
  console.log("Object Already made");
}

let i = 0;
var usrInput = document.getElementById("usr-input");
let subBtn = document.querySelector("#submit-btn");

// Submit Button Event Listeners
subBtn.addEventListener("click", addBtnClickHandler);
usrInput.addEventListener("keypress", addKeyPressHandler);

function addBtnClickHandler() {
  addTask(usrInput.value);
  usrInput.value = "";
}

function addKeyPressHandler(e) {
  if (e.code === "Enter") {
    addTask(usrInput.value);
    usrInput.value = "";
  }
}

function addTask(task) {
  let data = { task: text, isDone: false };
  toDo.push(data);

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
  localStorage.setItem("toDo", JSON.stringify(toDo));
  console.log(JSON.stringify(toDo));
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

// Add a search bar
// Add them to local storage
