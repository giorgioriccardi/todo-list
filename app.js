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

  // Create <li></li> element
  const li = document.createElement('li');
  const taskText = document.createTextNode(taskInput.value);
  // Add a class
  li.className = 'collection-item';
  // Create textNode and append to li
  li.appendChild(taskText);
  console.log(taskText);
  console.log(li);

  // Add li to ul parent
  taskList.appendChild(li);

  e.preventDefault();
}
