// Define a TODO object prototype
function Todo(title, description, isCompleted) {
  this.title = title;
  this.description = description;
  this.isCompleted = isCompleted;
}

/**
 * @description A function that will create a new todo-list and append the list to the dom.
 */
function createTodoList() {
  //collect input from form
  let newTodo = document.getElementById('new-tdl-list').value;

  //create DOM elements for new TODO list
  let tdlMenu = document.getElementById('todo-lists');

  // Create a new list tag
  let newLink = document.createElement('li');

  // Create an anchor tag
  let anchorTag = document.createElement('a');
  anchorTag.setAttribute('href', '#');
  anchorTag.innerText = newTodo;

  //append anchor tag to a li tag
  newLink.appendChild(anchorTag);

  // append li tag to the UL
  tdlMenu.appendChild(newLink);

  // define a new TODO
  let newTodoObject = new Todo(`${newTodo}`, '', false);
  localStorage.setItem(`${newTodo}`, JSON.stringify(newTodoObject));
}

// Event listener that runs the Create todo list
document.getElementById('new-tdl-btn').addEventListener('click', function (e) {
  //Prevent the default function
  e.preventDefault();
  // Create Todo
  createTodoList();
  //add and remove hidden class
  document.getElementById('new-tdl-form').classList.add('hidden');
  document.getElementById('new-todo-form').classList.remove('hidden');
});
