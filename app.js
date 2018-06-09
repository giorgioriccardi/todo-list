// Define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

function loadEventListeners() {
  // Add task form event
  form.addEventListener('submit', addTask);
}

// Add Task
function addTask(e) {
  if(taskInput.value === '') {
    alert('Task is missing');
  }

  e.preventDefault();
}