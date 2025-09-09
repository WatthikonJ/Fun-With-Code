function getTodos(){
  const row = document.cookie.split("; ").find(r => r.startsWith("todos="));
  return row ? JSON.parse(decodeURIComponent(row.split("=")[1])) : [];
}
function saveTodos(arr){
  document.cookie = "todos=" + encodeURIComponent(JSON.stringify(arr)) + "; path=/";
}
function render(){
  const $list = $("#ft_list").empty();
  const todos = getTodos();
  todos.forEach((t, i) => {
    const $item = $("<div>").addClass("todo").text(t);
    $item.on("click", function(){
      if (confirm("Remove this task?")) {
        todos.splice(i,1);
        saveTodos(todos);
        render();
      }
    });
    $list.prepend($item);
  });
}

$("#newBtn").on("click", function(){
  const text = prompt("Enter a new TO DO:");
  if (text && text.trim() !== ""){
    const todos = getTodos();
    todos.push(text.trim());
    render();
  }
});

$(render);
