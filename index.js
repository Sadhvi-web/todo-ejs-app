const express = require("express");
var app = express();
const port = 8080;
app.set("view engine","ejs");
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}));

let todos = []; 

app.get("/", (req, res) => {
  res.render("index", { todos: todos, filter: "All" });
});

app.post("/add", (req, res) => {
  const task = req.body.task;
  const priority = req.body.priority;

  if (task.trim() === "") {
    return res.send("<script>alert('Task cannot be empty!'); window.location='/'</script>");
  }

  todos.push({ text: task, priority: priority });
  res.redirect("/");
});

app.post("/delete", (req, res) => {
  const index = req.body.index;
  todos.splice(index, 1);
  res.redirect("/");
});

app.post("/edit", (req, res) => {
  const index = req.body.index;
  const updatedTask = req.body.updatedTask;
  if (updatedTask.trim() === "") {
    return res.send("<script>alert('Task cannot be empty!'); window.location='/'</script>");
  }
  todos[index].text = updatedTask;
  res.redirect("/");
});

app.post("/filter", (req, res) => {
  const filter = req.body.priorityFilter;
  let filteredTodos =
    filter === "All" ? todos : todos.filter((t) => t.priority === filter);
  res.render("index", { todos: filteredTodos, filter: filter });
});


app.listen(port,function(){
    console.log("server started on port " + port);
})