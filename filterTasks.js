// Get all nodelist consisting all li elements
const liItems = document.querySelectorAll("li");

// IF Editable btn is triggered
function filterTasks(event) {
  
  const pushedBtn = event.target.id;
  
  // Check if active button is pushed and add proper classes to btn and li elements.
  if (pushedBtn === "active") {
    liItems.forEach((item) => {
      item.classList.remove("hidden");
      if (item.classList.contains("done")) {
        item.classList.add("hidden");
      }
    });
  }

  // Check if complete button is pushed and add proper classes to btn and li elements.
  if (pushedBtn === "complete") {
    liItems.forEach((item) => {
      item.classList.remove("hidden");
      if (!item.classList.contains("done")) {
        item.classList.add("hidden");
      }
    });
  }

  // IF All btn is triggered, remove all hidden classes.
  if (pushedBtn === "total") {
    liItems.forEach((item) => {
      item.classList.remove("hidden");
    });
  }
}

// Listen click events in current window
window.addEventListener("click", filterTasks);
