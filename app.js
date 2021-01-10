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
function getTodoLists() {
  let checkForLists = JSON.parse(localStorage.getItem('Todo-List'));
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
  let checkForTodo = localStorage.getItem('Todo-List');

  // If no Todo-List, create one, otherwise append and replace with new version
  if (!checkForTodo) {
    let storageArray = [newTodoObject];
    localStorage.setItem('Todo-List', JSON.stringify(storageArray));
    //location.reload();
  } else {
    // take the new Todo and push to the array
    let storedTodoList = JSON.parse(localStorage.getItem('Todo-List'));
    storedTodoList.push(newTodoObject);
    localStorage.setItem('Todo-List', JSON.stringify(storedTodoList));

    //refresh list
    //location.reload();
  }
}

// Detect if a todo-list is created
document.getElementById('new-tdl-btn').addEventListener('click', function (e) {
  //Prevent the default function
  e.preventDefault();
  // Create Todo
  createTodoList();

  //add and remove hidden class
  // document.getElementById('new-tdl-form').classList.add('hidden');
  // document.getElementById('new-todo-form').classList.remove('hidden');
});

//Detect if a Todo-List is clicked
document.getElementById('todo-lists').addEventListener('click', function (e) {
  if (e.target && e.target.matches('A.todo-link')) {
    // store the click
    let itemClicked = e.target.innerText;
    //get the localstorage array
    let storedLists = JSON.parse(localStorage.getItem('Todo-List'));
    //filter results by the itemClicked
    const result = storedLists.filter((list) => list.title === itemClicked);

    console.log(result[0]);
    // check array for a title that matches

    //show the todolist on the page
  }
});
