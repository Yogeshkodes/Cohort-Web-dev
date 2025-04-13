let draggableCard = undefined;
let rightClickedCard = null;
function addTask(columnID) {
  const input = document.getElementById(`${columnID}-input`);
  const textValue = input.value.trim();

  if (textValue === "") return;

  const taskElement = createTaskElement(textValue);
  document.getElementById(`${columnID}-tasks`).appendChild(taskElement);
  input.value = "";
}

function createTaskElement(textValue) {
  const element = document.createElement("div");
  element.textContent = `${textValue}`;
  element.classList.add("cards");
  element.setAttribute("draggable", true);
  element.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    rightClickedCard = this;
    showContextmenu(e.pageX, e.pageY);
  });
  element.addEventListener("dragstart", dragStart);
  element.addEventListener("dragend", dragEnd);

  return element;
}

function dragStart() {
  // this.classList.add("dragging");
  draggableCard = this;
}
function dragEnd() {
  // this.classList.remove("dragging");
  draggableCard = undefined;
}

const columns = document.querySelectorAll(".column .tasks");

columns.forEach((column) => {
  column.addEventListener("dragover", dragOver);
});

function dragOver(event) {
  event.preventDefault();

  this.appendChild(draggableCard);
}

const contextmenu = document.querySelector(".contextMenu");

function showContextmenu(x, y) {
  contextmenu.style.left = `${x}px`;
  contextmenu.style.top = `${y}px`;
  contextmenu.style.display = "block";
}

function editTask() {
  
}

function deleteTaks() {}
