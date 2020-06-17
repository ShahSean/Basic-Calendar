var usrInput = document.getElementById("usr-input");
let subBtn = document.querySelector("#submit-btn");
let i = 0;

function addBtnClickHandler() {
  addTask(usrInput.value);
}
subBtn.addEventListener("click", addBtnClickHandler);

function addTask(text) {
  let newTask = document.createElement("li");
  let delBtn = document.createElement("button");

  newTask.style.listStyleType = "none";
  newTask.style.border = "1px solid grey";
  newTask.style.borderRadius = "10%";

  delBtn.style.margin = "2px 6px";
  delBtn.appendChild(document.createTextNode("Delete"));
  delBtn.classList.add("del-btn-" + (i = i + 1));
  delBtn.addEventListener("click", removeHandler(delBtn.classList));

  newTask.appendChild(document.createTextNode(text));
  newTask.appendChild(delBtn);

  document.querySelector("body > div").appendChild(newTask);
}

function removeHandler(delBtn) {
  // let delBtnHandler = document.querySelector("[class^='del-btn-'");
  console.log(delBtn);
}

// Delete Button
// Storing them in hard for further access.
