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
  event.target.parentElement.classList.contains('delete')) {
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
    <i class="fa-sharp fa-solid fa-trash"></i>  
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
