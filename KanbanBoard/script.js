let draggableCard = undefined;
let rightClickedCard = null;

document.addEventListener("DOMContentLoaded", loadTaskfromLocalStorage);

function addTask(columnID) {
  const input = document.getElementById(`${columnID}-input`);
  const textValue = input.value.trim();

  if (textValue === "") return;
  const taskDate = new Date().toLocaleString();
  const taskElement = createTaskElement(textValue, taskDate);
  document.getElementById(`${columnID}-tasks`).appendChild(taskElement);
  updateCount(columnID);
  saveTasktoLocalStorage(columnID, taskDate, textValue);

  input.value = "";
}

function createTaskElement(textValue, taskDate) {
  const element = document.createElement("div");
  element.innerHTML = `<span>${textValue}</span>

  <small class="time">${taskDate}</small>
  `;
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
  this.classList.add("dragging");
  draggableCard = this;
  // updateLocalStorage();
}
function dragEnd() {
  this.classList.remove("dragging");
  draggableCard = undefined;
  ["todo", "Progress", "done"].forEach((columnID) => {
    updateCount(columnID);
    updateLocalStorage();
  });
}

const columns = document.querySelectorAll(".column .tasks");

columns.forEach((column) => {
  column.addEventListener("dragover", dragOver);
});

function dragOver(event) {
  event.preventDefault();
  this.appendChild(draggableCard);
  const draggedCard = document.querySelector(".dragging");
  const cards = Array.from(this.querySelectorAll(".cards"));

  let closest = null;
  let closestDistance = Infinity;

  cards.forEach((card) => {
    const rect = card.getBoundingClientRect();
    const distance = Math.abs(event.pageY - (rect.top + rect.height / 2));

    if (distance < closestDistance) {
      closestDistance = distance;
      closest = card;
    }
  });

  if (closest && draggedCard !== closest) {
    this.insertBefore(draggedCard, closest);
  }
}

const contextmenu = document.querySelector(".contextMenu");

function showContextmenu(x, y) {
  contextmenu.style.left = `${x}px`;
  contextmenu.style.top = `${y}px`;
  contextmenu.style.display = "block";
}

document.addEventListener("click", () => {
  contextmenu.style.display = "none";
});

function editTask() {
  if (rightClickedCard !== null) {
    const newText = prompt("Edit Text", rightClickedCard.textContent);

    if (newText !== "") {
      rightClickedCard.textContent = newText;
      updateLocalStorage();
    }
  }
}

function deleteTask() {
  if (rightClickedCard !== null) {
    const columnID = rightClickedCard.parentElement.id.replace("-tasks", "");

    rightClickedCard.remove();
    rightClickedCard = null;

    updateLocalStorage();
    updateCount(columnID);
  }
}

function updateCount(columnID) {
  const count = document.querySelectorAll(`#${columnID}-tasks .cards`).length;
  document.querySelector(`.${columnID}-count`).textContent = count;
}

function saveTasktoLocalStorage(columnID, taskDate, tasktext) {
  const tasks = JSON.parse(localStorage.getItem(columnID)) || [];
  tasks.push({ text: tasktext, date: taskDate });
  localStorage.setItem(columnID, JSON.stringify(tasks));
}

function loadTaskfromLocalStorage() {
  ["todo", "Progress", "done"].forEach((columnID) => {
    const tasks = JSON.parse(localStorage.getItem(columnID)) || [];

    tasks.forEach(({ text, date }) => {
      const taskElement = createTaskElement(text, date);
      document.getElementById(`${columnID}-tasks`).appendChild(taskElement);
    });

    updateCount(columnID);
  });
}

function updateLocalStorage() {
  ["todo", "Progress", "done"].forEach((columnID) => {
    const tasks = [];
    document.querySelectorAll(`#${columnID}-tasks .cards`).forEach((card) => {
      const taskText = card.querySelector("span").textContent;
      const taskDate = card.querySelector("small").textContent;

      tasks.push({ text: taskText, date: taskDate });
    });

    localStorage.setItem(columnID, JSON.stringify(tasks));

    updateCount(columnID);
  });
}
