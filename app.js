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
  // Remove task from list
  taskList.addEventListener('click', removeTask);
  // Clear all tasks
  clearBtn.addEventListener('click', clearTasks);
  // Filter tasks
  filter.addEventListener('keyup', filterTasks);
}

// Add Task
function addTask(e) {
  if(taskInput.value === '') {
    alert('Task text is missing');
    // prevent creation of an empty node
    return;
  }

  // Create li+link element
  const li = document.createElement('li');
  const taskText = document.createTextNode(taskInput.value);
  const link = document.createElement('a');

  // Add a class
  li.className = 'collection-item';
  // Create textNode and append to li
  li.appendChild(taskText);
  // console.log(taskText);
  // console.log(li);
  
  // Create link remove X
  link.className = 'delete-item secondary-content'; // Materialize CSS
  // Add FA icon X
  link.innerHTML = '<i class="fa fa-remove"></i>'; // x
  // Append remove link to li
  li.appendChild(link);

  // Add li to ul parent
  taskList.appendChild(li);

  // Clear input or X won't display
  taskInput.value = '';

  e.preventDefault();
} // end Add Task

// Remove Tasks
function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    console.log(e.target.parentElement.parentElement);
    if(confirm('Deleting task are you eh?')) {
      // parent of the parent: i > a > li
      e.target.parentElement.parentElement.remove();
    }
  }
}

// Clear Tasks
function clearTasks() {
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild)
  }
}

// Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  // console.log(text);
  const collectionItem = document.querySelectorAll('.collection-item');
  // console.log(collectionItem); // output a nodeList[] collection, so we can run a forEach() loop
  // const collectionItemClass = document.getElementsByClassName('.collection-item');
  // console.log(collectionItemClass); // output a HTMLCollection[], so we can NOT run a forEach() loop unless is converted into an array

  collectionItem.forEach(function(task) {
    const item = task.firstChild.textContent;
    // if there is no match the result will be -1
    if(item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}