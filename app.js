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
    //do nothing for now
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
 * @description Takes in the task Array and appends to the DOM.
 * @param tasksArray is the array of tasks located in each list.
 * @param list this is the index of the main list in the array.
 */
function filterTasks(tasksArray, list) {
  let tasks = tasksArray;
  let tasksDiv = document.getElementById('tasks');
  tasksDiv.innerHTML = '';

  tasks.forEach((task) => {
    // unique Index of each task
    let index = tasks.indexOf(task);

    // Create a span for each task
    let taskSpan = document.createElement('span');
    taskSpan.setAttribute('id', `task-${index}`);
    taskSpan.classList.add('task');
    taskSpan.innerText = task;

    // create icon tag for delete
    let icon = document.createElement('i');
    icon.setAttribute('class', 'fas fa-times icon');

    //save list index and task index to the icon - used for Deletion
    icon.setAttribute('listIndex', list);
    icon.setAttribute('id', index);
    taskSpan.appendChild(icon);

    tasksDiv.appendChild(taskSpan);

    const deleteButton = document.getElementById(index);

    // Listener to detect if the delete icon was clicked.
    deleteButton.addEventListener('click', function () {
      if (taskSpan.innerText === tasks[index]) {
        // get id of span clicked
        const deletedTask = document.getElementById(`task-${index}`);

        //remove task from array
        tasks.splice(index, 1);
        //replace array in variable
        getTodoLists[list].tasks = tasks;
        //replace that array in the Todo-List
        localStorage.setItem('Todo-Lists', JSON.stringify(getTodoLists));

        // remove the task from the display
        deletedTask.remove();

        filterTasks(getTodoLists[list].tasks, list);
      }
    });
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
  let newList = document.createElement('li');
  newList.classList.add('todo-list');
  newList.setAttribute('listindex', index);
  newList.innerText = title;
  tdlMenu.appendChild(newList);

  // append li tag to the UL
  tdlMenu.appendChild(newList);
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

  const backButton = document.createElement('i');
  backButton.setAttribute('id', 'back-arrow');
  backButton.setAttribute('class', 'fas fa-3x fa-arrow-left');
  todoDiv.appendChild(backButton);

  //Create a Heading
  let listHeading = document.createElement('h3');
  listHeading.innerText = listTitle;
  todoDiv.appendChild(listHeading);

  //add a task input field
  let todoInput = document.createElement('input');
  todoInput.setAttribute('id', 'new-task-input');
  todoInput.setAttribute('input', 'text');
  todoInput.setAttribute('placeholder', 'Insert a new task here');
  todoDiv.appendChild(todoInput);

  //Create and display a submit change button
  const todoSubmitBtn = document.createElement('button');
  todoSubmitBtn.classList.add('btn');
  todoSubmitBtn.setAttribute('id', 'new-task-btn');
  todoSubmitBtn.innerText = 'Create New Task';
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

    filterTasks(myArray, listIndex);
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
  if (e.target && e.target.matches('Li.todo-list')) {
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
        filterTasks(list.tasks, listIndex);
      }
    });

    document.getElementById('tdl-box').classList.add('hidden');
    document.getElementById('entry-form').classList.remove('hidden');

    const backArrow = document.getElementById('back-arrow');
    backArrow.addEventListener('click', function () {
      window.location = '/';
    });
  }
});

fetchTodoLists();
