import "./style.css";

interface Todo {
  readonly id: string;
  title: string;
  isCompleted: boolean;
}

const todos: Array<Todo> = [];

const todosContainer = document.getElementById(
  "todosContainer"
) as HTMLDivElement;

const todoInput = document.getElementById("todoInput") as HTMLInputElement;

const myForm = document.getElementById("myForm") as HTMLFormElement;

myForm.onsubmit = (e: SubmitEvent) => {
  e.preventDefault();

  const newTodo: Todo = {
    id: String(Math.random()*1000),
    title: todoInput.value,
    isCompleted: false,
  };
  todos.push(newTodo);
  todoInput.value = "";
  console.log(todos);
  renderTodos(todos);
};

const renderTodos = (todos: Todo[]) => {
  todosContainer.innerHTML = "";
  todos.forEach((todo) => {
    todosContainer.appendChild(
      createTodoElement(todo.id, todo.title, todo.isCompleted)
    );
  });
};

const createTodoElement = (
  id: string,
  title: string,
  isCompleted: boolean
): HTMLDivElement => {
  const todo = document.createElement("div");

  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.checked = isCompleted;
  checkBox.onchange = () => {
    todos.find((todo)=> todo.id === id) !.isCompleted = checkBox.checked;
  }
  const paragraph1 = document.createElement("span");
  paragraph1.textContent = id;

  const paragraph = document.createElement("span");
  paragraph.textContent = title;

  const btn = document.createElement("button");
  btn.textContent = "Delete Todo";
  btn.onclick = () => {
    deleteTodo(id);
  }
  todo.append(paragraph1, checkBox, paragraph, btn);
  return todo;
};

const deleteTodo = (id: string) => {
  const index = todos.findIndex((todo) => todo.id === id);
  todos.splice(index, 1);
  renderTodos(todos);
};