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
* Create Li element and prevent empty li on Add Task link without text
```
function addTask(e) {
  if(taskInput.value === '') {
    alert('Task is missing');
    return;
  }

  const li = document.createElement('li');
  const taskText = document.createTextNode(taskInput.value);
  
  li.className = 'collection-item';
  li.appendChild(taskText);

  taskList.appendChild(li);
}
```
* Display Task and Remove X link
```
function addTask(e) {

  const link = document.createElement('a');

  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class="fa fa-remove"></i>';
  li.appendChild(link);

  taskInput.value = '';
}
```
* Remove single task - logic
  * Add event listner
  ```
  taskList.addEventListener('click', removeTask);
  ```
  * create function `removeTask()`
  ```
  function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
      if(confirm('Deleting task are you eh?')) {
        e.target.parentElement.parentElement.remove();
      }
    }
  }
  ```
* Clear all tasks - logic
  * Add event listner
  ```
  clearBtn.addEventListener('click', clearTasks);
  ```
  * create function `clearTasks()`
  ```
  function clearTasks() {
    while(taskList.firstChild) {
      taskList.removeChild(taskList.firstChild)
    }
  }
  ```
* 