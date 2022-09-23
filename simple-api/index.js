const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.status(200).json({
    name: "Varshil Shah",
    company: "Lets upgarde!",
  });
});

app.get("/user", (req, res) => {
  res.status(200).json({
    name: "Varshil Shah",
    branch: "Computer engineering",
    state: "Maharashtra",
    country: "India",
  });
});

const server = app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
