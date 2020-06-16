const usrInput = document.querySelector("#usr-input").value;
let subBtn = document
  .querySelector("#submit-btn")
  .addEventListener("click", addTask(usrInput));

function addTask(task) {
  const taskBox = document.createElement("div");
  const newTask = document.createElement("div");
  taskBox.appendChild(newTask);
  document.querySelector("body > div > div").appendChild(taskBox);
  console.log("input is" + task);
}
