const form = document.getElementById("form");
const inputEl = document.querySelector("form input");

const todos = JSON.parse(localStorage.getItem("todo"));
if (todos) {
  todos.forEach((todo) => {
    createTodo(todo);
  });
}
form.addEventListener("submit", (e) => {
  e.preventDefault();

  createTodo();
});

function createTodo(todo) {
  const ul = document.getElementById("notes");
  let value = inputEl.value;

  if (todo) {
    value = todo.text;
  }

  if (value) {
    const list = document.createElement("li");
    list.innerHTML = value;

    if (todo && todo.completed) {
      list.classList.add("completed");
    }

    list.addEventListener("click", () => {
      list.classList.toggle("completed");
      updateLS();
    });

    list.addEventListener("dblclick", (e) => {
      e.preventDefault();

      list.remove();
      updateLS();
    });

    ul.appendChild(list);

    updateLS();

    inputEl.value = "";
  }
}

function updateLS() {
  const lists = document.querySelectorAll("li");
  const todos = [];

  lists.forEach((li) => {
    todos.push({
      text: li.innerText,
      completed: li.classList.contains("completed"),
    });
  });

  localStorage.setItem("todo", JSON.stringify(todos));
}
