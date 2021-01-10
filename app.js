// Define a TODO object prototype
function Todo(title, isCompleted) {
  this.title = title;
  this.tasks = [];
  this.isCompleted = isCompleted;
}

//Define a function for appending data
function makeLinks(title) {
  //create DOM elements for new TODO list
  let tdlMenu = document.getElementById('todo-lists');

  // Create a new list tag
  let newLink = document.createElement('li');

  // Create an anchor tag
  let anchorTag = document.createElement('a');
  anchorTag.setAttribute('href', '#');
  anchorTag.innerText = title;

  //append anchor tag to a li tag
  newLink.appendChild(anchorTag);

  // append li tag to the UL
  tdlMenu.appendChild(newLink);
}

/**
 * @description Gets all created Todo-Lists and appends to the DOM
 */
function getTodoLists() {
  let checkForLists = JSON.parse(localStorage.getItem('Todo-List'));
  //console.log(checkForLists);

  if (!checkForLists) {
    //do nothing
  } else {
    //get all list titles and create links
    checkForLists.forEach((list) => makeLinks(list.title));
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
  let checkForTodo = localStorage.getItem('Todo-List');

  // If no Todo-List, create one, otherwise append and replace with new version
  if (!checkForTodo) {
    makeLinks(newTodo);
    let storageArray = [newTodoObject];
    localStorage.setItem('Todo-List', JSON.stringify(storageArray));
  } else {
    // take the new Todo and push to the array
    let storedTodoList = JSON.parse(localStorage.getItem('Todo-List'));
    storedTodoList.push(newTodoObject);
    localStorage.setItem('Todo-List', JSON.stringify(storedTodoList));
    makeLinks(newTodo);
  }
}

// Create List Event Listener
document.getElementById('new-tdl-btn').addEventListener('click', function (e) {
  //Prevent the default function
  e.preventDefault();
  // Create Todo
  createTodoList();

  //add and remove hidden class
  // document.getElementById('new-tdl-form').classList.add('hidden');
  // document.getElementById('new-todo-form').classList.remove('hidden');
});

// Click Todo List Event Listener
