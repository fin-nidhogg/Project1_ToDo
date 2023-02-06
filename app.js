// Global variables
const taskForm = document.getElementById("task-form");
const todolist = document.getElementsByClassName("tasks-list");
const taskInput = document.getElementById("task-input");

let tasks = JSON.parse(localStorage.getItem("todos")) || [];

// Read and render all elements from local storage
if (localStorage.getItem("todos")) {
  tasks.map((task) => {
    createTodo(task);
  });
}

// Listen if submit button is pressed
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get input from form. If empty, raise error into form
  const taskValue = taskInput.value;
  if (taskValue == "") {
    taskInput.classList.add("error");
    taskInput.placeholder = "Cannot be empty!";
    return;
  }
  // Create object from form data
  const todo = {
    id: new Date().getTime(),
    name: taskInput.value,
    ifCompleted: false,
  };

  /* 
Save todo object into local storage. 
Render new li -item from object
*/

  tasks.push(todo);
  localStorage.setItem("todos", JSON.stringify(tasks));
  createTodo(todo);

  // Reset form and remove error message if present
  taskInput.classList.remove("error");
  taskInput.placeholder = "Add something awesome...";
  taskForm.reset();
  taskForm.focus();
});

todolist[0].addEventListener("click", (event) => {
  if (event.target.classList.contains('delete') || 
  event.target.parentElement.classList.contains('delete') ||
  event.target.parentClass.parentClass.classList.contains('delete')) {
    const todoId = event.target.closest("li").id;

    deleteTodo(todoId);
  }
});

// Function to create and render li element from object

function createTodo(todo) {
  const todoElement = document.createElement("li");
  todoElement.setAttribute("id", todo.id);

  const taskHtml = `
    <div>
        <input type="checkbox" name="task" id="${todo.id}">
        <span contenteditable="true">${todo.name}</span>
    </div>
    <button title="Delete the "${todo.name}" task" class="delete">
        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem"
        viewBox="0 0 1280.000000 1280.000000" preserveAspectRatio="xMidYMid meet">
        <metadata>
        Created by potrace 1.15, written by Peter Selinger 2001-2017
        </metadata>
        <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)" fill="#FF0000"
        stroke="none">
        <path d="M3137 9659 l-537 -539 1360 -1360 1360 -1360 -1360 -1360 -1360
        -1360 540 -540 540 -540 1360 1360 1360 1360 1360 -1360 1360 -1360 540 540
        540 540 -1360 1360 -1360 1360 1360 1360 1360 1360 -540 540 -540 540 -1360
        -1360 -1360 -1360 -1360 1360 c-748 748 -1361 1360 -1362 1359 -2 0 -245 -243
        -541 -540z" />
        </g>
        </svg>  
    </button>
    `;
  todoElement.innerHTML = taskHtml;
  todolist[0].appendChild(todoElement);
}

function deleteTodo(todoId) {
  tasks = tasks.filter((todo) => {
    tasks.id != parseInt(todoId);
  });

  localStorage.setItem("todos", JSON.stringify(tasks));
  document.getElementById(todoId).remove();
}
