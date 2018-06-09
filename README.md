# todo-list
A plain JS todo-list application

## Step by step guide
* `index.html` HTML initial structure with [Materialize CSS](https://materializecss.com/) and [Bootstrap 4](https://getbootstrap.com/)

**Note** Materialize CSS requires jQuery, not the `todo-list` application!

* `app.js` define initial constants
```
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
```
* Load Event listners and start `addTask()` function structure
```
loadEventListeners();

function loadEventListeners() {
  form.addEventListener('submit', addTask);
}

function addTask(e) {
  if(taskInput.value === '') {
    alert('Task is missing');
  }

  e.preventDefault();
}
```
* Create Li element
```
function addTask(e) {
  if(taskInput.value === '') {
    alert('Task is missing');
    return;
  }

  // Create <li></li> element
  const li = document.createElement('li');
  const taskText = document.createTextNode(taskInput.value);
  
  li.className = 'collection-item';
  li.appendChild(taskText);

  taskList.appendChild(li);

  e.preventDefault();
}
```