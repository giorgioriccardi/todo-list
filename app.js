// Define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

function loadEventListeners() {
  // DOM Load event
  document.addEventListener('DOMContentLoaded', getTasksFromLocalStorage);
  // Add task form event
  form.addEventListener('submit', addTask);
  // Remove task from list
  taskList.addEventListener('click', removeTask);
  // Clear all tasks
  clearBtn.addEventListener('click', clearTasks);
  // Filter tasks
  filter.addEventListener('keyup', filterTasks);
}

// Get Tasks from LS
function getTasksFromLocalStorage() {
  let tasks;
  const localStorageTasks = localStorage.getItem('tasks');
  if (localStorageTasks === null) {
    tasks = [];
  } else {
    // LS can only store strings, so we need to parse and convert the tasks[] array
    tasks = JSON.parse(localStorageTasks);
  }

  tasks.forEach(function(task) {
    // Create DOM element
    const li = document.createElement('li');
    const taskText = document.createTextNode(task);
    const link = document.createElement('a');

    // Add a class
    li.className = 'collection-item';
    // Create textNode and append to li
    li.appendChild(taskText);
    // Create link remove X
    link.className = 'delete-item secondary-content'; // Materialize CSS
    // Add FA icon X
    link.innerHTML = '<i class="fa fa-remove"></i>'; // x
    // Append remove link to li
    li.appendChild(link);
    // Add li to ul parent
    taskList.appendChild(li);
  });
}

// Add Task
function addTask(e) {
  // Create li+link element
  const li = document.createElement('li');
  const taskText = document.createTextNode(taskInput.value);
  const link = document.createElement('a');

  if (taskInput.value === '') {
    alert('Task text is missing');
    // prevent display/storage of an empty node/value
  } else {
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

    // Store Tasks in LocalStorage
    storeTaskInLocalStorage(taskInput.value);

    // Clear input or X won't display
    taskInput.value = '';
  }

  e.preventDefault();
} // end Add Task

// Store Task in LocalStorage
function storeTaskInLocalStorage(task) {
  let tasks;
  const localStorageTasks = localStorage.getItem('tasks');
  if (localStorageTasks === null) {
    tasks = [];
  } else {
    // LS can only store strings, so we need to parse and convert the tasks[] array
    tasks = JSON.parse(localStorageTasks);
  }

  // push the task to the tasks[] array
  tasks.push(task);
  
  // set it back to LS as a string
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Tasks
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    // console.log(e.target.parentElement.parentElement);
    // parent of the parent: i > a > li
    e.target.parentElement.parentElement.remove();

    // Remove from LS
    // there is no .class or #id for the generated li, so we have to target the element itself
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
  }
}

// Remove Task from LS
function removeTaskFromLocalStorage(taskItem) {
  // console.log(taskItem);
  // Store the tasks in a variable
  let tasks;
  const localStorageTasks = localStorage.getItem('tasks');
  // check if the task is null
  if (localStorageTasks === null) {
    tasks = [];
  } else {
    // LS can only store strings, so we need to parse and convert the tasks[] array
    tasks = JSON.parse(localStorageTasks);
  }

  tasks.forEach(function(task, index) {
    // if the task equals the text of the task we want to remove
    if (taskItem.textContent === task) {
      console.info('[ ' + index + ' ]');
      // remove from the tasks array only 1 selected in index
      tasks.splice(index, 1);
    }
  });
  
  // re-set LS
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild)
  }

  // Nuke ALL tasks from LS
  nukeTasksFromLocalStorage();
}


// Nuke ALL tasks from LS
function nukeTasksFromLocalStorage() {
  if (confirm('Deleting ALL tasks are you, eh?')) {
    localStorage.clear();
  } else {
    // leave tasks listed
    getTasksFromLocalStorage(); 
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
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}