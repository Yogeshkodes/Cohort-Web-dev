/**
 * Write your challenge solution here
 */

const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const emptyList = document.querySelector(".empty-list");
const totalTasks = document.querySelector("#totalTasks");
const completedTasks = document.querySelector("#completedTasks");

function createList(value) {
  if (emptyList) emptyList.remove();

  const li = document.createElement("li");
  li.classList.add("task-item");
  li.innerHTML = `
      <input type="checkbox" class="complete-checkbox">
      <span class="task-text">${value}</span>
      <button class="delete-button">Delete</button>`;

  const checkbox = li.querySelector(".complete-checkbox");
  const deleteButtom = li.querySelector(".delete-button");
  checkbox.addEventListener("change", () => {
    li.classList.toggle("completed", checkbox.checked);
    const completedCount = taskList.querySelectorAll(".completed").length;
    completedTasks.textContent = `Completed: ${completedCount}`;
  });

  deleteButtom.addEventListener("click", () => {
    li.remove();
    totalTasks.textContent = `Total tasks: ${taskList.children.length}`;
    const completedCount = taskList.querySelectorAll(".completed").length;
    completedTasks.textContent = `Completed: ${completedCount}`;
  });
  taskList.appendChild(li);
  taskInput.value = "";

  console.log(taskList.querySelectorAll(".completed").length);
  totalTasks.textContent = `Total tasks: ${taskList.children.length}`;
}

addButton.addEventListener("click", () => {
  const value = taskInput.value.trim();
  if (value) createList(value);
});

taskInput.addEventListener("keydown", (event) => {
  const value = taskInput.value.trim();

  if (event.key === "Enter") {
    createList(value);
  }
});
