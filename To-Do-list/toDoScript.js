const toDo = [];

var usrInput = document.getElementById("usr-input");
let subBtn = document.querySelector("#submit-btn");

// Submit Button Event Listener
subBtn.addEventListener("click", addBtnClickHandler);

let i = 0;

function addBtnClickHandler() {
  addTask(usrInput.value);
}

function addTask(text) {
  let data = { text: text, isDone: false };
  toDo.push(data);
  let newTask = document.createElement("li");
  let delBtn = document.createElement("button");
  delBtn.addEventListener("click", removeHandler);

  newTask.style.listStyleType = "none";
  newTask.style.border = "1px solid grey";
  newTask.style.borderRadius = "10%";

  delBtn.style.margin = "2px 6px";
  delBtn.appendChild(document.createTextNode("Delete"));
  delBtn.classList.add("del-btn-" + (i = i + 1));

  newTask.appendChild(document.createTextNode(text));
  newTask.appendChild(delBtn);

  document.querySelector("body > div").appendChild(newTask);
  console.log(JSON.stringify(toDo));
}

function removeHandler(e) {
  if (confirm("Are you sure ?!")) {
    var elem = e.target.parentElement.parentElement;
    elem.removeChild(e.target.parentElement);
  } else {
    console.log("User was Not Sure");
  }
}

// Storing them in local storage for further access.
// Add a search bar
