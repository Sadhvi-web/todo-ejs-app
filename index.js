const express = require("express");
const app = express();
const port = 8080;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

let todoList = []; 


app.get("/", (req, res) => {
  res.render("index", { todos: todoList, filter: "All" });
});


app.post("/add", (req, res) => {
  const { task, priority } = req.body;

  if (!task || task.trim() === "") {
    return res.send("<script>alert('Please enter a task'); window.location='/'</script>");
  }

  todoList.push({ text: task.trim(), priority });
  res.redirect("/");
});


app.post("/delete", (req, res) => {
  const id = req.body.index;
  todoList.splice(id, 1);
  res.redirect("/");
});


app.post("/edit", (req, res) => {
  const id = req.body.index;
  const newText = req.body.updatedTask;

  if (!newText || newText.trim() === "") {
    return res.send("<script>alert('Please enter valid text'); window.location='/'</script>");
  }

  todoList[id].text = newText.trim();
  res.redirect("/");
});


app.post("/filter", (req, res) => {
  const selected = req.body.priorityFilter;
  const visibleTasks = selected === "All" ? todoList : todoList.filter(t => t.priority === selected);
  res.render("index", { todos: visibleTasks, filter: selected });
});


app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
