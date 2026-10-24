const express = require("express");
const app = express();

app.use(express.json());

let todos = [
  { id: 1, task: "Sample task", completed: false }
];
let nextId = 2;

// GET all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// BONUS: GET /todos/active - returns only incomplete todos
app.get("/todos/active", (req, res) => {
  res.json(todos.filter((t) => !t.completed));
});

// GET /todos/:id - single read
app.get("/todos/:id", (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ error: "Todo not found" });
  res.json(todo);
});

// POST /todos - validation: requires "task" field
app.post("/todos", (req, res) => {
  const { task } = req.body;
  if (!task || typeof task !== "string" || task.trim() === "") {
    return res.status(400).json({ error: 'POST requires "task" field' });
  }
  const todo = { id: nextId++, task: task.trim(), completed: false };
  todos.push(todo);
  res.status(201).json(todo);
});

// PUT /todos/:id - update a todo
app.put("/todos/:id", (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ error: "Todo not found" });

  const { task, completed } = req.body;
  if (task !== undefined) {
    if (typeof task !== "string" || task.trim() === "") {
      return res.status(400).json({ error: "task must be a non-empty string" });
    }
    todo.task = task.trim();
  }
  if (completed !== undefined) todo.completed = Boolean(completed);

  res.json(todo);
});

// DELETE /todos/:id - delete a todo
app.delete("/todos/:id", (req, res) => {
  const index = todos.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Todo not found" });
  const [deleted] = todos.splice(index, 1);
  res.json(deleted);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
