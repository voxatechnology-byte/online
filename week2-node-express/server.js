require("dotenv").config();

const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Parse incoming JSON request bodies.
app.use(express.json());

// GET /: return the API message to API clients and the HTML page to browsers.
app.get("/", (req, res) => {
  const acceptHeader = req.get("accept") || "";
  if (acceptHeader.includes("text/html")) {
    return res.sendFile(path.join(__dirname, "public", "index.html"));
  }
  return res.send("My Week 2 API!");
});

// POST /user -> accepts { name, email } and responds "Hello, [name]!".
app.post("/user", (req, res) => {
  const { name, email } = req.body || {};

  if (
    typeof name !== "string" ||
    !name.trim() ||
    typeof email !== "string" ||
    !email.trim()
  ) {
    return res.status(400).json({
      error: "Missing or invalid data. Please provide both name and email."
    });
  }

  return res.status(200).json({
    message: `Hello, ${name.trim()}!`,
    user: {
      name: name.trim(),
      email: email.trim()
    }
  });
});

// GET /user/:id -> "User [id] profile".
app.get("/user/:id", (req, res) => {
  res.send(`User ${req.params.id} profile`);
});

// Return JSON for unknown routes.
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Handle malformed JSON and unexpected errors.
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ error: "Invalid JSON request body" });
  }

  console.error(err);
  return res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Week 2 API is running on port ${PORT}`);
});
