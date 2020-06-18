const toDo = [];

var usrInput = document.getElementById("usr-input");
let subBtn = document.querySelector("#submit-btn");

// Submit Button Event Listener
subBtn.addEventListener("click", addBtnClickHandler);
usrInput.addEventListener("keypress", addKeyPressHandler);

let i = 0;

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

function addTask(text) {
  let data = { text: text, isDone: false };
  toDo.push(data);
  let newTask = document.createElement("li");
  newTask.setAttribute("data-id", i++);
  let delBtn = document.createElement("button");
  delBtn.addEventListener("click", removeHandler);

  newTask.style.listStyleType = "none";
  newTask.style.border = "1px solid grey";
  newTask.style.borderRadius = "10%";

  delBtn.style.margin = "2px 6px";
  delBtn.appendChild(document.createTextNode("Delete"));

  delBtn.classList.add("del-btn");

  newTask.appendChild(document.createTextNode(text));
  newTask.appendChild(delBtn);

  document.querySelector("body > div").appendChild(newTask);
  console.log(JSON.stringify(toDo));
}

function removeHandler(e) {
  const removeIndex = e.target.parentElement.getAttribute("data-id");

  if (confirm("Are you sure ?!")) {
    var elem = e.target.parentElement.parentElement;
    elem.removeChild(e.target.parentElement);
    // console.log(
    //   "Element is : " + JSON.stringify(e.target.parentElement.innerText)
    // );
    // console.log(toDo.indexOf(e.target.parentElement.innerText));
    // let filArr = toDo.filter(function fun(value, index, arr){
    // }  )
  } else {
    console.log("User was Not Sure");
  }
}

// Add a search bar
