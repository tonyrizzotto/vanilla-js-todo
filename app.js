// Global Variables
let getTodoLists = JSON.parse(localStorage.getItem('Todo-Lists'));
let myArray = [];

// Define a TODO object prototype
function Todo(title, isCompleted) {
  this.title = title;
  this.tasks = [];
  this.isCompleted = isCompleted;
}

/**
 * @description Gets all created Todo-Lists and appends to the DOM
 */
function fetchTodoLists() {
  if (!getTodoLists) {
    //do nothing
  } else {
    //get all list titles and create links
    getTodoLists.forEach((list) => {
      let index = getTodoLists.indexOf(list) + 1;
      let newText = list.title;
      makeLinks(newText, index);
    });
  }
}

/**
 * @description Takes in the task Array and appends to the DOM
 */
function filterTasks(tasksArray) {
  let tasks = tasksArray;

  let tasksDiv = document.getElementById('tasks');
  tasksDiv.innerHTML = '';

  tasks.forEach((task) => {
    let index = tasks.indexOf(task) + 1;
    console.log(index);
    let taskSpan = document.createElement('span');
    taskSpan.classList.add('task');
    taskSpan.setAttribute('taskindex', `${index}`);
    taskSpan.innerText = task;

    // create icon tag
    let icon = document.createElement('i');
    icon.setAttribute('class', 'fas fa-times icon');
    taskSpan.appendChild(icon);

    tasksDiv.appendChild(taskSpan);
  });
}

/**
 * @description Creates and places the lists in the DOM
 * @param {*} title
 * @param {*} index
 */
function makeLinks(title, index) {
  //create DOM elements for new TODO list
  let tdlMenu = document.getElementById('todo-lists');

  // Create a new list tag
  let newLink = document.createElement('li');
  newLink.classList.add('todo-list');
  tdlMenu.appendChild(newLink);

  // Create an anchor tag
  let anchorTag = document.createElement('a');
  anchorTag.classList.add('todo-link');
  anchorTag.setAttribute('href', '#');
  anchorTag.setAttribute('listIndex', index);
  anchorTag.innerText = title;

  //append anchor tag to a li tag
  newLink.appendChild(anchorTag);

  // append li tag to the UL
  tdlMenu.appendChild(newLink);
}

/**
 * @description A function that will create new Todo-Lists and save them to the browser storage.
 */
function createTodoList() {
  //collect input from form
  let newTodo = document.getElementById('new-tdl-list').value;

  // define a new TODO
  let newTodoObject = new Todo(`${newTodo}`, false);

  // Check for the 'Todo-List' Item
  let checkForTodo = localStorage.getItem('Todo-Lists');

  // If no Todo-List, create one, otherwise append and replace with new version
  if (!checkForTodo) {
    let storageArray = [newTodoObject];
    localStorage.setItem('Todo-Lists', JSON.stringify(storageArray));
    //location.reload();
  } else {
    // take the new Todo and push to the array
    let storedTodoList = getTodoLists;
    storedTodoList.push(newTodoObject);
    localStorage.setItem('Todo-Lists', JSON.stringify(storedTodoList));

    //refresh list
    fetchTodoLists();
  }
}

/**
 * @description a function to render a todo list and it's task to the DOM
 */

function showTodoList(listTitle, listIndex) {
  //get ID of div
  let todoDiv = document.getElementById('todo-list-form');

  //Create a Heading
  let listHeading = document.createElement('h3');
  listHeading.innerText = listTitle;
  todoDiv.appendChild(listHeading);

  //add a task input field
  let todoInput = document.createElement('input');
  todoInput.setAttribute('id', 'new-task-input');
  todoInput.setAttribute('input', 'text');
  todoInput.setAttribute('placeholder', 'ex: eggs, butter, milk');
  todoDiv.appendChild(todoInput);

  //Create and display a submit change button
  const todoSubmitBtn = document.createElement('button');
  todoSubmitBtn.classList.add('btn');
  todoSubmitBtn.setAttribute('id', 'new-task-btn');
  todoSubmitBtn.innerText = 'Insert New Todo';
  todoDiv.appendChild(todoSubmitBtn);

  /**
   * @description Creates a new todo task and append to array
   */
  function createTask() {
    //get the input field value
    let newTask = document.getElementById('new-task-input').value;

    // //create a copy of stored array
    let todoListCopy = getTodoLists;

    // //Create a copy of indexed task array
    let taskArray = todoListCopy[listIndex].tasks;

    //add new todo to the array
    taskArray.push(newTask);
    //push task to the copied array
    todoListCopy[listIndex].tasks = taskArray;

    //Store Change in the Browser
    localStorage.setItem('Todo-Lists', JSON.stringify(todoListCopy));

    //clear screen and re-render list of tasks
    myArray = taskArray;

    filterTasks(myArray);
  }

  //Listen for insert new task click
  todoSubmitBtn.addEventListener('click', function (e) {
    e.preventDefault();
    createTask();

    if (e.target && e.target.matches('Button#new-task-btn')) {
      //clear input
      document.getElementById('new-task-input').value = '';
    }
  });
}

// Listener to create a new Todo list
document.getElementById('new-tdl-btn').addEventListener('click', function () {
  // Create Todo
  createTodoList();
});

//Listener for selecting a Todo list
document.getElementById('todo-lists').addEventListener('click', function (e) {
  if (e.target && e.target.matches('A.todo-link')) {
    // store the click and save it's listindex
    let listIndex = e.target.attributes.listindex.nodeValue - 1;

    // copy the local storage Todo Array
    let storedLists = getTodoLists;

    //filter results by the itemClicked
    storedLists.filter((list) => {
      let index = storedLists.indexOf(list);
      if (index === listIndex) {
        //clear out previous html for new list
        document.getElementById('todo-list-form').innerHTML = '';

        //Show new Todo list
        showTodoList(list.title, listIndex);

        //show tasks for selected Todo List
        filterTasks(list.tasks);
      }
    });

    document.getElementById('new-tdl-form').classList.add('hidden');
    document.getElementById('todo-list-form').classList.remove('hidden');
  }
});
