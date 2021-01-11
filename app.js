// Global Variables
let getTodoLists = localStorage.getItem('Todo-Lists');

// Define a TODO object prototype
function Todo(title, isCompleted) {
  this.title = title;
  this.tasks = [];
  this.isCompleted = isCompleted;
}

//Define a function for appending data
function makeLinks(title, index) {
  //create DOM elements for new TODO list
  let tdlMenu = document.getElementById('todo-lists');

  // Create a new list tag
  let newLink = document.createElement('li');
  newLink.classList.add('todo-list');

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
 * @description Gets all created Todo-Lists and appends to the DOM
 */
function fetchTodoLists() {
  let checkForLists = JSON.parse(getTodoLists);
  //console.log(checkForLists);

  if (!checkForLists) {
    //do nothing
  } else {
    //get all list titles and create links
    checkForLists.forEach((list) => {
      let index = checkForLists.indexOf(list) + 1;
      let newText = list.title;
      makeLinks(newText, index);
    });
  }
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
    let storedTodoList = JSON.parse(localStorage.getItem('Todo-Lists'));
    storedTodoList.push(newTodoObject);
    localStorage.setItem('Todo-Lists', JSON.stringify(storedTodoList));

    //refresh list
    location.reload();
  }
}

/**
 * @description a function to render a todo list and it's task to the DOM
 */

function showTodoForm(listTitle, listIndex) {
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
   * @description Creates a new todo item and append to array
   */
  function createTask() {
    //get the input field value
    let newTask = document.getElementById('new-task-input').value;

    let taskArray = JSON.parse(getTodoLists)[listIndex].tasks;
    taskArray.push(newTask);
    console.log(taskArray);
    //store it in browser storage
    //clear screen and re-render list of tasks
  }

  //Listen for insert new task click
  todoSubmitBtn.addEventListener('click', function () {
    createTask();
  });
}

/**
 * @description Takes in the task Array and appends to the DOM
 */
function filterTasks(tasksArray) {
  let tasks = tasksArray;
  tasks.forEach((task) => {
    console.log(task);
  });
}

// Detect if a todo-list is created
document.getElementById('new-tdl-btn').addEventListener('click', function (e) {
  //Prevent the default function
  e.preventDefault();
  // Create Todo
  createTodoList();
});

//Detect if a Todo-List is clicked
document.getElementById('todo-lists').addEventListener('click', function (e) {
  if (e.target && e.target.matches('A.todo-link')) {
    // store the click and save it's listindex
    let itemClicked = e.target.attributes.listindex.nodeValue;
    //get the localstorage array
    let storedLists = JSON.parse(localStorage.getItem('Todo-Lists'));

    //filter results by the itemClicked
    storedLists.filter((list) => {
      let index = storedLists.indexOf(list);
      if (index === itemClicked - 1) {
        //clear out previous html for new list
        document.getElementById('todo-list-form').innerHTML = '';
        showTodoForm(list.title, index);
        //show tasks
        filterTasks(list.tasks);
      }
    });

    document.getElementById('new-tdl-form').classList.add('hidden');
    document.getElementById('todo-list-form').classList.remove('hidden');
  }
});
