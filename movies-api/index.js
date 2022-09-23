const fs = require("fs");
const path = require("path");

const express = require("express");
const app = express();

const movies = JSON.parse(fs.readFileSync(path.join(__dirname, "movies.json")));

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.status(200).json({
    title: "Welcome to movies API",
    description: "Use /movies to access movies data",
  });
});

app.get("/movies", (req, res) => {
  res.status(200).json(movies);
});

app.get("/movies/:id", (req, res) => {
  const { id } = req.params;
  const movie = movies.find((movie) => movie.id === id);

  if (!movie) {
    return res.status(401).json({
      title: "Movie not found",
    });
  }

  res.status(200).json({
    movie: movie,
  });
});

app.post("/movies", (req, res) => {
  const { movie } = req.body;

  if (!movie) {
    return res.status(401).json({
      title: "Movie not found",
    });
  }

  movies.push(movie);
  fs.writeFileSync(path.join(__dirname, "data.json"), JSON.stringify(movies));
  res.status(200).json({
    movie: movie,
  });
});

app.delete("/movies/:id", (req, res) => {
  const { id } = req.params;

  // Find the movie with provided id
  const movie = movies.find((movies) => movies.id === id);

  if (!movie) {
    return res.status(401).json({
      title: "Movie not found",
    });
  }

  // Filter out movies
  movies = movies.filter((movie) => movie.id !== id);

  fs.writeFileSync(path.join(__dirname, "data.json"), JSON.stringify(movies));
  res.status(200).json({
    movie: movie,
  });
});

const server = app.listen(PORT, () => {
  console.log("Server listening on port", PORT);
});
