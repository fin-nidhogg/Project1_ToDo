// Global variables
const taskForm = document.getElementById("task-form");
const todolist = document.getElementsByClassName("tasks-list");
const taskInput = document.getElementById("task-input");
const errorMessage = "What's the point of empty task?";

// Counter elements
const countActive = document.getElementById("active");
const countCompleted = document.getElementById("complete");
const countAll = document.getElementById("total");

// Main Array witch contains all tasks
let tasks = JSON.parse(localStorage.getItem("todos")) || [];

/* 
///////////////////////////////
"MAIN PROGRAM CODE STARTS HERE"
///////////////////////////////
*/

countTasks(); // Check initial stats for tasks 

// Read and render all elements from local storage
if (localStorage.getItem("todos")) {
  tasks.map((task) => {
    createTodo(task);
  });
}

/*
Listen if submit button is pressed. Default reload for submit is prevented.
Catch form data, create object from it and save object into localstorage.
*/
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
    done: false,
  };

  // Save todo object into local storage and render new li -item from object
  tasks.push(todo);
  localStorage.setItem("todos", JSON.stringify(tasks));
  createTodo(todo);
  countTasks();

  // Reset form and remove error message if present
  taskInput.classList.remove("error");
  taskInput.placeholder = "Add something awesome...";
  taskForm.reset();
  taskForm.focus();
});

// Event listener for triggering delete function for specified todoID
todolist[0].addEventListener("click", (event) => {
  if (
    event.target.classList.contains("delete") ||
    event.target.parentElement.classList.contains("delete")
  ) {
    const todoId = event.target.closest("li").id;

    deleteTodo(todoId);
  }
});

// Event listener for triggering edit function for specified todoID
todolist[0].addEventListener("input", (event) => {
  const todoId = event.target.closest("li").id;
  updateTodo(todoId, event.target);
});

// Remove focus from any element if [Enter] is pressed
todolist[0].addEventListener("keydown", (event) => {
  if (event.keyCode == 13) {
    event.preventDefault();
    event.target.blur();
  }
});

/* 
///////////////////////////////
"MAIN PROGRAM CODE ENDS HERE"
///////////////////////////////
*/

//////////////////////////////////
// Function to CREATE new Todo Element
//////////////////////////////////

function createTodo(todo) {
  const todoElement = document.createElement("li");
  todoElement.setAttribute("id", todo.id);

  if (todo.done == true) {
    todoElement.classList.add("done");
  }

  if (todo.name == "What's the point of empty task?") {
    todoElement.closest("li").classList.add("error");
    todoElement.textContent = "What's the point of empty task?";
  }

  const taskHtml = `
    <div>
        <input type="checkbox" name="task" id="${todo.id}" ${
    todo.done ? "checked" : ""
  }>
        <span ${!todo.done ? "contenteditable" : ""}>${todo.name}</span>
    </div>
    <button title="Delete the "${todo.name}" task" class="delete">
    <i class="fa-sharp fa-solid fa-trash"></i>  
    </button>
    `;
  todoElement.innerHTML = taskHtml;
  todolist[0].appendChild(todoElement);
}

//////////////////////////////////
// Fuction to DELETE selected todo
//////////////////////////////////

function deleteTodo(todoId) {
  tasks = tasks.filter((todo) => todo.id != parseInt(todoId));

  localStorage.setItem("todos", JSON.stringify(tasks));
  document.getElementById(todoId).remove();
  countTasks();
}

//////////////////////////////////
// Fuction to EDIT selected todo
//////////////////////////////////

function updateTodo(todoId, todoElement) {
  const todo = tasks.find((todo) => todo.id == parseInt(todoId));
  const span = todoElement.nextElementSibling;
  const parent = todoElement.closest("li");

  if (todoElement.hasAttribute("contenteditable")) {
    if (todoElement.textContent !== "") {
      todo.name = todoElement.textContent; // IF Element is editable, edit content
      parent.classList.remove("error");
    } else {
      todo.name = errorMessage;
      todoElement.textContent = errorMessage;
      parent.classList.add("error");
    }
  } else {
    todo.done = !todo.done; // LI Element wasn't editable so event was triggered by tickbox. Therefore let's switch the state of "done" -value.

    if (todo.done == true) {
      // IF task has value done = true, remove ability to edit and add done css class.
      span.removeAttribute("contenteditable");
      parent.classList.remove("error");
      parent.classList.add("done");
    } else {
      // Task isn't done so we can edit it = make field editable and remove possible done css class.
      span.setAttribute("contenteditable", "true");
      parent.classList.remove("done");
    }
  }
  localStorage.setItem("todos", JSON.stringify(tasks));
  countTasks();
}

//////////////////////////////////
// Count tasks
//////////////////////////////////

function countTasks() {
  const completedArray = tasks.filter((task) => task.done == true);
  const complete = completedArray.length;
  const alltasks = tasks.length;

  countCompleted.innerHTML = "Completed: " + complete;
  countAll.innerHTML = "Total: " + tasks.length;
  countActive.innerHTML = "Active: " + (alltasks - complete);
}

/* 
//////////////////////////////////
FUNCTIONS USED IN MAIN LOGIC ENDS
//////////////////////////////////
*/
