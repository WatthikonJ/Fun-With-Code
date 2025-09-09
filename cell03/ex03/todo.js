const list = document.getElementById("ft_list");
const btn = document.getElementById("newBtn");

function getTodos() {
  const cookies = document.cookie.split("; ").find(row => row.startsWith("todos="));
  return cookies ? JSON.parse(decodeURIComponent(cookies.split("=")[1])) : [];
}

function saveTodos(todos) {
  document.cookie = "todos=" + encodeURIComponent(JSON.stringify(todos)) + "; path=/";
}

function render() {
  list.innerHTML = "";
  const todos = getTodos();
  todos.forEach((t, i) => {
    const div = document.createElement("div");
    div.className = "todo";
    div.textContent = t;
    div.onclick = () => {
      if (confirm("Remove this task?")) {
        todos.splice(i, 1);
        saveTodos(todos);
        render();
      }
    };
    list.prepend(div);
  });
}

btn.addEventListener("click", () => {
  const text = prompt("Enter a new TO DO:");
  if (text && text.trim() !== "") {
    const todos = getTodos();
    todos.push(text.trim());
    saveTodos(todos);
    render();
  }
});
render();
